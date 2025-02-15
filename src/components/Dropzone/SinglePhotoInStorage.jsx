import React, {useEffect, useState} from 'react';
import {UvDropzoneStyled} from './styles';
import Dropzone from 'react-dropzone';
import {resizeFile} from '../../utils/resizeFile';
import {useImages} from '../../api/images/useImages';
import {useTranslation} from 'react-i18next';
import {ButtonIconMiniStyled} from "../ButtonStyled";
import { DeleteIcon } from '../../assets/DeleteIcon.jsx';
import PropTypes from 'prop-types';
export const SinglePhotoInStorage = ({onChange, file, folder}) => {
    const [currentFile, setCurrentFile] = useState(file);
    const {uploadImage, deleteImage} = useImages();
    const {t} = useTranslation('tr');

    useEffect(() => {
        setCurrentFile(file)
;    }, [file]);

    const onDrop = async (acceptedFiles) => {
        let updatedFile = file;
        for (const file of acceptedFiles) {
            const preview = await resizeFile(file, undefined, undefined, 40);
            const downloadURL = await uploadImage(file, folder);
            updatedFile = {
                ...file,
                path: file?.path,
                name: file?.name,
                size: file?.size,
                preview,
                downloadURL,
            };
        }
        await onChange(updatedFile.downloadURL);
    };

    const handleRemove = async () => {
        await deleteImage(currentFile);
        setCurrentFile(null);
    }

    return (
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                        <UvDropzoneStyled className="user-avatar">
                            {!currentFile ? (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} accept=".png,.jpg,.svg"/>
                                    <span className="accent">+ {t('button.uploadPhoto')}</span>
                                </div>
                            ) : <img src={file} alt="church logo"/>}
                            <ButtonIconMiniStyled
                                    className="delete-button"
                                    onClick={handleRemove}
                            >
                                <DeleteIcon />
                            </ButtonIconMiniStyled>
                        </UvDropzoneStyled>
                )}
            </Dropzone>
    );
};

SinglePhotoInStorage.propTypes = {
    onChange: PropTypes.func.isRequired,
    file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    folder: PropTypes.string.isRequired,
};
