import {useGetEntity} from '../api/entity/useGetEntity.js';
import {useParams} from 'react-router';
import {
    useCallback,
    useEffect, useMemo,
    useState,
} from 'react';
import {VeremLayout} from './VeremLayout.jsx';
import {TitleLarge} from '../components/TitleStyled.jsx';
import {PresentationPageStyled} from './MainContentStyled.js';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {SlideItem} from '../components/Presentations/SlideItem.jsx';
import {useEditEntity} from '../api/entity/useEditEntity.js';
import clsx from 'clsx';
import {
    ButtonsWrapperStyled,
    MainSlideStyled,
} from '../components/Presentations/styles.js';
import {ButtonIconMiniStyled} from '../components/ButtonStyled.js';
import {slideConfig, slidesDefaultValues} from "../constants/entities/presentationConfig.js";
import {CreateSlideForm} from "../components/Presentations/CreateSlideForm.jsx";
import {AddIcon} from "../assets/AddIcon.jsx";
import {generateId} from "../utils/generateId.js";
import {SlidePresentation} from "../components/SlidePresentation/index.js";

export const Presentation = () => {
    const {presentationId} = useParams();
    const {getEntityById} = useGetEntity('presentations');
    const {editEntity} = useEditEntity('presentations');
    const [presentation, setPresentation] = useState(null);
    const [activeSlide, setActiveSlide] = useState(null);
    const [dynamicalSlides, setDynamicalSlides] = useState(null);

    useEffect(() => {
        if (presentation?.slides?.length < 1) return;
        presentation?.slides && setDynamicalSlides(presentation.slides);
    }, [presentation?.slides]);

    useEffect(() => {
        presentationId && getEntityById(presentationId).then((data) => {
            setActiveSlide(data.slides[0]);
            setPresentation(data);
        });
    }, [
        getEntityById,
        presentationId,
    ]);

    const moveCard = useCallback(async (dragIndex, hoverIndex) => {
        await setPresentation((prev) => {
            const updatedSlides = [...prev.slides];
            const [movedSlide] = updatedSlides.splice(dragIndex, 1);
            updatedSlides.splice(hoverIndex, 0, movedSlide);
            editEntity({
                ...prev,
                slides: updatedSlides,
            });
            return {
                ...prev,
                slides: updatedSlides,
            };
        });
    }, [editEntity]);

    const deleteSlide = useCallback(async (id) => {
        await setPresentation((prev) => {
            const updatedSlides = prev.slides.filter((slide) => slide.id !== id);
            editEntity({
                ...prev,
                slides: updatedSlides,
            });
            setActiveSlide(updatedSlides[0]);
            return {
                ...prev,
                slides: updatedSlides,
            };
        });
    }, [editEntity]);

    const addSlide = async () => {
        const newId = generateId();
        await editEntity({
            id: presentationId,
            slides: [...presentation.slides, {...slidesDefaultValues, id: newId}],
        });
        await getEntityById(presentationId).then((data) => {
            setPresentation(data);
            setActiveSlide(data.slides?.find(el => el.id === newId));
        });
    };

    const currentSlide = useMemo(() => {
        return dynamicalSlides?.find(el => el.id === activeSlide?.id);
    }, [dynamicalSlides, activeSlide]);

    const setValue = useCallback((key, value) => {
        setDynamicalSlides(prev => prev.map(el => el.id === activeSlide?.id ? {...el, [key]: value} : el));
    }, [activeSlide?.id]);
    const saveSlide = async () => {
        await editEntity({
            id: presentationId,
            slides: presentation.slides.map((slide) => slide?.id === activeSlide?.id ? currentSlide : slide),
        });
        // await getEntityById(presentationId).then((data) => setPresentation(data));
    };

    return (
        <VeremLayout>
            <PresentationPageStyled>
                <ButtonsWrapperStyled>
                    <ButtonIconMiniStyled onClick={addSlide}>
                        <AddIcon/>
                    </ButtonIconMiniStyled>
                    <SlidePresentation
                        navigation={false}
                        autoplay={false}
                        slideList={presentation?.slides}
                    />
                </ButtonsWrapperStyled>
                <div className="presentation-title">
                    <TitleLarge>
                        {presentation?.title}
                        <p className="description">{presentation?.description}</p>
                    </TitleLarge>
                    {activeSlide && (
                        <CreateSlideForm
                            fields={slideConfig}
                            slide={currentSlide}
                            setValue={setValue}
                            saveSlide={saveSlide}
                            presentationId={presentationId}
                        />
                    )}
                </div>

                <div className="slide-wrapper">
                    {activeSlide && (
                        <MainSlideStyled className={activeSlide.template}>
                            {activeSlide.content &&
                                <div className="text-wrapper">
                                    {activeSlide.title && <h3>{activeSlide.title}</h3>}
                                    <p>{activeSlide.content}</p>
                                </div>
                            }
                            {activeSlide.img &&
                                <div className="img-wrapper">
                                    <img src={activeSlide.img} alt="slide"/>
                                </div>
                            }
                        </MainSlideStyled>
                    )}
                </div>
                <DndProvider backend={HTML5Backend}>
                    <div className="slide-list">
                        {presentation?.slides
                            && presentation?.slides.length > 0
                            && dynamicalSlides?.map((slide, index) => (
                                <div role="button" key={slide?.id} onClick={() => setActiveSlide(slide)}>
                                    <SlideItem
                                        onDelete={deleteSlide}
                                        className={clsx(slide.template, 'aside',
                                            {active: activeSlide?.id === slide.id})}
                                        text={slide.content}
                                        title={slide.title}
                                        index={index}
                                        img={slide.img}
                                        id={slide.id}
                                        moveCard={moveCard}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </DndProvider>
            </PresentationPageStyled>
        </VeremLayout>
    );
};