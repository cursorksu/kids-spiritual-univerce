import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireStore } from '../index';
import { setMessage } from '../../store/notificationReducer';
import { setEntity } from '../../store/entitiesReducer';

export const useGetStudentsInGroup = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);

  const fetchStudents = useCallback(
    async (groupId) => {
      try {
        const groupsCollection = collection(fireStore, 'students');
        const groupsQuery = query(
          groupsCollection,
          where('group', '==', groupId)
        );
        const querySnapshot = await getDocs(groupsQuery);

        let groupsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdBy: '',
            birthday: JSON.stringify(data.birthday),
            createdAt: JSON.stringify(data.createdAt),
            modification_timestamp: JSON.stringify(data.modification_timestamp),
          };
        });
        setLoading(false);

        dispatch(setEntity({ students: groupsData }));
        setStudentList(groupsData);
        return groupsData;
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error fetching groups:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { loading, getGetStudentsInGroup: fetchStudents, studentList };
};
