import { useCallback, useEffect, useMemo, useState } from 'react';
import { VeremLayout } from '../../pages/VeremLayout';
import { GroupList } from './GroupList';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { churchConfig } from '../../constants/entities/churchConfig';
import {
    getDateLocalString,
    getDateObject,
} from '../../utils/getDateLocalString';
import { EditIcon } from '../../assets/EditIcon.jsx';
import {
    VeremChips,
    VeremChipsSmall,
    VeremChurchContent,
    VeremLink,
} from './VeremChurchContent';
import { useTranslation } from 'react-i18next';
import { TeachersList } from './TeachersList';
import { ChurchItemStyled } from './style';
import { ContentList } from './ContentList';
import { SlideShow } from '../SlideShow';
import { PHOTO_PLACEHOLDER } from '../../constants/main';
import { BigModal } from '../Modal/BigModal';
import { EditAboutUs } from './EditAboutUs';
import clsx from 'clsx';
import { EditPastor } from '../Modal/EditPastor';
import {BALLS_DECOR} from "../../constants/staticImages";

export const VeremChurch = () => {
    const { user } = useSelector((state) => state.auth);
    const { churchId } = useParams();
    const [ church, setChurch ] = useState({});
    const { getEntityById } = useGetEntity('church');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const [ shouldUpdate, setShouldUpdate ] = useState(false);
    const { t } = useTranslation('tr');

    const getChurch = useCallback(async () => {
        await getEntityById(churchId).then((data) => {
            setChurch(data);
        });
    }, [ getEntityById, churchId ]);

    useEffect(() => {
        getChurch();
    }, [ shouldUpdate, churchId, getEntityById, getChurch ]);

    const confirmationHandler = async (_, churchData) => {
        setShouldUpdate((prev) => !prev);
    };

    const onEditList = useCallback(async () => {
        setShouldUpdate((prev) => !prev);
    }, []);

    const isAuth = useMemo(() => church?.createdBy?.uid === user?.uid, [ church, user ]);

    return (
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
                        <h1 className="title">&#34;{church?.title}&#34;</h1>
                        <VeremChipsSmall>{church?.city}</VeremChipsSmall>
                    </div>

                    <div className="actions">
                        {church?.createdBy?.uid === user?.uid && (
                            <BigModal
                                icon={<EditIcon/>}
                                isOpen={isFormShown}
                                onCancel={() => {}}
                                setIsOpen={setIsFormShown}
                                modalTitle={t('church.editChurch')}
                                onConfirm={confirmationHandler}
                            >
                                <CreateEntityForm
                                    entityName="church"
                                    onConfirm={confirmationHandler}
                                    onClose={() => setIsFormShown(false)}
                                    fields={churchConfig}
                                    defaultValues={{
                                        ...church,
                                        createdDate:
                                            church?.createdDate && getDateObject(church?.createdDate),
                                    }}
                                />
                            </BigModal>
                        )}
                    </div>
                </div>
                <div className="church-avatar">
                    <SlideShow
                        isAuth={isAuth}
                        onEdit={true}
                        navigation={false}
                        blur
                        autoplay={true}
                        slideList={church?.gallery?.length ?
                                   church?.gallery.map((el, id) => ({ id, value: el })) : [ {
                                id: 1, value: PHOTO_PLACEHOLDER
                            } ]}
                        entityName={'church'}
                        storageFolderName={user?.uid}
                        entity={church}
                        forceUpdate={(status) => status
                                                 ? setShouldUpdate(prev => !prev)
                                                 : () => {}
                        }
                    />
                </div>
            </div>
            <div>
                <VeremChurchContent>
                    <div className="balls-container">
                        <img
                            src={BALLS_DECOR}
                            alt="decor"
                        />
                    </div>
                    <div className="content">
                        <div className="content-block">
                            {isAuth && (
                                <div className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })}>
                                    <VeremChips>{`${t('church.labels.pastor')}`}</VeremChips>
                                    {isAuth && <EditPastor church={church} forceUpdate={setShouldUpdate}/>}
                                </div>
                            )}
                            <h3>{church?.pastor}</h3>
                            <ChurchItemStyled>
                                <img
                                    src={church?.pastorAvatar || PHOTO_PLACEHOLDER}
                                    alt="pastor avatar"
                                />
                            </ChurchItemStyled>
                        </div>

                        <div className="content-block">
                            <h3>
                                <div className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })}>
                                    <VeremChips>{`${t('church.labels.about')}`}</VeremChips>
                                    {isAuth && <EditAboutUs church={church} forceUpdate={setShouldUpdate}/>}
                                </div>
                            </h3>
                            <h3>
                                Started{' '}
                                {church?.createdDate && getDateLocalString(church?.createdDate)}
                            </h3>

                            <ul className="contacts">
                                <li>
                                    <span>Address: </span>
                                    <VeremLink>{church?.address}</VeremLink>
                                </li>
                                <li>
                                    <span>Email: </span>{' '}
                                    <VeremLink href={`mailto:${church?.email}`}>
                                        {church?.email}
                                    </VeremLink>
                                </li>
                                <li>
                                    <span>Web Site: </span>{' '}
                                    <VeremLink href={church?.web}>{church?.web}</VeremLink>
                                </li>
                                <li>
                                    <span>Phone: </span>
                                    <VeremLink href={`tel:${church?.phone}`}>
                                        {church?.phone}
                                    </VeremLink>
                                </li>
                            </ul>
                            {church?.about}
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-block">
                            <TeachersList
                                isAuth={isAuth}
                                onEdit={onEditList}
                                church={church}
                            />
                        </div>
                        <div className="content-block">
                            <GroupList
                                isAuth={isAuth}
                                onEdit={getChurch}
                                church={church}
                            />
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-block">
                            <ContentList contentType={'lessons'} contentList={church?.lessons}/>
                        </div>
                        <div className="content-block">
                            <ContentList contentType={'scenarios'} contentList={church?.scenarios}/>
                        </div>
                    </div>
                </VeremChurchContent>
            </div>
        </VeremLayout>
    );
};
