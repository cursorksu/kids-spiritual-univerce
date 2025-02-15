import { UserProfileStyled } from './UserProfileStyled';
import {
    Tooltip,
    Tabs,
} from 'antd';
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
    ButtonIconMiniStyled,
    ButtonIconStyled,
} from '../ButtonStyled';
import { StudentsTable } from '../DataTable/StudentsTable';
import { studentConfig } from '../../constants/entities/studentConfig';
import { EditStudentEstimateModal } from '../EditStudentEstimateModal/EditStudentEstimateModal';
import { useUpdateStudent } from '../../api/student/useUpdateStudent';
import { CalendarIcon } from '../../assets/CalendarIcon.jsx';
import { EditIcon } from '../../assets/EditIcon.jsx';
import { ViewIcon } from '../../assets/ViewIcon.jsx';
import { SaveIcon } from '../../assets/SaveIcon.jsx';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import {
    useNavigate,
    useParams,
} from 'react-router';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { routes } from '../../router/constants';
import { useSelector } from 'react-redux';
import { getDateObject } from '../../utils/getDateLocalString';
import { getAge } from '../../utils/getAge';
import { SinglePhotoInStorage } from '../Dropzone/SinglePhotoInStorage';
import { useUpdateProfileField } from '../../api/user/useUpdateUser';
import { NavLink } from 'react-router-dom';
import { PlanerContainer } from '../Planer/PlanerContainer';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { StudentProfile } from '../StudentProfile/StudentProfile';
import { EditStudentModal } from '../Modal/EditStudentModal';

export const UserProfile = () => {
    const [activeStudent, setActiveStudent] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { groupId } = useParams();
    const { t } = useTranslation('tr');
    const [activeTab, setActiveTab] = useState(0);
    const [isFormShown, setIsFormShown] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [planerOpen, setPlanerOpen] = useState(false);
    const { updateStudentData } = useUpdateStudent();
    const { deleteEntity } = useDeleteEntity('students');
    const { editUserProfile } = useUpdateProfileField();

    const {
              getEntities,
              entities: groups,
          } = useGetEntityListByIds('group');
    const {
              getEntities: getChurches,
              entities: churches,
          } = useGetEntityListByIds('church');

    useEffect(() => {
        getEntities(user?.groups || []);
        getChurches(user?.church || []);
    }, [
        user,
        getEntities,
        getChurches,
    ]);

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
    const handleRowClick = useCallback((data) => {
        const birthday = JSON.parse(data.birthday);
        setIsFormShown(true);
        setDefaultValues({
            ...data,
            group: groupId,
            createdAt: JSON.parse(data.createdAt),
            birthday: birthday
                    ? getDateObject(birthday)
                    : new Date(),
        });
    }, [groupId]);
    const confirmationHandler = () => {
        setShouldUpdate((prev) => !prev);
    };

    const updateStudentHandler = useCallback(async (estimation, data) => {
        await updateStudentData(data.id, {
            estimation: +data.estimation + estimation,
        });
        setShouldUpdate((prev) => !prev);
    }, [updateStudentData]);

    const deleteStudentHandler = useCallback(async (data) => {
        await deleteEntity(data.id);
        setShouldUpdate((prev) => !prev);
    }, [deleteEntity]);

    const onIsActiveSwitch = useCallback(async (data) => {
        await updateStudentData(data.id, { isActive: !data.isActive });
        setShouldUpdate((prev) => !prev);
    }, [updateStudentData]);

    const handleTabChange = useCallback(({ activeIndex }) => {
        setActiveTab(activeIndex);
        const activeGroup = groups[activeIndex];
        navigate(`${routes.cabinet}/${user?.uid}${routes.group}/${activeGroup.id}`);
    }, [
        user,
        groups,
        navigate,
    ]);

    const panes = useMemo(() => groups?.map((item) => (
            {
                label: (
                        <div className="tab-title">
                            {item.title}
                            <ButtonIconStyled onClick={() => setPlanerOpen(prev => !prev)}>
                                <CalendarIcon/>
                            </ButtonIconStyled>
                        </div>
                ),
                key: item.id,
                children: planerOpen
                                ? <PlanerContainer group={item}/>
                                : <StudentsTable
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
                                                            {getAge(data.birthday)}
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
                                                                    onConfirm={(estimation) => updateStudentHandler(estimation,
                                                                            data)}
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
                                                                    onConfirm={() => setShouldUpdate((prev) => !prev)}
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
            }
    )), [
        planerOpen,
        groups,
        shouldUpdate,
        defaultValues,
        deleteStudentHandler,
        handleRowClick,
        onIsActiveSwitch,
        updateStudentHandler,
    ]);

    useEffect(() => {
        setActiveTab(groups?.findIndex((el) => el.id === groupId));
    }, [
        groupId,
        groups,
    ]);

    const [isEditAvatar, setIsEditAvatar] = useState(false);
    const handleAvatarChange = async (file) => {
        try {
            await editUserProfile({
                uid: user.uid,
                avatar: file.downloadURL,
            });
        } catch (err) {
            throw new Error(err);
        } finally {
            setIsEditAvatar(false);
        }
    };
    const [titleIsEdit, setTitleIsEdit] = useState(false);
    const [userTitle, setUserTitle] = useState('');
    const handleTitleChange = (e) => {
        e.stopPropagation();
        setUserTitle(e.target.value);
    };

    const handleTitleSave = async () => {
        if (!userTitle) return;
        try {
            await editUserProfile({
                uid: user.uid,
                avatar: user.avatar,
                firstName: userTitle.split(' ')[0],
                lastName: userTitle.split(' ')[1] ?? user.lastName,
                fullName: userTitle,
            });
            setTitleIsEdit(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
            <UserProfileStyled>
                <div className="top-container">
                    <div className="d-flex">
                        <div className="avatar-wrapper">
                            {isEditAvatar
                                    ? (
                                            <SinglePhotoInStorage
                                                    folder="users"
                                                    onChange={handleAvatarChange}
                                                    file={user?.avatar}
                                            />
                                    )
                                    : (
                                            <>
                                                <ButtonIconStyled onClick={() => setIsEditAvatar(true)}>
                                                    <EditIcon/>
                                                </ButtonIconStyled>
                                                <img
                                                        src={user?.avatar}
                                                        alt={user?.fullName}
                                                        className="image avatar"
                                                />
                                            </>
                                    )}
                        </div>
                        <div>
                            <h1 className="title">
                                {titleIsEdit
                                        ? (
                                                <input
                                                        className="user-title"
                                                        type="text"
                                                        value={userTitle}
                                                        onChange={handleTitleChange}
                                                />
                                        )
                                        : (
                                                user?.fullName
                                        )}
                                {titleIsEdit
                                        ? (
                                                <ButtonIconStyled onClick={handleTitleSave}>
                                                    <SaveIcon/>
                                                </ButtonIconStyled>
                                        )
                                        : (
                                                <ButtonIconStyled
                                                        onClick={() => {
                                                            setUserTitle(user?.fullName);
                                                            setTitleIsEdit(true);
                                                        }}>
                                                    <EditIcon/>
                                                </ButtonIconStyled>
                                        )}
                            </h1>
                            <div className="meta">{user?.email}</div>
                            {churches?.length > 0 && churches.map((el) => (
                                    <NavLink
                                            key={el.id}
                                            to={`${routes.church}/${el.id}`}
                                            className="meta">
                                        {el.title}
                                    </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="action-wrapper">
                    <EditStudentModal
                            student={initialValues}
                            onConfirm={confirmationHandler}
                    />
                    <Tooltip content={t('students.showResult')} arrow={true} placement="bottom">
                        <ButtonIconMiniStyled
                                className={'ksu-modal-trigger'}
                                onClick={() => navigate(`${routes.group}/${groupId}/games/rate`)}
                        >
                            <ViewIcon/>
                        </ButtonIconMiniStyled>
                    </Tooltip>
                </div>
                {activeStudent
                        ? (
                                <StudentProfile student={activeStudent} onClose={() => setActiveStudent(null)}/>
                        )
                        : (
                                <Tabs defaultActiveKey="1" items={panes} onChange={(_, data) => handleTabChange(data)} />
                        )}
            </UserProfileStyled>
    );
};
