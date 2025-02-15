import { Col, Row } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteLesson } from '../../api/lesson';
import { Loader } from '../Loader';
import { useSelector } from 'react-redux';
import { LessonCard } from '../LessonCard';
import { LessonListStyled } from './LessonListStyled';
import { useLessonToCollection } from '../../api/collections/useLessonToCollection';
import { useGetLessonsInCollection } from '../../api/lesson/useGetLessonsInCollection';
import { routes } from '../../router/constants';
import { publicStatuses } from '../../constants/statuses/publicStatuses';

import PropTypes from 'prop-types';

export const LessonList = ({ collection, selectedStatus }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { deleteLesson } = useDeleteLesson();
    const { unbindLessonFromCollection } = useLessonToCollection();
    const { loading, getLessonsInCollection } = useGetLessonsInCollection();
    const { lessons } = useSelector((state) => state.lessonData);

    useEffect(() => {
        !collection?.lessonIds && navigate(routes.collections);
    }, [
        collection,
        getLessonsInCollection,
        navigate
    ]);

    useEffect(() => {
        collection?.lessonIds &&
        getLessonsInCollection(collection.lessonIds, selectedStatus).then(
                () => {
                }
        );
    }, [
        collection,
        getLessonsInCollection,
        selectedStatus
    ]);

    const handleClick = (id) => {
        navigate(`${id}`);
    };

    const handleDelete = useCallback(
            async (e, id) => {
                e.stopPropagation();
                await unbindLessonFromCollection(collection, id);
                await deleteLesson(id);
            },
            [
                collection,
                deleteLesson,
                unbindLessonFromCollection
            ]
    );

    const filteredLessons = useMemo(() => {
        let filteredCollection = [];
        if (user?.uid === collection?.createdBy?.uid) {
            filteredCollection = lessons?.filter(
                    (lesson) => lesson.status === selectedStatus
            );
        } else {
            if (!user?.uid) {
                filteredCollection = lessons?.filter(
                        (lesson) => lesson.status === publicStatuses.published
                );
            }
            if (user?.uid && user.church?.some((el) => el === collection?.church)) {
                filteredCollection = lessons?.filter(
                        (lesson) => lesson.status === publicStatuses.published
                );
                const activeLessons = lessons?.filter(
                        (lessons) => lessons.status === publicStatuses.active
                );

                if (activeLessons.length) {
                    filteredCollection =
                            [
                                ...filteredCollection,
                                ...activeLessons
                            ];
                }
            }
        }

        return filteredCollection;
    }, [
        lessons,
        selectedStatus
    ]);

    return (
            <LessonListStyled>
                <div className="lessons-grid">
                    {loading
                            ? (
                                    <Row>
                                        <Col width={16}>
                                            <Loader/>
                                        </Col>
                                    </Row>
                            )
                            : (
                                    filteredLessons?.map((item) => (
                                            <div className="cards-grid" key={item.id}>
                                                <LessonCard
                                                        item={item}
                                                        onClick={handleClick}
                                                        onDelete={handleDelete}
                                                />
                                            </div>
                                    ))
                            )}
                </div>
            </LessonListStyled>
    );
};

LessonList.propTypes = {
    collection: PropTypes.shape({
        lessonIds: PropTypes.arrayOf(PropTypes.string),
        createdBy: PropTypes.shape({
            uid: PropTypes.string.isRequired,
        }),
        church: PropTypes.string,
    }).isRequired,
    selectedStatus: PropTypes.number.isRequired,
};
