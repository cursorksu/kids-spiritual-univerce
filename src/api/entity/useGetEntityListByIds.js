import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';

export const useGetEntityListByIds = (entityName) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [entities, setEntities] = useState([]);

  const fetchEntities = useCallback(
    async (ids) => {
      try {
        setLoading(true);
        const promises = ids.map(async (el) => {
          const docRef = doc(fireStore, entityName, el);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
          }

          return null;
        });
        const resolvedEntities = await Promise.all(promises);

        setEntities(resolvedEntities.filter((entity) => entity !== null));
      } catch (error) {
        dispatch(setMessage(null));
      } finally {
        setLoading(false);
      }
    },
    [dispatch, entityName]
  );

  return { loading, getEntities: fetchEntities, entities };
};
