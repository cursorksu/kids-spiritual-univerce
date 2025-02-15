import { BigModal } from './BigModal';
import {EditIcon} from '../../assets/EditIcon.jsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonStyled } from '../ButtonStyled';
import { FormStyled, InputFieldStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { ImageUploader } from '../ImageCroper/ImageUploader';

import PropTypes from 'prop-types';

export const EditImage = ({ imageFieldName, entity, entityName, forceUpdate }) => {
    const initialValues = { [imageFieldName]: entity[imageFieldName] };
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity } = useEditEntity(entityName);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const { reset, control, getValues, setValue } = useForm({
        defaultValues: initialValues,
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (entity[imageFieldName]) {
            reset(initialValues);
        }
    }, [ entity[imageFieldName] ]);

    const saveChange = async () => {
        try {
            await editEntity({ ...entity, ...getValues() });
            forceUpdate(prev => !prev);
            reset(initialValues);
            setIsFormShown(false);
        } catch (e) {
            throw new Error(e);
        }
    };

    return (
            <BigModal
                    size={'small'}
                    isOpen={isFormShown}
                    setIsOpen={setIsFormShown}
                    modalTitle={t(`${entityName}.labels.${imageFieldName}`)}
                    onCancel={reset}
                    icon={<EditIcon/>}
            >
                <div className={'modal-content'}>
                    <FormStyled>
                        <Controller
                                name={imageFieldName}
                                control={control}
                                render={({ field }) => (
                                        <InputFieldStyled>
                                            <LabelStyled className="label">
                                                {t(`${entityName}.labels.${imageFieldName}`)}
                                            </LabelStyled>
                                            <ImageUploader
                                                    size={1}
                                                    onUpload={(data) => {
                                                        setValue(field.name, data);
                                                        data && setIsSaveDisabled(false);
                                                    }}
                                                    onDelete={() => setIsSaveDisabled(true)}
                                                    src={getValues(field.name)}
                                            />
                                        </InputFieldStyled>
                                )}
                        />
                    </FormStyled>
                </div>
                <div className={'modal-actions'}>
                    <ButtonStyled
                            className="secondary"
                            onClick={() => setIsFormShown(false)}>
                        {t('button.cancel')}
                    </ButtonStyled>
                    <ButtonStyled onClick={saveChange} disabled={isSaveDisabled}>
                        {t('button.edit')}
                    </ButtonStyled>
                </div>
            </BigModal>
    );
};

EditImage.propTypes = {
    imageFieldName: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    forceUpdate: PropTypes.func.isRequired,
};