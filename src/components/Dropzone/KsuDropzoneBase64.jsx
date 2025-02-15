import { KsuDropzoneStyled, UvDropzoneStyled } from './styles';
import Dropzone from 'react-dropzone';
import { UvFileItem } from './FileItem';
import React from 'react';
import { resizeFile } from '../../utils/resizeFile';
import { useTranslation } from 'react-i18next';

export const KsuDropzoneBase64 = ({ onChange, files, multiple }) => {
    const { t } = useTranslation('tr');
    const onDrop = async (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const getUri = resizeFile(file);
            getUri &&
            getUri.then((preview) => {
                onChange([
                    ...files,
                    {
                        ...file,
                        path: file?.path,
                        name: file?.name,
                        size: file?.size,
                        base64: preview,
                    },
                ]);
            });
        });
    };

    const handleRemove = (data) => {
        const newData = files.filter((el) => {
            return el?.path !== data?.path;
        });

        onChange(newData);
    };

    return (
        <KsuDropzoneStyled>
            <Dropzone onDrop={onDrop} multiple={multiple}>
                {({ getRootProps, getInputProps }) => (
                    <UvDropzoneStyled>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} accept=".png,.jpg,.svg"/>
                            {files?.length
                             ? (
                                 !files[0]?.base64 && (
                                     <span className="accent">+ {t('button.uploadPhoto')}</span>
                                 )
                             )
                             : (
                                 <></>
                             )}
                            {files?.length
                             ? (
                                 files[0]?.base64 && (
                                     <img src={files[0]?.base64} alt={files[0]?.base64}/>
                                 )
                             )
                             : (
                                 <></>
                             )}
                        </div>
                    </UvDropzoneStyled>
                )}
            </Dropzone>
            {files?.length
             ? (
                 <UvFileItem files={files} handleRemove={handleRemove}/>
             )
             : (
                 <></>
             )}
        </KsuDropzoneStyled>
    );
};
