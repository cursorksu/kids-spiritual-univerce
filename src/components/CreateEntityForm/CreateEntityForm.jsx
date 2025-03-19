import {CreateEntityFormStyled} from './CreateEntityFormStyled';
import {useCreateEntity} from '../../api/entity/useCreateEntity';
import {
    Controller,
    useForm,
} from 'react-hook-form';
import {ButtonStyled} from '../ButtonStyled';
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {Tooltip} from 'antd';
import {
    InputErrorStyled,
    InputFieldStyled,
    InputStyled,
    LabelStyled,
} from '../InputStyled';
import EmojiPicker, {Emoji} from 'emoji-picker-react';
import {useEditEntity} from '../../api/entity/useEditEntity';
import {KsuDatePicker} from '../KsuDatePicker';
import {KsuDropdown} from '../KsuDropdown';
import {KsuTags} from '../KsuTags/KsuTags';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {ImageUploader} from '../ImageCroper/ImageUploader.jsx';
import {SinglePhotoInStorage} from '../Dropzone/SinglePhotoInStorage';
import clsx from 'clsx';
import {setMessage} from '../../store/notificationReducer';

import PropTypes from 'prop-types';
import {slidesDefaultValues} from "../../constants/entities/presentationConfig.js";

export const CreateEntityForm = ({
                                     entityName, // Prop for the name of the entity
                                     onConfirm,
                                     onClose,
                                     fields,
                                     defaultValues = {},
                                     className,
                                 }) => { // Add prop validation
    const dispatch = useDispatch();
    const [emojiIsOpen, setEmojiIsOpen] = useState(false);
    const {user} = useSelector((state) => state.auth);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const {reset, control, getValues, setValue, formState} = useForm({
        defaultValues,
        caches: false,
        mode: 'onSubmit',
    });
    const emojiHandler = async (emj) => {
        await setValue('avatar', emj.unified);
        await setEmojiIsOpen(false);
    };

    useEffect(() => {
        reset(defaultValues);
        setIsSaveDisabled(true);
    }, [
        defaultValues,
        reset,
    ]);

    useEffect(() => {
        formState.isDirty && setIsSaveDisabled(false);
    }, [formState.isDirty]);

    const {editEntity} = useEditEntity(entityName);
    const {createEntity} = useCreateEntity(entityName);
    const {t} = useTranslation('tr');

    const getElement = useCallback(
        (el, field) => {
            switch (el.inputType) {
                case 'emojiPicker':
                    return (
                        <div className="d-flex duo-cell">
                            <div className="avatar">
                                <Emoji size={80} unified={getValues('avatar')}/>
                            </div>
                            <Tooltip
                                hoverable={false}
                                content={
                                    <EmojiPicker
                                        width={'100%'}
                                        open={emojiIsOpen}
                                        onEmojiClick={emojiHandler}
                                    />
                                }>
                                <ButtonStyled onClick={() => setEmojiIsOpen((prev) => !prev)}>
                                    {t(`${entityName}.placeholders.${el.name}`)}
                                </ButtonStyled>
                            </Tooltip>
                        </div>
                    );
                case 'datePicker':
                    return (
                        <KsuDatePicker
                            selected={field.value}
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            onChange={(date) => setValue(el.name, date)}
                        />
                    );
                case 'imagePicker':
                    return (
                        <ImageUploader
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            size={el.size || 1}
                            onDrop={() => setIsSaveDisabled(true)}
                            onUpload={(data) => {
                                setValue(field.name, data);
                                setIsSaveDisabled(false);
                            }}
                            onDelete={() => setIsSaveDisabled(false)}
                            src={getValues(field.name)}
                        />
                    );
                case 'tags':
                    return (
                        <div className="triple-cell">
                            <KsuTags
                                field={field}
                                value={field.value}
                                placeholder={t(`${entityName}.placeholders.${el.name}`)}
                                onChange={(data) => setValue(field.name, data)}
                            />
                        </div>
                    );
                case 'logoPicker':
                    return (
                        <div className="triple-cell">
                            <SinglePhotoInStorage
                                onChange={(data) => setValue(field.name, data)}
                                file={getValues(field.name)}
                                folder={user?.church[0]}
                            />
                        </div>
                    );
                case 'imagesPicker':
                    return (
                        <ImageUploader
                            size={9 / 16}
                            onDrop={() => setIsSaveDisabled(true)}
                            onUpload={(data) => {
                                setValue(field.name, data);
                                setIsSaveDisabled(false);
                            }}
                            onDelete={() => setIsSaveDisabled(false)}
                            src={getValues(field.name)}
                        />
                    );
                case 'multiselectDropdown':
                    return (
                        <KsuDropdown
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            entityName={el.entity}
                            {...field}
                            onChange={(data) => setValue(field.name, data)}
                            multiple={true}
                            optionsIds={user
                                ? user[el.entity]
                                : []}
                        />
                    );
                case 'dropdown':
                    return (
                        <KsuDropdown
                            placeholder={t(`${entityName}.placeholders.${el.name}`)}
                            entityName={el.entity}
                            {...field}
                            onChange={(data) => setValue(field.name, data)}
                            multiple={false}
                            optionsIds={user[el.entity]}
                        />
                    );
                default:
                    return (
                        <>
                            <InputStyled
                                value={field.value}
                                required={el.required}
                                {...field}
                                placeholder={t(`${entityName}.placeholders.${field.name}`)}
                            />
                            {el.required
                                && !field.value
                                && <InputErrorStyled>{t('errors.required')}</InputErrorStyled>}
                        </>
                    );
            }
        },
        [
            emojiIsOpen,
            defaultValues,
            user,
        ],
    );

    const getRequiredFields = useMemo(() => (
        fields
            .filter(field => field.required)
            .map(field => field.name)
            .join(', ')
    ), [fields]);

    const validationCheck = (data) => {
        let isValid = false;
        const requiredFields = fields.filter((el) => el.required);
        isValid = requiredFields.every((el) => !!data[el.name]);

        return isValid;
    };

    return (
        <>
            <div className={clsx(className, 'dynamic-list modal-content')}>
                <CreateEntityFormStyled>
                    {fields?.map((el) => {
                        if (el.isIgnored) return <></>;

                        return (
                            <Controller
                                key={el.name}
                                name={el.name}
                                control={control}
                                render={({field}) => (
                                    <InputFieldStyled
                                        className={clsx(el.inputType, {'required': el.required})}>
                                        <LabelStyled>
                                            {t(`${entityName}.labels.${el.name}`)}
                                        </LabelStyled>
                                        {getElement(el, field)}
                                    </InputFieldStyled>
                                )}
                            />
                        );
                    })}
                </CreateEntityFormStyled>
            </div>
            <div className="modal-actions">
                <ButtonStyled
                    className="secondary"
                    onClick={async () => {
                        onClose && onClose();
                        reset();
                    }}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled
                    onClick={async () => {
                        const newData = getValues();
                        const isValid = validationCheck(newData);

                        if (!isValid) {
                            dispatch(
                                setMessage({
                                    type: 'error',
                                    message: {
                                        title: `Fill required fields!`,
                                        description: `Check fields: ${getRequiredFields}`,
                                    },
                                }),
                            );

                            return;
                        }
                        const id = defaultValues.id
                            ? await editEntity(newData)
                            : await createEntity(newData);

                        if (entityName === 'presentation' && !newData.title) {
                            newData.slides = [
                                {
                                    ...slidesDefaultValues,
                                    title: newData.title,
                                    content: newData.description,
                                    template: 'title',
                                }
                            ];
                        }

                        await onConfirm(id, newData);
                        onClose && onClose();
                        reset();
                    }}>
                    {t('button.confirm')}
                </ButtonStyled>
            </div>
        </>
    );
};

CreateEntityForm.propTypes = {
    entityName: PropTypes.string.isRequired, // PropType validation for entityName
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    fields: PropTypes.array,
    defaultValues: PropTypes.object,
    className: PropTypes.string,
};
