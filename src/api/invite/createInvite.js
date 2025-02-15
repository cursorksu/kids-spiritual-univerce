import { useCallback } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useGetEntity } from '../entity/useGetEntity';
import { INVITE } from '../../constants/statuses/inviteStatuses';
import { fireStore } from '../index';
import { USER_AVATAR_PLACEHOLDER } from '../../constants/main';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';

const db = getFirestore();
const mainUrl = (import.meta.env.VITE_REACT_APP_FB_CONFIG || '').replace

export const useInvite = () => {
    const dispatch = useDispatch();
    const { getEntityById: getInvited } = useGetEntity('users');

    const createInvite = useCallback(async (churchId) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const authorRef = doc(fireStore, 'users', currentUser?.uid);

        if (!currentUser) {
            throw new Error('User is not authenticated.');
        }

        let invitedUser = null;

        try {
            invitedUser = await getInvited(currentUser.uid);
        } catch (error) {
            dispatch(
                setMessage({
                    type: 'error',
                    message: {
                        title: `Failed to fetch user details:`,
                        description: error.message,
                    },
                })
            );
        }
        const inviteId = `invite_${Date.now()}`;
        const inviteData = {
            id: inviteId,
            churchId,
            status: INVITE.CREATED,
            invitedBy: {
                uid: currentUser.uid,
                name: currentUser.displayName || 'Unknown User',
                avatar: invitedUser?.avatar || USER_AVATAR_PLACEHOLDER,
            },
            createdAt: new Date(),
            createdBy: authorRef,
        };

        await setDoc(doc(db, 'invites', inviteId), inviteData);

        return `${mainUrl}/church/${churchId}/invite/${inviteId}`;
    }, [ getInvited ]);

    return { createInvite };
};
