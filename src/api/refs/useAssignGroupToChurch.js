import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { setMessage } from '../../store/notificationReducer';
import { fireStore } from '../index';

export const useAssignGroupToChurch = () => {
  const dispatch = useDispatch();

  // Привязка группы к церкви
  const addGroupToChurch = useCallback(
    (churchId, groupId) => {
      try {
        const churchRef = doc(fireStore, 'church', churchId);

        // Обновление списка групп церкви
        const updateChurchPromise = updateDoc(churchRef, {
          groups: arrayUnion(groupId),
        });

        return Promise.all([updateChurchPromise]);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error adding group to church:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  // Отвязка группы от церкви
  const removeGroupFromChurch = useCallback(
    (churchId, groupId) => {
      try {
        const churchRef = doc(fireStore, 'church', churchId);

        // Обновление списка групп церкви
        const updateChurchPromise = updateDoc(churchRef, {
          groups: arrayRemove(groupId),
        });

        return Promise.all([updateChurchPromise]);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error removing group from church:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { addGroupToChurch, removeGroupFromChurch };
};
