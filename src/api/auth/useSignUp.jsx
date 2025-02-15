import { getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCreateUser } from '../user/useCreateUser';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authReducer';
import { auth, fireStore } from '../index';
import { useTranslation } from 'react-i18next';
import { useGetAllEntities } from '../entity/useGetAllEntities';
import { setTeachersList } from '../../store/dataReducer';
import { USER_AVATAR_PLACEHOLDER } from '../../constants/main';
import {useGetEntityListByIds} from '../entity/useGetEntityListByIds';

export const useSignUp = () => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation('tr');
    const [ userProfile, setUserProfile ] = useState(null);
    const { getAllEntities: getUsers } = useGetAllEntities('users');
    const { createUser } = useCreateUser();
    const {getEntities, entities: groups} = useGetEntityListByIds('group');

    const getSignUpData = async () => {
        await getRedirectResult(auth)
            .then(async () => {
                onAuthStateChanged(auth, async (user) => {
                    if (!user) return;

                    const userDocRef = doc(fireStore, `/users/${user?.uid}`);
                    const profileSnap = await getDoc(userDocRef);
                    const userData = await profileSnap.data();

                    if (userData?.groups.length > 0) {
                        await getEntities(userData?.groups);
                        userData.groups = groups;
                    }

                    const profile = {
                        uid: user?.uid,
                        email: user?.email,
                        fullName: user?.displayName,
                        firstName: user?.displayName?.split(' ')[0],
                        lastName: user?.displayName?.split(' ')[1],
                        avatar: user?.avatar || USER_AVATAR_PLACEHOLDER,
                        lang: i18n?.language,
                        church: user?.church || [],
                        groups: groups.length > 0 ? groups : [],
                        lessons: user?.lessons || [],
                    };

                    if (userData) {
                        await i18n.changeLanguage(userData.lang);
                    }

                    if (!userData) {
                        await createUser(profile);
                    }

                    dispatch(
                        setAuthData({
                            user: {
                                ...userData,
                                createdAt: JSON.stringify(userData.createdAt),
                                modification_timestamp: JSON.stringify(
                                    userData.modification_timestamp
                                ),
                            },
                            token: auth?.currentUser?.accessToken,
                        })
                    );
                    return profile;
                });
            })
            .then(() => {
                getUsers().then((data) => {
                    dispatch(
                        setTeachersList([
                            ...data.map((el) => ({
                                ...el,
                                createdAt: JSON.stringify(el.createdAt),
                                modification_timestamp: JSON.stringify(
                                    el.modification_timestamp
                                ),
                            })),
                        ])
                    );
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
    const getSignUpInvitedData = async () => {
        await getRedirectResult(auth)
            .then(async () => {
                onAuthStateChanged(auth, async (user) => {
                    if (!user) return;

                    const userDocRef = doc(fireStore, `/users/${user?.uid}`);
                    const profileSnap = await getDoc(userDocRef);
                    const userData = await profileSnap.data();

                    if (userData?.groups.length > 0) {
                        await getEntities(userData?.groups);
                        userData.groups = groups;
                    }

                    const profile = {
                        uid: user?.uid,
                        email: user?.email,
                        fullName: user?.displayName,
                        firstName: user?.displayName?.split(' ')[0],
                        lastName: user?.displayName?.split(' ')[1],
                        avatar: userData?.avatar || USER_AVATAR_PLACEHOLDER,
                        lang: i18n?.language,
                        church: user?.church || [],
                        groups: groups.length > 0 ? groups : [],
                        lessons: user?.lessons || [],
                    };
                    if (userData) {
                        await i18n.changeLanguage(userData.lang);
                    }

                    if (!userData) {
                        await createUser(profile);
                    }

                    dispatch(
                        setAuthData({
                            user: {
                                ...userData,
                                createdAt: JSON.stringify(userData.createdAt),
                                modification_timestamp: JSON.stringify(
                                    userData.modification_timestamp
                                ),
                            },
                            token: auth?.currentUser?.accessToken,
                        })
                    );
                    setUserProfile(profile);
                    return profile;
                });
            })
            .then(() => {
                getUsers().then((data) => {
                    dispatch(
                        setTeachersList([
                            ...data.map((el) => ({
                                ...el,
                                createdAt: JSON.stringify(el.createdAt),
                                modification_timestamp: JSON.stringify(
                                    el.modification_timestamp
                                ),
                            })),
                        ])
                    );
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const signOutUser = useCallback(async () => {
        await signOut(auth).catch((error) => {
            throw new Error(error);
        });
    }, []);

    return { getSignUpData, signOutUser, getSignUpInvitedData, userProfile };
};
