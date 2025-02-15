import {useCallback, useEffect, useMemo, useState} from 'react';
import { LessonList } from '../components/LessonList';
import { CreateEntityForm } from '../components/CreateEntityForm/CreateEntityForm';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLessonToCollection } from '../api/collections/useLessonToCollection';
import { useGetLessonsInCollection } from '../api/lesson/useGetLessonsInCollection';
import {
    lessonConfig,
    lessonDefaultValues,
} from '../constants/entities/lessonConfig';
import { EntityStatusMenu } from '../components/KsuStatus/EntityStatusMenu';
import { BigModal } from '../components/Modal/BigModal';
import { AddIcon } from '../assets/AddIcon.jsx';
import { VeremLayout } from './VeremLayout.jsx';

export const LessonsPage = () => {
    const { user } = useSelector((state) => state.auth);
    const [ createFormIsOpen, setCreateFormIsOpen ] = useState(false);
    const [ selectedStatus, setSelectedStatus ] = useState(1);
    const { collectionId } = useParams();
    const { collections } = useSelector((state) => state);
    const { t } = useTranslation('tr');
    const { bindLessonToCollection } = useLessonToCollection();
    const { getLessonsInCollection } = useGetLessonsInCollection();

    const currentCollection = useMemo(
        () =>
            collections?.length
            ? collections.find((el) => el.id === collectionId)
            : [],
        [ collectionId, collections ]
    );

    useEffect(() => {
        getLessonsInCollection(currentCollection.lessonIds, selectedStatus)
    }, [collectionId, currentCollection.lessonIds, selectedStatus])

    const handleConfirmCreation = useCallback(
        async (lessonId) => {
            await bindLessonToCollection(currentCollection, lessonId);
            await getLessonsInCollection(currentCollection.lessonIds, selectedStatus);
        },
        [
            bindLessonToCollection,
            getLessonsInCollection,
            currentCollection,
            selectedStatus,
        ]
    );

    const onChangeFilter = useCallback((status) => {
        setSelectedStatus(status);
    }, []);

    return (
        <VeremLayout>
            <div className="hero collection-hero">
                <div className="title-wrapper top-container">
                    <h1 className="title">
                        {currentCollection.title}

                        {user?.uid && currentCollection?.createdBy?.uid === user?.uid && (
                            <div className="control-panel">
                                <BigModal
                                    icon={<AddIcon/>}
                                    isOpen={createFormIsOpen}
                                    onCancel={() => {
                                    }}
                                    setIsOpen={setCreateFormIsOpen}
                                    modalTitle={t('button.createLesson')}
                                    onConfirm={() => {
                                    }}
                                >
                                    <CreateEntityForm
                                        entityName="lessons"
                                        onConfirm={handleConfirmCreation}
                                        onClose={() => setCreateFormIsOpen(false)}
                                        fields={lessonConfig}
                                        defaultValues={lessonDefaultValues}
                                    />
                                </BigModal>
                            </div>
                        )}
                    </h1>
                </div>
            </div>
            {user?.uid && currentCollection?.createdBy?.uid === user?.uid && (
                <div className="control-panel">
                    <EntityStatusMenu
                        onChangeFilter={onChangeFilter}
                        entityName={'lessons'}
                    />
                </div>
            )}
            <LessonList
                collection={currentCollection}
                selectedStatus={selectedStatus}
            />
        </VeremLayout>
    );
};
