import { useCallback } from 'react';
import {
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    doc,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { fireStore } from '../index';
import { useTranslation } from 'react-i18next';
import { setOneCollection } from '../../store/collectionsResucer';

export const useLessonToGroup = () => {
    const { t } = useTranslation('tr');
    const dispatch = useDispatch();

    const bindLessonToGroup = useCallback(
        async (groupId, lessonId) => {
					
            const groupRef = doc(fireStore, 'group', groupId);
            const lessonRef = doc(fireStore, 'lessons', lessonId);
            const docSnap = await getDoc(groupRef);
            const lessonSnap = await getDoc(lessonRef);


            if (!docSnap.exists() || !lessonSnap.exists() ) throw new Error('No such document fined');
	     
            try {
                await updateDoc(groupRef, {
                    lessonIds: arrayUnion(lessonId),
                });
                await updateDoc(lessonRef, {
                    usage: arrayUnion(groupId),
                });
								
	            dispatch(
		            setMessage({
			            type: 'success',
			            message: {
				            title: t('success'),
				            description: `${t('Updated successfully')}: ${
					            error.message
				            }`,
			            },
		            })
	            );
            } catch (error) {
                dispatch(
                    setMessage({
                        type: 'error',
                        message: {
                            title: t('errors.bindingError.title'),
                            description: `${t('errors.bindingError.description')}: ${
                                error.message
                            }`,
                        },
                    })
                );
            }
        },
        [ dispatch, t ]
    );

    const unbindLessonFromGroup = useCallback(
        async (groupId, lessonId) => {
            if (!groupId) {
                throw new Error('The group or the groups ID is not defined.');
            }

            const groupRef = doc(fireStore, 'group', groupId);
            const lessonRef = doc(fireStore, 'lessons', lessonId);
            const docSnap = await getDoc(groupRef);
            const lessonSnap = await getDoc(lessonRef);

            if (!docSnap.exists() || !lessonSnap.exists()) throw new Error('No such document fined');
            try {
                await updateDoc(groupRef, {
                    lessonIds: arrayRemove(lessonId),
                });
                await updateDoc(lessonSnap, {
                    usage: arrayRemove(groupId),
                });
            } catch (error) {
                dispatch(
                    setMessage({
                        type: 'error',
                        message: {
                            title: t('errors.unbindingError.title'),
                            description: `${t('errors.unbindingError.description')}: ${
                                error.message
                            }`,
                        },
                    })
                );
            }
        },
        [ dispatch, t ]
    );

    return { bindLessonToGroup, unbindLessonFromGroup };
};
