import { useCallback, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { PAGE_SIZE } from '../../constants/main';

export const useGetFilteredScenario = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getPublishedScenarioList = useCallback(async () => {
    const itemsPerPage = PAGE_SIZE;

    try {
      const scenarioCollection = collection(fireStore, 'scenario');
      const filteredQuery = query(scenarioCollection, where('status', '==', 1));

      const querySnapshotAll = await getDocs(filteredQuery);
      const size = querySnapshotAll.size;
      setTotalCount(size);

      const paginatedQuery = query(
        filteredQuery,
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );

      const querySnapshot = await getDocs(paginatedQuery);

      let entityData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });

      setLoading(false);
      return entityData;
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error fetching scenarios:`,
            description: error.message,
          },
        })
      );
      setLoading(false);
      return [];
    }
  }, [dispatch]);

  return { getPublishedScenarioList, loading, totalCount };
};
