import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Row } from 'antd';
import { SinglePhotoInStorage } from '../../Dropzone/SinglePhotoInStorage';
import KsuEditor from '../../KsuEditor';
import { useEditEntity } from '../../../api/entity/useEditEntity';
import { useCreateEntity } from '../../../api/entity/useCreateEntity';
import { CreateEntityFormStyled } from '../../CreateEntityForm/CreateEntityFormStyled';
import { InputStyled, LabelStyled } from '../../InputStyled';
import { KsuTags } from '../../KsuTags/KsuTags';
import { ButtonStyled } from '../../ButtonStyled';
import { StyledDropdown } from '../../KsuDropdown/StyledDropdown';
import PropTypes from 'prop-types';

export const FormAsideCreation = ({
  entityName,
  onConfirm,
  onClose,
  lessonsOptions,
  defaultValues = {},
}) => {
  const { reset, control, getValues } = useForm({
    defaultValues,
    caches: false,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { editEntity } = useEditEntity(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const { t } = useTranslation('tr');

  return (
    <CreateEntityFormStyled className={'aside'}>
      <div className="aside-form">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <div name="image">
              <LabelStyled>{'Обкладинка'}</LabelStyled>
              <StyledDropdown className="lessons-dropdown">
                <Select
                  placeholder="Виберіть один з уроків"
                  fluid
                  search
                  selection
                  value={field?.lessons?.[0]}
                  onChange={field.onChange}
                  options={lessonsOptions}
                />
              </StyledDropdown>
            </div>
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <div name="image">
              <LabelStyled>{'Обкладинка'}</LabelStyled>
              <SinglePhotoInStorage
                onChange={field.onChange}
                file={field.value}
                folder={entityName}
              />
            </div>
          )}
        />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div name="title">
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
          render={({ field }) => (
            <div name="imageUrl">
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
          name="tags"
          control={control}
          render={({ field }) => (
            <div name="tags">
              <LabelStyled>{t(`${entityName}.labels.tags`)}</LabelStyled>
              <KsuTags
                field={field}
                value={field.value}
                placeholder={t(`${entityName}.placeholders.tags`)}
                onChange={field.onChange}
              />
            </div>
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <div name="text">
              <LabelStyled>{t(`${entityName}.labels.text`)}</LabelStyled>
              <KsuEditor
                placeholder={'Почніть вводити текст...'}
                onChange={field.onChange}
                value={field.value}
              />
            </div>
          )}
        />
      </div>
      <Row>
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
    </CreateEntityFormStyled>
  );
};

FormAsideCreation.propTypes = {
    entityName: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    lessonsOptions: PropTypes.array,
    defaultValues: PropTypes.object,
};
