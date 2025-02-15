import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import { EditIcon } from '../../assets/EditIcon.jsx';
import { ArrowLeftIcon as ArrowLeft } from '../../assets/ArrowLeftIcon.jsx';
import { ArrowRightIcon as ArrowRight } from '../../assets/ArrowRightIcon.jsx';
import { ScreenIcon } from '../../assets/ScreenIcon.jsx';
import { FullScreenIcon } from '../../assets/FullScreenIcon.jsx';
import { SwiperSlider } from './SwiperSlider';
import { Tooltip } from 'antd';
import 'swiper/css';
import 'swiper/css/pagination';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ButtonIconMiniStyled } from '../ButtonStyled';
import { MultiImageUploader } from '../ImageCroper/MultiImageUploader';
import { BigModal } from '../Modal/BigModal';
import {StudentProfileStyled} from "./style";

import PropTypes from 'prop-types';

export const SlideShow = ({
                              isAuth,
                              slideList,
                              blur,
                              autoplay = false,
                              navigation = true,
                              entityName = 'error',
                              entity = null,
                              storageFolderName = 'image',
                              forceUpdate
                          }) => {
    const [ fullScreen, setFullScreen ] = useState(false);
    const [ isFormOpen, setIsFormOpen ] = useState(false);
    const { t } = useTranslation('tr');


    return (
        <StudentProfileStyled>
            <SwiperSlider
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
                         ? [ Autoplay, Keyboard, Pagination, Navigation ]
                         : [ Keyboard, Pagination, Navigation ]}
            >
                {isAuth && (
                    <BigModal
                        isOpen={isFormOpen}
                        setIsOpen={setIsFormOpen}
                        modalTitle={t('church.selectImagesForGallery')}
                        onCancel={() => setIsFormOpen(false)}
                        icon={<EditIcon/>}
                    >
                        <MultiImageUploader
                            closeForm={() => setIsFormOpen(false)}
                            forceUpdate={forceUpdate}
                            entityName={entityName}
                            entity={entity}
                        />
                    </BigModal>
                )}
                <Tooltip placement={fullScreen ? t('fullScreenOff') : t('fullScreenOn')} arrow={true}>
                    <ButtonIconMiniStyled
                            onClick={() => setFullScreen((prev) => !prev)}
                            className="print-hide full-screen-button">
                        {fullScreen ? <ScreenIcon/> : <FullScreenIcon/>}
                    </ButtonIconMiniStyled>
                </Tooltip>

                {slideList?.map((el) => (
                    <SwiperSlide key={el?.id}>
                        {blur ? (
                            <div
                                className="img"
                                style={{
                                    backgroundImage:
                                        `url("${el.value}")`,
                                }}/>
                        ) : (
                             <>
                                 <img src={el.value} alt={el.description}/>
                                 {el.description && (
                                     <div className="description">
                                         <p>{el.description}</p>
                                     </div>
                                 )}
                             </>
                         )}
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
            </SwiperSlider>
        </StudentProfileStyled>
    );
};

SlideShow.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    slideList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
    blur: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool,
    navigation: PropTypes.bool,
    entityName: PropTypes.string,
    entity: PropTypes.any,
    storageFolderName: PropTypes.string,
    forceUpdate: PropTypes.func.isRequired,
};
