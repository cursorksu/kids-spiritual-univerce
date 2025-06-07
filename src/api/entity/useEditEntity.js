import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { setEntity } from '../../store/entitiesReducer';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { getDateToDatePicker } from '../../utils/getDateLocalString';

export const useEditEntity = (entityName) => {
    const dispatch = useDispatch();

    const removeUndefinedFields = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            if (obj[key] !== undefined) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    };

    const editEntity = useCallback(
        async (data) => {
            try {
                const docRef = doc(fireStore, `/${entityName}/${data.id}`);
                const profileSnap = await getDoc(docRef);
                const entity = profileSnap.data();

                if (!entity) throw new Error(`${entityName} was not found`);

        const newData = {
          ...data,
          createdBy: entity.createdBy,
          createdAt: entity.createdAt,
          modification_timestamp: Timestamp.now(),
        };

				if (newData.birthday) {
					if (getDateToDatePicker(newData.birthday)) {
						newData.birthday = (getDateToDatePicker(newData.birthday));
					} else if (newData.birthday instanceof Date) {
						newData.birthday = (newData.birthday);
					}  else if (typeof newData.birthday === 'string') {
						newData.birthday = (getDateToDatePicker(JSON.parse(newData.birthday)));
					} else {
						newData.birthday = new Date(newData.birthday);
					}
				}
        if (entity) {
            const preparedData = removeUndefinedFields(newData);

            await updateDoc(docRef, preparedData);
          if (entityName === 'students') {
            dispatch(setEntity({ students: preparedData }));
          }

          return 200;
        }
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error editing ${entityName}:`,
              description: error.message,
            },
          })
        );
        return null;
      }
    },
    [dispatch, entityName]
  );

    return { editEntity };
};
