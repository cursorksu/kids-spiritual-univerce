import {Controller, useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Row} from 'antd';
import KsuEditor from '../../KsuEditor';
import {useEditEntity} from '../../../api/entity/useEditEntity';
import {useCreateEntity} from '../../../api/entity/useCreateEntity';
import {CreateEntityFormStyled} from '../../CreateEntityForm/CreateEntityFormStyled';
import {InputStyled, LabelStyled} from '../../InputStyled';
import {KsuTags} from '../../KsuTags/KsuTags';
import {ButtonStyled} from '../../ButtonStyled';
import PropTypes from 'prop-types';

export const FormAsideCreation = ({
                                      entityName,
                                      onConfirm,
                                      onClose,
                                      lessonsOptions,
                                      defaultValues = {},
                                  }) => {
    const {reset, control, getValues} = useForm({
        defaultValues,
        caches: false,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const {editEntity} = useEditEntity(entityName);
    const {createEntity} = useCreateEntity(entityName);
    const {t} = useTranslation('tr');

    return (
        <>
            <CreateEntityFormStyled className={'aside'}>
                <Controller
                    name="title"
                    control={control}
                    render={({field}) => (
                        <div className="title">
                            <LabelStyled>{t(`${entityName}.labels.title`)}</LabelStyled>
                            <InputStyled
                                value={field.value}
                                {...field}
                                onChange={field.onChange}
                                placeholder={t(`${entityName}.placeholders.title`)}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="imageUrl"
                    control={control}
                    render={({field}) => (
                        <div className="image-url">
                            <LabelStyled>{'Посилання на зображення'}</LabelStyled>
                            <InputStyled
                                value={field.value}
                                {...field}
                                onChange={field.onChange}
                                placeholder={t(`${entityName}.placeholders.imageUrl`)}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="text"
                    control={control}
                    render={({field}) => (
                        <div className="text">
                            <LabelStyled>{t(`${entityName}.labels.text`)}</LabelStyled>
                            <KsuEditor
                                placeholder={'Почніть вводити текст...'}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        </div>
                    )}
                />
            </CreateEntityFormStyled>
            <Row className="modal-actions" justify="space-between" align="middle" type="flex" gutter={1}>
                <ButtonStyled
                    onClick={async () => {
                        const newData = getValues();
                        const id = defaultValues.id
                            ? await editEntity(newData)
                            : await createEntity(newData);
                        await onConfirm(id, newData);
                        onClose && onClose();
                        reset();
                    }}>
                    {t('button.confirm')}
                </ButtonStyled>
                <ButtonStyled
                    className="secondary"
                    onClick={async () => {
                        onClose && onClose();
                        reset();
                    }}>
                    {t('button.cancel')}
                </ButtonStyled>
            </Row>
        </>
    );
};

FormAsideCreation.propTypes = {
    entityName: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    lessonsOptions: PropTypes.array,
    defaultValues: PropTypes.object,
};
