import { useEffect } from 'react';
import { VeremChips, VeremLink } from './VeremChurchContent';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon as ArrowIcon } from '../../assets/ArrowRightIcon.jsx';
import { useGetLessonsInCollection } from '../../api/lesson/useGetLessonsInCollection';
import { useSelector } from 'react-redux';
import { VeremContentChurchItem } from './style';

export const ContentList = ({ contentType, contentList }) => {
    const { t } = useTranslation('tr');
    const { getLessonsInCollection } = useGetLessonsInCollection();

    const { lessons } = useSelector(state => state.lessonData);

    useEffect(() => {
        contentType === 'lessons'
            && !!contentList?.length
            && getLessonsInCollection(contentList, 1);
    }, [contentType, contentList]);

    return (
        <div>
            {
                !contentList?.length ? (
                    <div className="content-block-placeholder">
                        {contentType === 'lessons'
                         ? t('church.labels.no-lessons')
                         : t('church.labels.no-scenarios')
                        }
                    </div>
                ) : (
                    <div className="content-block">
                        <h3>
                            <VeremChips>{`${t('church.labels.content')}`}</VeremChips>
                        </h3>
                        <h3>
                            {t(`church.labels.${contentType}`)}
                        </h3>
                        {lessons?.map(el => (
                            <VeremContentChurchItem key={el.id}>
                                <img src={el.imageUrl} alt="lesson pict"/>
                                <div>
                                    <h4>{el.title}</h4>
                                    <p>Created: {el.createdAt}</p>
                                </div>
                            </VeremContentChurchItem>
                        ))}
                        <VeremLink href="/collections"><ArrowIcon/>{t('church.labels.to-lessons')}</VeremLink>
                    </div>
                )
            }
        </div>
    );
};