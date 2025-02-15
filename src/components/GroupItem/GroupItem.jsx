import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    useNavigate,
    useParams,
} from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import {
    ButtonIconMiniStyled,
    ButtonStyled,
} from '../ButtonStyled';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { ViewIcon } from '../../assets/ViewIcon.jsx';
import { studentConfig } from '../../constants/entities/studentConfig';
import { StudentsTable } from '../DataTable/StudentsTable';
import { EditStudentEstimateModal } from '../EditStudentEstimateModal/EditStudentEstimateModal';
import { useTranslation } from 'react-i18next';
import { useUpdateStudent } from '../../api/student/useUpdateStudent';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { getDateObject } from '../../utils/getDateLocalString';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { setMessage } from '../../store/notificationReducer';
// import {getAge} from '../../utils/getAge';
import { EditGroupModal } from '../VeremChurch/EditGroupModal';
import { StudentProfile } from '../StudentProfile/StudentProfile';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { EditStudentModal } from '../Modal/EditStudentModal';
import { VeremLayout } from '../../pages/VeremLayout.jsx';

export const GroupItem = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { getEntityById } = useGetEntity('group');
    const [group, setGroup] = useState({});
    const { t } = useTranslation('tr');
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [activeStudent, setActiveStudent] = useState(null);
    const { updateStudentData } = useUpdateStudent();
    const { editEntity } = useEditEntity('group');
    const { deleteEntity } = useDeleteEntity('students');
    const navigate = useNavigate();
    const initialValues = {
        firstName: '',
        secondName: '',
        years: '',
        phone: '',
        avatar: '',
        about: '',
        address: '',
        birthday: new Date(),
        estimation: 0,
        photo: '',
        group: groupId,
        isActive: true,
    };
    const [defaultValues, setDefaultValues] = useState(initialValues);

    const { getEntities: getTeachers, entities: teachers } =
                  useGetEntityListByIds('users');

    useEffect(() => {
        if (!user?.uid) {
            navigate('/');
        }
    }, [
        user,
        navigate,
    ]);

    useEffect(() => {
        group?.teachers?.length && getTeachers(group?.teachers);
    }, [group]);

    useEffect(() => {
        getEntityById(groupId).then((data) => setGroup(data));
    }, [
        groupId,
        getEntityById,
        shouldUpdate,
    ]);

    const reset = () => {
        setDefaultValues(defaultValues);
    };

    const confirmEditGroupHandler = () => {
        setDefaultValues({
            ...initialValues,
            group: groupId,
        });
    };

    //TODO: update group after student creation
    const confirmationHandler = async (id) => {
        try {
            id !== 200 && await editEntity({
                ...group,
                students: [
                    ...group.students,
                    id,
                ],
            });
            reset();
            setDefaultValues({
                ...initialValues,
                group: groupId,
            });
            setShouldUpdate((prev) => !prev);
        } catch (error) {
            dispatch(
                    setMessage({
                        type: 'error',
                        message: {
                            title: `Error editing group ${groupId}:`,
                            description: error.message,
                        },
                    }),
            );
        }
    };

    const updateStudentHandler = useCallback(
            async (estimation, data) => {
                await updateStudentData(data.id, {
                    ...data,
                    birthday: getDateObject(JSON.parse(data.birthday)),
                    estimation: +data.estimation + estimation,
                });

                setShouldUpdate((prev) => !prev);
            },
            [updateStudentData],
    );

    const deleteStudentHandler = useCallback(
            async (data) => {
                try {
                    await deleteEntity(data.id);
                    await editEntity({
                        ...group, students:
                                group?.students?.filter(el => el !== data.id),
                    });
                    setShouldUpdate((prev) => !prev);
                } catch (error) {
                    dispatch(
                            setMessage({
                                type: 'error',
                                message: {
                                    title: `Error editing group ${groupId}:`,
                                    description: error.message,
                                },
                            }),
                    );
                }
            },
            [
                deleteEntity,
                group,
            ],
    );

    const onIsActiveSwitch = useCallback(
            async (data) => {
                await updateStudentData(data.id, { isActive: !data.isActive });
                setShouldUpdate((prev) => !prev);
            },
            [updateStudentData],
    );

    return (
            <VeremLayout>
                {activeStudent
                        ? (
                                <StudentProfile student={activeStudent} onClose={() => setActiveStudent(null)}/>
                        )
                        : (
                                <UserProfileStyled>
                                    <div className="group-top-container">
                                        <div className={'group-top-container-info'}>
                                            <div>
                                                <h1 className="subtitle">{group?.title}</h1>
                                                <p>{group?.description}</p>
                                            </div>
                                            <ul className="group-top-teachers">
                                                <li>
                                                    {t('group.label.teachers')}:
                                                </li>
                                                {teachers?.map((el) => (
                                                        <li key={el.id}>
                                                            {el.firstName + ' ' + el.lastName}
                                                        </li>
                                                ))}
                                            </ul>
                                            <ul className="group-top-teachers">
                                                <li>
                                                    {t('group.label.lessons')}:
                                                </li>
                                                {group?.lessons?.map((el) => (
                                                        <li key={el.id}>
                                                            {el}
                                                        </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={'group-top-container-btns'}>
                                            {group?.createdBy?.uid === user?.uid && (
                                                    <div className="d-flex">
                                                        <EditGroupModal
                                                                forceUpdate={setShouldUpdate}
                                                                group={group}
                                                                churchId={group?.church}
                                                                onEdit={confirmEditGroupHandler}
                                                                churchTeachersList={group?.teachers || []}
                                                        />
                                                        <EditStudentModal
                                                                student={initialValues}
                                                                onConfirm={() => setShouldUpdate((prev) => !prev)}
                                                        />
                                                        <ButtonStyled
                                                                onClick={() => navigate(
                                                                        `/group/${groupId}/games/rate`)}>
                                                            {t('students.showResult')}
                                                        </ButtonStyled>
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                    <StudentsTable
                                            onSwitch={onIsActiveSwitch}
                                            selectedRow={defaultValues.id}
                                            shouldUpdate={shouldUpdate}
                                            columns={[
                                                ...studentConfig,
                                                {
                                                    name: 'years',
                                                    label: '',
                                                    render: (data) => (
                                                            <div className="years">
                                                                {/*{getAge(data.birthday)}*/}
                                                            </div>
                                                    ),
                                                    isIgnored: false,
                                                    displayInTable: true,
                                                },
                                                {
                                                    name: 'estimation',
                                                    render: (data) => (
                                                            <div className="estimation">
                                                                <h3 className="score">{data.estimation}</h3>
                                                                <EditStudentEstimateModal
                                                                        onConfirm={(estimation) =>
                                                                                updateStudentHandler(estimation, data)
                                                                        }
                                                                />
                                                            </div>
                                                    ),
                                                    isIgnored: false,
                                                    displayInTable: true,
                                                },
                                                {
                                                    inputType: null,
                                                    displayInTable: true,
                                                    name: 'action',
                                                    render: (data) => (
                                                            <div className={'action'}>
                                                                <ButtonIconMiniStyled
                                                                        onClick={() => setActiveStudent(data)}>
                                                                    <ViewIcon/>
                                                                </ButtonIconMiniStyled>
                                                                <EditStudentModal
                                                                        student={data}
                                                                        onConfirm={() => setShouldUpdate(
                                                                                (prev) => !prev)}
                                                                />
                                                                <DeleteConfirmationModal
                                                                        modalTitle={`${t(
                                                                                'modal.title.deleteStudent')} ${data?.firstName.toString()}`}
                                                                        modalContent={`${t('modal.studentDelete')}`}
                                                                        onConfirm={() => deleteStudentHandler(data)}
                                                                />
                                                            </div>
                                                    ),
                                                },
                                            ]}
                                    />
                                </UserProfileStyled>
                        )}
            </VeremLayout>
    );
};
