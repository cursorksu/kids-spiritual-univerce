import React, { useCallback, useEffect, useState } from 'react';
import { VeremLayout } from './VeremLayout';
import { PHOTO_PLACEHOLDER } from '../constants/main';
import { VeremChipsSmall } from '../components/VeremChurch/VeremChurchContent';
import { useParams } from 'react-router';
import { useGetEntity } from '../api/entity/useGetEntity';
import { useSelector } from 'react-redux';
import { VeremInvite } from '../components/VeremInvite/VeremInvite';

export const Invite = () => {
    const { churchId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [ church, setChurch ] = useState({});

    const { getEntityById } = useGetEntity('church');

    const getChurch = useCallback(async () => {
        await getEntityById(churchId).then((data) => {
            setChurch(data);
        });
    }, [ getEntityById, churchId ]);

    useEffect(() => {
        getChurch();
    }, [ churchId, getEntityById, getChurch ]);

    return (
        <>
            <VeremLayout>
                <div className="hero">
                    <div className="verem-church-title">
                        <div>
                            {church?.logo ? (
                                <img
                                    className="logo"
                                    src={church?.logo}
                                    alt="logo png"
                                />
                            ) : (
                                 <img
                                     className="logo"
                                     src={PHOTO_PLACEHOLDER}
                                     alt="logo png"
                                 />
                             )}
                        </div>
                        <div className="title-info">
                            <p className="subtitle">{church?.subtitle}</p>
                            <h1 className="title">"{church?.title}"</h1>
                            <VeremChipsSmall>{church?.city}</VeremChipsSmall>
                        </div>
                    </div>
                    <VeremInvite church={church}/>
                </div>
            </VeremLayout>
        </>
    )
}