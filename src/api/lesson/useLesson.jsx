import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';

export const useDeleteLesson = () => {
  const dispatch = useDispatch();
  const deleteLesson = useCallback(
    async (lessonId) => {
      try {
        const lessonDocRef = doc(fireStore, 'lessons', lessonId);
        await deleteDoc(lessonDocRef);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error deleting lesson:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { deleteLesson };
};
export const useUpdateLesson = () => {
  const dispatch = useDispatch();
  const updateLesson = useCallback(
    async (lessonId, updatedFields) => {
      try {
        const lessonDocRef = doc(fireStore, 'lessons', lessonId);
        const lessonSnapshot = await getDoc(lessonDocRef);

        if (lessonSnapshot.exists()) {
          const existingLessonData = lessonSnapshot.data();
          const updatedLessonData = {
            ...existingLessonData,
            ...updatedFields,
          };
          await updateDoc(lessonDocRef, updatedLessonData);
          return { id: lessonSnapshot?.id, ...updatedLessonData };
        } else {
          return null;
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error updating lesson:',
              description: error.message,
            },
          })
        );
        return null;
      }
    },
    [dispatch]
  );

  return { updateLesson };
};
