import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonIconMiniStyled, ButtonStyled } from '../ButtonStyled';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { useTranslation } from 'react-i18next';
import { Content, DropArea, ImageArea, ImageListStyled, Metadata, MultiDropzoneStyled } from './style';
import { getStorage } from '@firebase/storage';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import Cropper from 'react-easy-crop';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useImages } from '../../api/images/useImages';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { getFileNameFromUrl } from '../../utils/getFileNameFromUrl';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';

export const MultiImageUploader = ({ forceUpdate, entityName, entity, closeForm }) => {
    const [ images, setImages ] = useState([]);
    const { editEntity } = useEditEntity(entityName);
    const storage = getStorage();
    const [ image, setImage ] = useState(null);
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ fileInfo, setFileInfo ] = useState(null);
    const dispatch = useDispatch();
    const { deleteImage } = useImages();

    const { t } = useTranslation('tr');

    useEffect(() => {
        if (Array.isArray(entity?.gallery) && entity?.gallery.length) {
            setImages([ ...entity.gallery ]);
        }
    }, [ entity ]);

    const onSave = useCallback(async () => {
        try {
            const status = await editEntity({ id: entity.id, gallery: images });
            closeForm();
            forceUpdate(status);
        } catch (error) {
            dispatch(
                    setMessage({
                        type: 'error',
                        message: {
                            title: `Error edit image:`,
                            description: error.message,
                        },
                    })
            );
        }
    }, [ editEntity, images ]);

    const onCancel = useCallback(async () => {
        const storageRef = getStorage();
        const initialGallery = entity?.gallery || [];
        const newImages = images.filter(el => !!el);
        const imagesToDelete = newImages.filter(image => !initialGallery.includes(image));

        try {
            await Promise.all(
                imagesToDelete.map(async (imageURL) => {
                    const fileRef = ref(storageRef, imageURL);
                    await deleteImage(fileRef);
                })
            );
            closeForm();
        } catch (error) {
            dispatch(
                setMessage({
                    type: 'error',
                    message: {
                        title: `Error delete images:`,
                        description: error.message,
                    },
                })
            );
        }
    }, []);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles.length ? acceptedFiles[0] : {};
        if (file) {
            setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + ' KB' });
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    const getCroppedImage = async () => {
        const canvas = document.createElement('canvas');
        const imageElement = document.createElement('img');
        imageElement.crossOrigin = 'anonymous';
        imageElement.src = image;

        await new Promise((resolve) => {
            imageElement.onload = resolve;
        });

        const { width, height } = croppedAreaPixels;
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        context.drawImage(
            imageElement,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
        });
    };

    const uploadToFirebase = async () => {
        if (!croppedAreaPixels) return;
        try {
            const croppedBlob = await getCroppedImage();
            const storageReference = ref(storage, `${entity?.id}/${fileInfo.name}`);
            await uploadBytes(storageReference, croppedBlob);
            const downloadURL = await getDownloadURL(storageReference);
            setFileInfo(null);
            setImages(prev => ([ downloadURL, ...prev ]));

            dispatch(
                setMessage({
                    type: 'success',
                    message: {
                        title: `Success!`,
                        description: `Image in ${entityName} ${entity?.title} successfully uploaded`,
                    },
                })
            );
        } catch (error) {
            dispatch(
                setMessage({
                    type: 'error',
                    message: {
                        title: `Error upload image:`,
                        description: error.message,
                    },
                })
            );
        }
    };

    const reset = () => {
        setImage(null);
        setFileInfo(null);
    };
    const clearImage = async (url) => {
        try {
            if (url) {
                await deleteImage(url);
                await editEntity({ id: entity.id, gallery: images.filter(el => el !== url) });
                setImages(prev => prev.filter(el => el !== url));
            }
            setImages(prev => prev.filter(el => el !== url));
            reset();
        } catch (error) {
            dispatch(
                setMessage({
                    type: 'error',
                    message: {
                        title: `Error delete image:`,
                        description: error.message,
                    },
                })
            );
        }
    };

    const isConfirmDisabled = useMemo(() => {
        return images.every((el, idx) => el === entity.gallery ? entity.gallery[idx] : false)
    }, [entity.gallery, images]);

    return (
        <>
            <div className={'modal-content'}>
                {!fileInfo && (
                    <DropArea {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>{t('dropZone')}</p>
                    </DropArea>
                )}
                {fileInfo && (
                    <Content>
                        <ButtonIconMiniStyled onClick={reset} className="secondary btn-delete">
                            <CloseIcon/>
                        </ButtonIconMiniStyled>
                        <ImageArea>
                            <MultiDropzoneStyled>
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={2.5 / 1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={(croppedArea, croppedAreaPixels) =>
                                        setCroppedAreaPixels(croppedAreaPixels)
                                    }
                                />
                            </MultiDropzoneStyled>
                        </ImageArea>
                        <Metadata>
                            <div className={clsx({ hide: !fileInfo?.name })}>
                                <h3>{t('fileInfo')}:</h3>
                                <p>{t('fileName')}: {fileInfo?.name}</p>
                                <p>Р{t('fileSize')}: {fileInfo?.size}</p>
                            </div>
                            <div className="button-wrapper">
                                <ButtonStyled onClick={uploadToFirebase}>
                                    {t('button.upload')}
                                </ButtonStyled>
                            </div>
                        </Metadata>
                    </Content>
                )}
                <ImageListStyled>
                    {
                        images.map(el => (
                            <Content key={el}>
                                {!!el && (
                                    <>
                                        <DeleteConfirmationModal
                                            modalTitle={`${t('modal.title.deleteImage')}`}
                                            modalContent={`${t('modal.deleteImage')} ${getFileNameFromUrl(el)}`}
                                            onConfirm={() => clearImage(el)}
                                            size={'small'}
                                        />

                                        <div className={'image-holder'}>
                                            <img src={el} alt="Cropped" style={{ maxWidth: '100%' }}/>
                                        </div>
                                        <p>{getFileNameFromUrl(el)}</p>
                                    </>
                                )}
                            </Content>
                        ))
                    }
                </ImageListStyled>
            </div>
            <div className={'modal-actions'}>
                <ButtonStyled className="secondary" onClick={onCancel}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled onClick={onSave} disabled={isConfirmDisabled}>
                    {t('button.confirm')}
                </ButtonStyled>
            </div>
        </>
    );
};

MultiImageUploader.propTypes = {
    forceUpdate: PropTypes.func.isRequired,
    entityName: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
};
