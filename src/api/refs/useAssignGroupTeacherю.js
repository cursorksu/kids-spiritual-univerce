import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { fireStore } from '../index';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const useAssignGroupTeacher = () => {
  const dispatch = useDispatch();

  const addTeacherToGroup = useCallback(
    (groupId, teacherId) => {
      try {
        const groupRef = doc(fireStore, 'group', groupId);
        const teacherRef = doc(fireStore, 'users', teacherId);

        const updateGroupPromise = updateDoc(groupRef, {
          teachers: arrayUnion(teacherId),
        });
        const updateTeacherPromise = updateDoc(teacherRef, {
          groups: arrayUnion(groupId),
        });

        return Promise.all([updateGroupPromise, updateTeacherPromise]);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error adding teacher to group:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  // Отвязка учителя от группы
  const removeTeacherFromGroup = useCallback(
    (groupId, teacherId) => {
      try {
        const groupRef = doc(fireStore, 'group', groupId);
        const teacherRef = doc(fireStore, 'users', teacherId);

        // Обновление списка учителей группы и списка групп учителя
        const updateGroupPromise = updateDoc(groupRef, {
          teachers: arrayRemove(teacherId),
        });
        const updateTeacherPromise = updateDoc(teacherRef, {
          group: arrayRemove(groupId),
        });

        return Promise.all([updateGroupPromise, updateTeacherPromise]);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error removing teacher from group:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { addTeacherToGroup, removeTeacherFromGroup };
};
