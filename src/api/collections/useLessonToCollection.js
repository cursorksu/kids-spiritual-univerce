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

export const useLessonToCollection = () => {
  const { t } = useTranslation('tr');
  const dispatch = useDispatch();

  const bindLessonToCollection = useCallback(
    async (collection, lessonId) => {
      const collectionRef = doc(fireStore, 'collections', collection?.id);
      const docSnap = await getDoc(collectionRef);

      if (!docSnap.exists()) throw new Error('No such document fined');

      try {
        await updateDoc(collectionRef, {
          lessonIds: arrayUnion(lessonId),
        });
        dispatch(
          setOneCollection({
            ...collection,
            lessonIds: [...collection.lessonIds, lessonId],
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
    [dispatch, t]
  );

  const unbindLessonFromCollection = useCallback(
    async (collectionId, lessonId) => {
        console.log({collectionId, lessonId})
      if (!collectionId) {
        throw new Error('The collection or the collection ID is not defined.');
      }

      const collectionRef = doc(fireStore, 'collections', collectionId);
			const collection = await getDoc(collectionRef);

      if (!collection.exists()) throw new Error('No such document fined');
      try {
        await updateDoc(collectionRef, {
          lessonIds: arrayRemove(lessonId),
        });

        dispatch(
          setOneCollection({
            ...collection.data(),
            lessonIds: collection.data().lessonIds.filter((el) => el !== lessonId),
          })
        );
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
    [dispatch, t]
  );

  return { bindLessonToCollection, unbindLessonFromCollection };
};
