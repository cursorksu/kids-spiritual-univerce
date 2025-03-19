import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import {
  getDateLocalString,
  getDateObject,
} from '../../utils/getDateLocalString';

export const useGetEntity = (entityName) => {
  const dispatch = useDispatch();
  const getEntityById = useCallback(
    async (entityId) => {
      try {
        const docRef = doc(fireStore, entityName, entityId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const entity = snapshot.data();
          const authorRef = entity.createdBy;

          if (authorRef) {
            const authorSnapshot = await getDoc(authorRef);

            if (authorSnapshot.exists()) {
              const authorData = authorSnapshot.data();

              return {
                id: snapshot?.id,
                ...entity,
                createdAt: getDateLocalString(entity?.createdAt),
                createdBy: authorData,
              };
            }
          }
          return {
            id: snapshot?.id,
            ...entity,
            createdAt: getDateObject(entity?.createdAt),
          };
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error fetching ${entityName}:`,
              description: error.message,
            },
          })
        );
        return null;
      }
    },
    [dispatch, entityName]
  );

  const getUserById = useCallback(
    async (userId) => {
      try {
        const docRef = doc(fireStore, entityName, userId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const entity = snapshot.data();
          return {
            id: snapshot?.id,
            ...entity,
            createdAt: getDateObject(entity?.createdAt),
          };
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error fetching ${entityName}:`,
              description: error.message,
            },
          })
        );
        return null;
      }
    },
    [dispatch, entityName]
  );

  return { getEntityById, getUserById };
};
