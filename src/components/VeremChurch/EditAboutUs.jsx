import { BigModal } from '../Modal/BigModal';
import {EditIcon} from '../../assets/EditIcon.jsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonStyled } from '../ButtonStyled';
import { FormStyled, InputFieldStyled, LabelStyled, TextareaAutosizeStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { useEditEntity } from '../../api/entity/useEditEntity';

export const EditAboutUs = ({ church, forceUpdate }) => {
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const { editEntity: editChurch } = useEditEntity('church');
    const { reset, control, getValues } = useForm({
        defaultValues: { about: church?.about },
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (church) {
            reset({ about: church.about });
        }
    }, [ church ]);

    const saveChange = async () => {
        try {
            await editChurch({ ...church, ...getValues() });
            forceUpdate(prev => !prev);
            reset({ about: church.about });
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
                    modalTitle={t('church.labels.about')}
                    onCancel={reset}
                    icon={<EditIcon/>}
            >
                <div className={'modal-content'}>
                    <FormStyled>
                        <Controller
                                name="about"
                                control={control}
                                render={({ field }) => (
                                        <InputFieldStyled>
                                            <LabelStyled className="label">
                                                {t(`church.labels.about`)}
                                            </LabelStyled>
                                            <TextareaAutosizeStyled
                                                    value={field.value}
                                                    {...field}
                                                    placeholder={t(`church.placeholder.about`)}
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
                    <ButtonStyled className="ksu-button" onClick={saveChange}>
                        {t('button.edit')}
                    </ButtonStyled>
                </div>
            </BigModal>
    );
};