import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { fireStore } from '../index';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const useAssignEntityToLesson = () => {
  const dispatch = useDispatch();

  const addEntityToArrayField = useCallback(
    async (entityName, entityId, lessonId) => {
      try {
        const lessonRef = doc(fireStore, 'lessons', lessonId);
        const entityRef = doc(fireStore, entityName, entityId);

        await updateDoc(lessonRef, {
          [entityName]: arrayUnion(entityId),
        });

        await updateDoc(entityRef, {
          lessons: arrayUnion(lessonId),
        });
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error adding ${entityName} to array field in lesson:`,
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  const removeEntityFromArrayField = useCallback(
    async (entityName, entityId, lessonId) => {
      try {
        const lessonRef = doc(fireStore, 'lessons', lessonId);
        const entityRef = doc(fireStore, entityName, entityId);

        await updateDoc(lessonRef, {
          [entityName]: arrayRemove(entityId),
        });

        await updateDoc(entityRef, {
          lessons: arrayRemove(lessonId),
        });
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error removing ${entityName} from array field in lesson:`,
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { addEntityToArrayField, removeEntityFromArrayField };
};
