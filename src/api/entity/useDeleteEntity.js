import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useDeleteEntity = (entityName) => {
  const dispatch = useDispatch();
  const deleteEntity = useCallback(
    async (entityId) => {
      try {
        const entityDocRef = doc(fireStore, entityName, entityId);
        await deleteDoc(entityDocRef);

        setMessage({
          type: 'success',
          message: {
            title: `Success!`,
            description: `${entityName} id: ${entityId} was deleted successfully`,
          },
        });
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error Deleting:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch, entityName]
  );

  return { deleteEntity };
};
