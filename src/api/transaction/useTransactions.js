import { getStorage } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { deleteObject, listAll, ref } from '@firebase/storage';
import { doc, runTransaction } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useTransactions = () => {
    const { user } = useSelector((state) => state.auth);
    const storage = getStorage();
    const dispatch = useDispatch();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const deleteChurchWithTransaction = async (churchData) => {
        try {
            if (!currentUser || user?.uid !== currentUser?.uid) {
                dispatch(
                    setMessage({
                        type: 'error',
                        message: {
                            title: `Transaction failed!`,
                            description: `You do not have sufficient permissions`,
                        },
                    })
                );
                throw new Error('You do not have sufficient permissions');
            }
            // 1. Удаление изображений из Storage
            const folderRef = ref(storage, churchData.id);
            const listResult = await listAll(folderRef);

            // Удаляем изображения
            await Promise.all(listResult.items.map((itemRef) => deleteObject(itemRef)));

            // 2. Выполнение транзакции в Firestore
            await runTransaction(fireStore, async (transaction) => {
                const churchDocRef = doc(fireStore, `church/${churchData.id}`);

                // Чтение всех учителей в начале транзакции
                const teachersData = await Promise.all(
                    churchData.teachers.map(async (teacherId) => {
                        const teacherDocRef = doc(fireStore, `users/${teacherId}`);
                        const teacherSnap = await transaction.get(teacherDocRef);

                        if (!teacherSnap.exists()) {
                            throw new Error(`Teacher with ID ${teacherId} does not exist`);
                        }

                        return { teacherId, teacherDocRef, teacherData: teacherSnap.data() };
                    })
                );

                // Удаляем церковь
                transaction.delete(churchDocRef);
                //TODO: Нужно удалять группы бывшие в церкви, учеников, изображения учеников, календари, приглашения

                // Обновляем данные учителей
                teachersData.forEach(({ teacherDocRef, teacherData }) => {
                    const updatedChurches = (teacherData.church || []).filter(
                        (churchId) => churchId !== churchData.id
                    );

                    transaction.update(teacherDocRef, { church: updatedChurches });
                });
            });

            dispatch(
                setMessage({
                    type: 'success',
                    message: {
                        title: `Success!`,
                        description: 'Church and related data successfully deleted.',
                    },
                })
            );
        } catch (error) {
            dispatch(
                setMessage({
                    type: 'error',
                    message: {
                        title: `Transaction failed!`,
                        description: `Error deleting church and related data: ${error.message}`,
                    },
                })
            );
        }
    };
    return {
        deleteChurchWithTransaction
    };
};