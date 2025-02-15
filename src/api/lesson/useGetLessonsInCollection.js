import { useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { useTranslation } from 'react-i18next';
import { setLessons as setLessonsInStore } from '../../store/dataReducer';
import { getDateLocalString } from '../../utils/getDateLocalString';

export const useGetLessonsInCollection = () => {
  const { t } = useTranslation('tr', { ns: 'errors' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getLessonsInCollection = useCallback(
    async (lessonIds, status) => {
      setLoading(true);

      try {
        const lessonPromises = lessonIds?.map((lessonId) =>
          getDoc(doc(fireStore, 'lessons', lessonId))
        );
        const lessonSnapshots = await Promise.all(lessonPromises);

        const lessonsData = await Promise.all(
          lessonSnapshots?.map(async (lessonSnapshot) => {
            try {
              const lesson = lessonSnapshot.data();
              const authorRef = lesson?.createdBy;

              if (authorRef) {
                const authorSnapshot = await getDoc(authorRef);
                if (authorSnapshot.exists()) {
                  const authorData = authorSnapshot.data();
                  return {
                    id: lessonSnapshot.id,
                    ...lesson,
                    createdAt: getDateLocalString(lesson?.createdAt),
                    createdBy: authorData,
                  };
                }
              }
              return {
                id: lessonSnapshot.id,
                ...lesson,
                createdBy: '',
                createdAt: getDateLocalString(lesson?.createdAt),
              };
            } catch (err) {
              throw err;
            }
          })
        );

        dispatch(
          setLessonsInStore(
            lessonsData.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          )
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: t('fetchingError.title'),
              description: `${t('fetchingError.description')}: ${
                error.message
              }`,
            },
          })
        );
      }
    },
    [dispatch, t]
  );

  return { loading, getLessonsInCollection };
};
