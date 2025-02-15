import {Tooltip} from 'antd';
import {ButtonIconStyled, ButtonStyled} from '../ButtonStyled';
import {DeleteIcon} from '../../assets/DeleteIcon.jsx';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {Controller, useForm} from 'react-hook-form';
import {InputFieldStyled, InputStyled, LabelStyled} from '../InputStyled';
import {TitleMedium} from '../TitleStyled';
import {useTranslation} from 'react-i18next';
import {useEditEntity} from '../../api/entity/useEditEntity';

const INITIAL_VALUES = {
    title: '',
    videoUrl: '',
};

import PropTypes from 'prop-types';

export const LessonVideo = ({entityName, lesson}) => {
    const {t} = useTranslation('tr');
    const {lessonId} = useParams();
    const {editEntity} = useEditEntity('lessons');
    const [isVideoShown, setIsVideoShown] = useState(false);
    const {user} = useSelector((state) => state.auth);

    const {control, getValues, reset} = useForm({
        defaultValues: INITIAL_VALUES,
        caches: false,
    });

    const handleChangeVideoUrl = async () => {
        await editEntity({id: lessonId, video: getValues()});
        setIsVideoShown(false);
        reset(INITIAL_VALUES);
    };

    const removeEntity = async () => {
        await editEntity({id: lessonId, video: INITIAL_VALUES});
    };

    const handleCancel = () => {
        reset();
        setIsVideoShown(false);
    };

    const embedUrl = (url) => {
        if (url?.includes('https://www.youtube.com/embed/')) return url;
        if (url?.includes('watch?v=')) return url?.replace('watch?v=', 'embed/');
        if (url?.includes('https://youtu.be/'))
            return url?.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
        return url;
    };

    return (
            <>
                <div className={'title-wrapper'}>
                    <TitleMedium>{t(`lessonTabs.${entityName}`)}</TitleMedium>
                    {user?.uid && lesson?.createdBy.uid === user?.uid && (
                            <div className="btn-block print-hide">
                                <ButtonStyled onClick={() => setIsVideoShown(true)}>
                                    {t('button.add')} {t(`lessonTabs.${entityName}`)}
                                </ButtonStyled>
                                <Tooltip content={t('button.delete')} arrow={true}>
                                    <ButtonIconStyled
                                            onClick={() => removeEntity()}>
                                        <DeleteIcon/>
                                    </ButtonIconStyled>
                                </Tooltip>
                            </div>
                    )}
                </div>
                <section className="content-wrapper">
                    <div>
                        <div className="action-top">
                            {isVideoShown
                                    ? (
                                            <div className="print-hide">
                                                <Controller
                                                        name={'title'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>{t('title')}</LabelStyled>
                                                                    <InputStyled {...field} />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <Controller
                                                        name={'videoUrl'}
                                                        control={control}
                                                        render={({field}) => (
                                                                <InputFieldStyled>
                                                                    <LabelStyled>{t('videoUrl')}</LabelStyled>
                                                                    <InputStyled {...field} />
                                                                </InputFieldStyled>
                                                        )}
                                                />
                                                <div className="btn-block">
                                                    <ButtonStyled
                                                            className="secondary"
                                                            onClick={handleCancel}
                                                    >
                                                        Cansel
                                                    </ButtonStyled>
                                                    <ButtonStyled onClick={handleChangeVideoUrl}>Save</ButtonStyled>
                                                </div>
                                            </div>
                                    ) : (
                                            <div>
                                                {lesson.video?.videoUrl
                                                        ? (
                                                                <iframe
                                                                        title="lesson video"
                                                                        width="100%"
                                                                        height="200"
                                                                        src={`${embedUrl(lesson.video?.videoUrl)}?controls=1&showinfo=0`}
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                        className="video-wrapper"
                                                                />
                                                        ) : (
                                                                <div className="video-wrapper">
                                                                    <TitleMedium>No video Url</TitleMedium>
                                                                </div>
                                                        )

                                                }
                                            </div>

                                    )}
                        </div>
                    </div>
                </section>
            </>
    );
};


LessonVideo.propTypes = {
    entityName: PropTypes.string.isRequired,
    lesson: PropTypes.shape({
        video: PropTypes.shape({
            videoUrl: PropTypes.string,
        }),
        createdBy: PropTypes.shape({
            uid: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
