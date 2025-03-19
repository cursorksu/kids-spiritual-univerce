import {useState} from 'react';
import {SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation, Keyboard} from 'swiper/modules';
import {ArrowLeftIcon as ArrowLeft} from '../../assets/ArrowLeftIcon.jsx';
import {ArrowRightIcon as ArrowRight} from '../../assets/ArrowRightIcon.jsx';
import {FullScreenIcon} from '../../assets/FullScreenIcon.jsx';
import {FullScreenButton, SwiperPresentation} from './SwiperPresentation.js';
import {Tooltip} from 'antd';
import 'swiper/css';
import 'swiper/css/pagination';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {ButtonIconMiniStyled} from '../ButtonStyled';
import PropTypes from 'prop-types';
import {PresentationIcon} from "../../assets/PresentationIcon.jsx";
import {MainSlideStyled} from "../Presentations/styles.js";
import {useExitFullScreen} from "../../hooks/useExitFullScreen.js";

export const SlidePresentation = ({
                                      slideList,
                                      autoplay = false,
                                      navigation = true,
                                  }) => {
    const [fullScreen, setFullScreen] = useState(false);
    const {t} = useTranslation('tr');
    useExitFullScreen(() => setFullScreen(false));

    return (
        <>
            <FullScreenButton>
                <Tooltip placement={fullScreen ? t('fullScreenOff') : t('fullScreenOn')} arrow={true}>
                    <ButtonIconMiniStyled
                        onClick={() => setFullScreen((prev) => !prev)}
                        className="print-hide full-screen-button">
                        {fullScreen ? <PresentationIcon/> : <FullScreenIcon/>}
                    </ButtonIconMiniStyled>
                </Tooltip>
            </FullScreenButton>

            <SwiperPresentation
                className={clsx('print-hide', {
                    'full-screen': fullScreen,
                })}
                slidesPerView={1}
                keyboard={{
                    enabled: true,
                }}
                loop
                navigation={navigation}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                effect={'cube'}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={autoplay
                    ? [Autoplay, Keyboard, Pagination, Navigation]
                    : [Keyboard, Pagination, Navigation]}
            >
                {slideList?.length && slideList?.map((el) => (
                    <SwiperSlide key={el?.id}>
                        <MainSlideStyled className={el.template}>
                            <div className="slide-container">
                                {(el.title || el.content) && (
                                    <div className="text-wrapper">
                                        {el.title && <h3>{el.title}</h3>}
                                        <p>{el.content}</p>
                                    </div>
                                )}

                                <div className="img-wrapper">
                                    {el.img && <img src={el.img} alt="slide"/>}
                                </div>
                            </div>
                        </MainSlideStyled>
                    </SwiperSlide>
                ))}
                {navigation && (
                    <>
                        <div className="button-next">
                            <ArrowLeft/>
                        </div>

                        <div className="button-prev">
                            <ArrowRight/>
                        </div>
                    </>
                )}
            </SwiperPresentation>
        </>
    );
};

SlidePresentation.propTypes = {
    slideList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            content: PropTypes.string,
            img: PropTypes.string,
            template: PropTypes.string,
        })
    ).isRequired,
    autoplay: PropTypes.bool,
    navigation: PropTypes.bool,
};
