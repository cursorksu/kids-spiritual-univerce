import { useGetEntity } from '../api/entity/useGetEntity.js';
import { useParams } from 'react-router';
import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { VeremLayout } from './VeremLayout.jsx';
import {
    TitleLarge,
    TitleMedium,
} from '../components/TitleStyled.jsx';
import { PresentationPageStyled } from './MainContentStyled.js';
import { CREAM } from '../constants/colors.js';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { SlideItem } from '../components/Presentations/SlideItem.jsx';
import { useEditEntity } from '../api/entity/useEditEntity.js';
import clsx from 'clsx';
import {
    MainSlideStyled,
    SlideStyled,
} from '../components/Presentations/styles.js';
import { ButtonIconMiniStyled } from '../components/ButtonStyled.js';
import { DeleteIcon } from '../assets/DeleteIcon.jsx';

export const Presentation = () => {
    const { presentationId } = useParams();
    const { getEntityById } = useGetEntity('presentations');
    const { editEntity } = useEditEntity('presentations');
    const [presentation, setPresentation] = useState(null);
    const [activeSlide, setActiveSlide] = useState(null);

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
        setPresentation((prev) => {
            const updatedSlides = prev.slides.filter((slide) => slide.id !== id);
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
    return (
            <VeremLayout>
                <PresentationPageStyled>
                    <div className="presentation-title">
                        <TitleLarge>
                            {presentation?.title}
                            <p className="description" style={{ color: CREAM }}>{presentation?.description}</p>
                        </TitleLarge>
                        <ul className="slide-settings">
                            <li>template: className /switch template and settings</li>
                            <li>img: cropper</li>
                            <li>title</li>
                            <li>content</li>
                            <li>save button</li>
                            <li>View button</li>
                        </ul>
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
                             && presentation?.slides.map((slide, index) => (
                                            <div role="button" key={slide.id} onClick={() => setActiveSlide(slide)}>
                                                <SlideItem
                                                        onDelete={deleteSlide}
                                                        className={clsx(slide.template,
                                                                { active: activeSlide.id === slide.id })}
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