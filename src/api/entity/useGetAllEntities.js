import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import { setCollectionsInStore } from '../../store/collectionsResucer';
import { setEntity } from '../../store/entitiesReducer';
import {
  getDateLocalString,
  getDateObject,
} from '../../utils/getDateLocalString';

export const useGetAllEntities = (entity) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchEntities = useCallback(async () => {
    try {
      const entityCollection = collection(fireStore, entity);
      const querySnapshot = await getDocs(entityCollection);

      const entityDataPromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const authorRef = data.createdBy;
        if (authorRef) {
          const authorSnapshot = await getDoc(authorRef);
          const authorData = authorSnapshot.data();

          return {
            id: doc?.id,
            ...data,
            createdAt: JSON.stringify(data?.createdAt),
            modification_timestamp: JSON.stringify(data?.createdAt),
            createdBy:
              {
                ...authorData,
                createdAt: JSON.stringify(authorData?.createdAt),
                modification_timestamp: JSON.stringify(authorData?.createdAt),
              } ?? null,
          };
        }

        return {
          id: doc?.id,
          ...data,
          createdAt: getDateLocalString(data?.createdAt),
        };
      });

      const entityData = await Promise.all(entityDataPromises);

      if (entity === 'collections') {
        dispatch(
          setCollectionsInStore(
            entityData.sort(
              (a, b) =>
                getDateObject(JSON.parse(b.createdAt)) -
                getDateObject(JSON.parse(a.createdAt))
            )
          )
        );
      }

      if (entity === 'students') {
        const preparedData = entityData.map((el) => ({
          ...el,
          createdAt: getDateLocalString(el?.createdAt),
        }));
        dispatch(setEntity({ students: preparedData }));
      }

      setLoading(false);
      return entityData;
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error fetching ${entity}:`,
            description: error.message,
          },
        })
      );
      setLoading(false);
    }
  }, [dispatch, entity]);

  return { loading, getAllEntities: fetchEntities };
};
