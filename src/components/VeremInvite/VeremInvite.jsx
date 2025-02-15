import { useCallback, useEffect, useState } from 'react';
import { GoogleIcon } from '../../assets/GoogleIcon.jsx';
import { VeremInviteStyled } from './style';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { useNavigate, useParams } from 'react-router';
import { ButtonStyled } from '../ButtonStyled';
import { browserLocalPersistence, GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth';
import { auth } from '../../api';
import { useSignUp } from '../../api/auth/useSignUp';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { useUpdateProfileField } from '../../api/user/useUpdateUser';
import { routes } from '../../router/constants';
import { INVITE } from '../../constants/statuses/inviteStatuses';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { InviteFailedMessage } from '../Messages/InviteFailedMessage';
import { InviteSuccessMessage } from '../Messages/InviteSuccessMessage';

export const VeremInvite = ({ church }) => {
    const { inviteId } = useParams();
    const [ invite, setInvite ] = useState({});
    const { getEntityById: getInvite } = useGetEntity('invites');
    const { editEntity: editChurch } = useEditEntity('church');
    const { editEntity: editInvite } = useEditEntity('invites');
    const { editUserProfile: editTeacher } = useUpdateProfileField();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dateNow = new Date();

    const getInviteData = useCallback(async () => {
        await getInvite(inviteId).then((data) => {
            setInvite(data);
        });
    }, [ getInvite, inviteId ]);

    useEffect(() => {
        getInviteData();
    }, [ getInvite, inviteId ]);

    const { getSignUpInvitedData, userProfile } = useSignUp();

    const loginWithGoogle = useCallback(async () => {
        await setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider).then(async () => await getSignUpInvitedData());
            }).catch((error) => {
                throw new Error(error);
            });
    }, [ auth, getSignUpInvitedData, userProfile ]);

    const handleChurchUserUpdate = async (editChurch, editTeacher, userProfile, church, navigate) => {
        try {
            const promises = [
                await editInvite({ ...invite, status: INVITE.SUCCESS }),
            ];

            !church.teachers.includes(userProfile.uid) && promises.push(await editChurch({
                ...church,
                teachers: [ ...church.teachers, userProfile?.uid ]
            }));
            !userProfile.church.includes(church.id) && promises.push(await editTeacher({
                ...userProfile,
                church: [ ...(userProfile?.church || []), church.id ]
            }));

            await Promise.all(promises);
            navigate(`${routes.church}/${church.id}`);

            dispatch(
                setMessage({
                    type: 'success',
                    message: {
                        title: 'Успіх!',
                        description: 'Вас було авторизовано та додано до церкви у ролі вчителя',
                    },
                })
            );
        } catch (error) {
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
    };


    useEffect(() => {
        if (userProfile?.uid && church?.id) {
            handleChurchUserUpdate(editChurch, editTeacher, userProfile, church, navigate).then(r => r);
        }
    }, [ userProfile, church, editChurch, editTeacher, navigate ]);

    useEffect(() => {
        if (invite && (dateNow - invite?.createdAt) / (24 * 60 * 60 * 1000) > 7) {
            editInvite({ ...invite, status: INVITE.FAILED });
        }
    }, [ invite ]);

    return (
        <VeremInviteStyled>
            {invite?.status === INVITE.SUCCESS && (
                <InviteSuccessMessage/>
            )}
            {invite?.status !== INVITE.SUCCESS &&
            (dateNow - invite?.createdAt) / (24 * 60 * 60 * 1000) > 7 && (
                <>
                    <InviteFailedMessage/>

                    <p>createdAt: {invite?.createdAt?.toString()}</p>
                    <p>{-Math.round((invite?.createdAt - dateNow) / (24 * 60 * 60 * 1000))} days
                        gos after
                        invitation!</p>
                </>
            )}
            {invite.status === INVITE.CREATED
            && (<div className="invite-template">
                    <img
                        src={invite?.invitedBy?.avatar || 'placeholder-avatar.png'}
                        alt="User avatar"
                        className="avatar"
                    />
                    <p>Привет!</p>
                    <p>
                        Меня
                        зовут <strong>{invite?.invitedBy?.name || 'ваш друг'}</strong>,
                        и я хочу пригласить
                        вас присоединиться к служению в нашей
                        церкви <strong>"{church?.title || 'Церковь'}"</strong> на
                        платформе <strong>"Дитячій духовний всесвіт"</strong>.
                    </p>
                    <p>
                        <strong>Почему это стоит
                            попробовать?</strong> Регистрация через Google займет
                        всего
                        пару секунд! Вы сразу получите доступ ко всем ресурсам
                        церкви: сможете создавать,
                        редактировать и просматривать подготовленный контент.
                    </p>
                    <p>
                        <strong>Не волнуйтесь!</strong> Это легко, удобно, и вы
                        всегда сможете получить помощь, если
                        что-то будет непонятно.
                    </p>
                    <p>Присоединяйтесь прямо сейчас и станьте частью нашей
                        обучающей платформы!</p>
                    <ButtonStyled
                        onClick={loginWithGoogle}><GoogleIcon/> Регистрация через
                        Google</ButtonStyled>
                </div>
            )}
        </VeremInviteStyled>
    );
};