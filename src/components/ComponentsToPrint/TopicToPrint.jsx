import {
    useEffect, useMemo,
    useRef,
    useState,
} from 'react';
import {
    ButtonIconMiniStyled,
    ButtonIconStyled, ButtonStyled,
} from '../ButtonStyled';
import {EditIcon} from '../../assets/EditIcon.jsx';
import {SaveIcon} from '../../assets/SaveIcon.jsx';
import {ScreenIcon} from '../../assets/ScreenIcon.jsx';
import {FullScreenIcon} from '../../assets/FullScreenIcon.jsx';
import {useSelector} from 'react-redux';
import {
    Controller,
    useForm,
} from 'react-hook-form';
import KsuEditor from '../KsuEditor';
import {useEditEntity} from '../../api/entity/useEditEntity';
import {HTMLRenderer} from '../HTMLRender/HTMLRender';
import {InfoBlockStyled} from '../InfoBlockStyled';
import {useReactToPrint} from 'react-to-print';
import {TitleLarge} from '../TitleStyled';
import {AdminPanel} from './AsideCards/AdminPanel';
import {BibleText} from './AsideCards/BibleText';
import {StaffList} from './AsideCards/StaffList';
import {LessonGoal} from './AsideCards/LessonGoal';
import {MediaCard} from './AsideCards/MediaCard';
import {LessonEntity} from '../LessonEntity/LessonEntity';
import {LessonVideo} from '../LessonEntity/LessonVideo';
import {CloseIcon} from '../../assets/CloseIcon.jsx';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Popover} from "antd";
import {useTranslation} from "react-i18next";
import {LessonGallery} from "./components/LessonGallery.jsx";

export const TopicToPrint = ({
                                 onChangeConfirm,
                             }, ref) => {
    const {editEntity} = useEditEntity('lessons');
    const [activeTab, setActiveTab] = useState(0);
    const [isTopicEdit, setIsTopicEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const {t} = useTranslation('tr');
    const {
        lessonData: {lesson},
    } = useSelector((state) => state);

    const {
        control,
        getValues,
        setValue,
        reset,
    } = useForm({
        defaultValues: null,
    });

    useEffect(() => {
        if (lesson?.memory?.length) {
            const data = lesson?.memory?.find((el) => el.id === 'test');
            data && localStorage.setItem('test', JSON.stringify(data.settings));
        }
        if (lesson?.id) {
            setValue('topic', lesson?.topic);
            setValue('goal', lesson?.goal);
            setValue('bibleText', lesson?.bibleText);
            setValue('material', lesson?.material);
            setValue('topic', lesson?.topic);
        }
    }, [lesson]);

    const {user} = useSelector((state) => state.auth);

    const editLessonHandler = (fieldName) => {
        const newData = {
            id: lesson?.id,
        };

        if (fieldName === 'bible') {
            newData.bibleText = getValues('bibleText');
            newData.bibleQuote = getValues('bibleQuote');
        } else {
            newData[fieldName] = getValues(fieldName);
        }

        editEntity(newData)
            .then(() => {
                onChangeConfirm();
                setIsTopicEdit(false);
                reset({
                    goal: lesson?.goal,
                    bibleText: lesson?.bibleText,
                    bibleQuote: lesson?.bibleQuote,
                    material: lesson?.material,
                    topic: lesson?.topic,
                });
            })
            .catch((err) => new Error(err));
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const isAuthor = useMemo(() => {
        return user?.uid && lesson?.createdBy?.uid === user?.uid
    }, [user, lesson]);

    return (
        <>
            <LessonGallery
                isAuthor={isAuthor}
                lesson={lesson}
            />
            <InfoBlockStyled ref={ref}>
                <section
                    className="print-block ksu-wrapper"
                    ref={componentRef}>
                    <aside className="aside-wrapper print-fluid">
                        <div
                            className={clsx('image-wrapper', {
                                'full-screen': isFullScreen,
                            })}>
                            <div className="print-hide">
                                {!isFullScreen
                                    ? (
                                        <ButtonIconStyled onClick={() => setIsFullScreen(true)}>
                                            <FullScreenIcon/>
                                        </ButtonIconStyled>
                                    )
                                    : (
                                        <ButtonIconStyled onClick={() => setIsFullScreen(false)}>
                                            <ScreenIcon/>
                                        </ButtonIconStyled>
                                    )}
                            </div>
                            <img src={lesson?.gallery?.length ? lesson?.gallery[0] : lesson?.imageUrl} alt={lesson?.title}/>
                        </div>
                        <MediaCard
                            lesson={lesson}
                            setActiveTab={setActiveTab}
                            activeTab={activeTab}
                        />
                        <LessonGoal
                            lesson={lesson}
                            onEdit={editLessonHandler}
                        />
                    </aside>
                    <div>
                        <TitleLarge>
                            <div>
                                {lesson?.title}
                                <span className="description">{lesson?.description}</span>
                            </div>
                            <span className="action print-hide">
                                {isAuthor && (
                                    !isTopicEdit
                                        ? (
                                            <Popover placement="top" content={t('lessonTabs.topic')}>
                                                <ButtonIconMiniStyled
                                                    onClick={() => setIsTopicEdit(true)}>
                                                    <EditIcon/>
                                                </ButtonIconMiniStyled>
                                            </Popover>
                                        )
                                        : (
                                            <>
                                                <ButtonIconMiniStyled
                                                    onClick={() => editLessonHandler('topic')}>
                                                    <SaveIcon/>
                                                </ButtonIconMiniStyled>
                                                <ButtonIconMiniStyled
                                                    onClick={() => setIsTopicEdit(false)}>
                                                    <CloseIcon/>
                                                </ButtonIconMiniStyled>
                                            </>
                                        )
                                )}
                            </span>
                        </TitleLarge>
                        {activeTab === 0 && (
                            <>
                                <section className="lesson-content-wrapper">
                                    <div className="action-top">
                                        {isTopicEdit
                                            ? (
                                                <Controller
                                                    name="topic"
                                                    control={control}
                                                    render={() => (
                                                        <div>
                                                            <KsuEditor
                                                                placeholder={'Почніть вводити текст...'}
                                                                onChange={(data) => setValue(
                                                                    'topic', data)}
                                                                value={getValues('topic')}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            )
                                            : (
                                                <HTMLRenderer htmlContent={lesson?.topic}/>
                                            )}
                                    </div>
                                </section>
                            </>
                        )}

                        {activeTab === 1 && <LessonEntity entityName={'presentation'} lesson={lesson}/>}
                        {activeTab === 2 && <LessonVideo entityName={'video'} lesson={lesson}/>}
                        {activeTab === 3 && <LessonEntity entityName={'subject'} lesson={lesson}/>}
                        {activeTab === 4 && <LessonEntity entityName={'creative'} lesson={lesson}/>}
                        {activeTab === 5 && <LessonEntity entityName={'game'} lesson={lesson}/>}
                        {activeTab === 6 && <div>
                            {lesson?.memory?.length > 0 && lesson.memory.map((el) => (
                                <div key={el.id}>{el.settings.map((el2) => (
                                    <div key={el2.question}>
                                        <h3>{el2.question}</h3>
                                        {el2.answer.map((ans, idx) => (
                                            <p key={ans.id}><b>{idx}. {' '}</b>{ans.text}</p>
                                        ))}
                                        <br/>
                                    </div>
                                ))}</div>
                            ))}
                        </div>}
                        {activeTab === 7 && <LessonEntity entityName={'food'} lesson={lesson}/>}
                        {activeTab === 8 && <LessonEntity entityName={'print'} lesson={lesson}/>}
                    </div>
                    <aside className="aside-wrapper print-fluid">
                        <AdminPanel
                            onEdit={onChangeConfirm}
                            lesson={lesson}
                            onPrint={handlePrint}
                        />
                        <BibleText
                            lesson={lesson}
                            onConfirm={onChangeConfirm}
                        />
                        <StaffList
                            lesson={lesson}
                            onConfirm={onChangeConfirm}
                        />
                    </aside>
                </section>
            </InfoBlockStyled>
        </>
    );
};

TopicToPrint.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        memory: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string, settings: PropTypes.arrayOf(PropTypes.shape({
                question: PropTypes.string, answer: PropTypes.arrayOf(PropTypes.shape({
                    text: PropTypes.string, isTrue: PropTypes.bool,
                })),
            })),
        })),
        imageUrl: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        goal: PropTypes.string,
        bibleText: PropTypes.string,
        bibleQuote: PropTypes.string,
        material: PropTypes.string,
        topic: PropTypes.string,
        gallery: PropTypes.arrayOf(PropTypes.string),
        createdBy: PropTypes.shape({
            uid: PropTypes.string,
        }),
    }), onChangeConfirm: PropTypes.func,
};