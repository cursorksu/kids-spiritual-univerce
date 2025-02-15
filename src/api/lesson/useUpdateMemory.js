import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { setEntity } from '../../store/entitiesReducer';
import { useDispatch } from 'react-redux';

export const useUpdateMemory = () => {
  const dispatch = useDispatch();

  const editEntity = useCallback(
    async (data) => {
      try {
        if (!data || !data.id || !data.memory) {
          throw new Error('Invalid data provided');
        }

        const docRef = doc(fireStore, '/lessons', data.id);
        const profileSnap = await getDoc(docRef);
        const lessonFromDb = profileSnap.data();

        if (lessonFromDb) {
          const oldMemory = lessonFromDb?.memory?.filter(
            (el) => el.id !== data?.memory?.id
          );

          const newData = oldMemory?.length
            ? {
              ...lessonFromDb,
              memory: [...oldMemory, data.memory],
              modification_timestamp: new Date().getTime(),
            }
            : {
              ...lessonFromDb,
              memory: [data.memory],
              modification_timestamp: new Date().getTime(),
            };

          await updateDoc(docRef, newData);
          dispatch(setEntity({ lessons: newData }));
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch]
  );

  return { updateMemory: editEntity };
};
