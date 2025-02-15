import { BigModal } from './BigModal';
import {EditIcon} from '../../assets/EditIcon.jsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonStyled } from '../ButtonStyled';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { ImageUploader } from '../ImageCroper/ImageUploader';

import PropTypes from 'prop-types';

export const EditPastor = ({ church, forceUpdate }) => {
    const initialValues = { pastor: church?.pastor, pastorAvatar: church?.pastorAvatar }
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity: editChurch } = useEditEntity('church');
    const [ isSaveDisabled, setIsSaveDisabled ] = useState(false);
    const { reset, control, getValues, setValue } = useForm({
        defaultValues: initialValues,
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (church) {
            reset(initialValues);
        }
    }, [ church ]);

    const saveChange = async () => {
        try {
            await editChurch({ ...church, ...getValues() });
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
                    modalTitle={t('church.labels.pastor')}
                    onCancel={reset}
                    icon={<EditIcon/>}
            >
                <div className={'modal-content'}>
                    <FormStyled>
                        <Controller
                                name="pastorAvatar"
                                control={control}
                                render={({ field }) => (
                                        <InputFieldStyled>
                                            <LabelStyled className="label">
                                                {t(`church.labels.pastorAvatar`)}
                                            </LabelStyled>
                                            <ImageUploader
                                                    size={1}
                                                    onUpload={(data) => {
                                                        setValue(field.name, data);
                                                        setIsSaveDisabled(false);
                                                    }}
                                                    onDelete={() => setIsSaveDisabled(true)}
                                                    src={getValues(field.name)}
                                            />
                                        </InputFieldStyled>
                                )}
                        />
                        <Controller
                                name="pastor"
                                control={control}
                                render={({ field }) => (
                                        <InputFieldStyled>
                                            <LabelStyled className="label">
                                                {t(`church.labels.pastor`)}
                                            </LabelStyled>
                                            <InputStyled
                                                    value={field.value}
                                                    {...field}
                                                    placeholder={t(`church.placeholders.pastor`)}
                                            />
                                        </InputFieldStyled>
                                )}
                        />
                    </FormStyled>
                </div>
                <div className={'modal-actions'}>
                    <ButtonStyled
                            className="ksu-button secondary"
                            onClick={() => setIsFormShown(false)}>
                        {t('button.cancel')}
                    </ButtonStyled>
                    <ButtonStyled className="ksu-button" onClick={saveChange} disabled={isSaveDisabled}>
                        {t('button.edit')}
                    </ButtonStyled>
                </div>
            </BigModal>
    );
};

EditPastor.propTypes = {
  church: PropTypes.shape({
    pastor: PropTypes.string,
    pastorAvatar: PropTypes.string,
  }).isRequired,
  forceUpdate: PropTypes.func.isRequired,
};