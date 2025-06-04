import {ButtonIconMiniStyled, ButtonIconStyled} from "../../ButtonStyled.js";
import {BigModal} from "../../Modal/BigModal.jsx";
import {ImageIcon} from "../../../assets/ImageIcon.jsx";
import {MultiImageUploader} from "../../ImageCroper/MultiImageUploader.jsx";
import {useState} from "react";
import {useTranslation} from "react-i18next";

import PropTypes from 'prop-types';
import {SwiperSlider} from "../../SlideShow/SwiperSlider.js";
import {SwiperSlide} from "swiper/react";
import {ArrowLeftIcon as ArrowLeft} from "../../../assets/ArrowLeftIcon.jsx";
import {ArrowRightIcon as ArrowRight} from "../../../assets/ArrowRightIcon.jsx";
import {LessonGalleryStyled} from "../AsideCards/styles.js";
import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {FullScreenIcon} from "../../../assets/FullScreenIcon.jsx";
import useIsMobile from "../../../hooks/useIsMobile.js";

export const LessonGallery = ({
                                  isAuthor,
                                  lesson,
                              }) => {
    const [isGalleryEditOpen, setIsGalleryEditOpen] = useState(false);
    const isMobile = useIsMobile();
    const {t} = useTranslation('tr');
    const {t: tLesson} = useTranslation('lessons');

    return (
        <LessonGalleryStyled className="print-hide lesson-gallery-container">
            <SwiperSlider
                slidesPerView={isMobile ? 1 : 3}
                keyboard={{enabled: true}}
                loop
                navigation={true}
                centeredSlides={true}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                effect={'thumbs'}
                modules={[Keyboard, Pagination, Navigation]}
            >
                {!lesson?.gallery?.length && (
                    <p className={'no-image'}>{tLesson('noImageInGallery')}</p>
                )}
                {lesson?.gallery?.map((el) => (
                    <SwiperSlide key={el?.id || el}>
                        <div className="img-wrapper">
                            <img src={el} alt={el}/>
                        </div>
                    </SwiperSlide>
                ))}
                {lesson?.gallery?.length > 1 && (
                    <>
                        <ButtonIconStyled className="button-next">
                            <ArrowLeft/>
                        </ButtonIconStyled>

                        <ButtonIconStyled className="button-prev">
                            <ArrowRight/>
                        </ButtonIconStyled>
                    </>
                )}
            </SwiperSlider>
            <div className={'admin-board'}>
                {isAuthor && (
                    <BigModal
                        isOpen={isGalleryEditOpen}
                        setIsOpen={setIsGalleryEditOpen}
                        modalTitle={t('church.selectImagesForGallery')}
                        onCancel={() => setIsGalleryEditOpen(false)}
                        icon={<ImageIcon/>}
                    >
                        <MultiImageUploader
                            closeForm={() => setIsGalleryEditOpen(false)}
                            forceUpdate={() => {
                            }}
                            entityName={'lessons'}
                            sizes={1.5 / 1}
                            entity={lesson}
                        />
                    </BigModal>
                )}
                <ButtonIconMiniStyled>
                    <FullScreenIcon/>
                </ButtonIconMiniStyled>
            </div>
        </LessonGalleryStyled>
    );
};

LessonGallery.propTypes = {
    isAuthor: PropTypes.bool.isRequired,
    lesson: PropTypes.object.isRequired,
};