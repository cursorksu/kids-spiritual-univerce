import { useCallback, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { Controller, useForm } from 'react-hook-form';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { AddCreativityIcon as AddCraftIcon } from '../../assets/AddCreativityIcon.jsx';
import { InputStyled } from '../InputStyled';
import { PRIMARY_MAIN } from '../../constants/colors';
import { useSelector } from 'react-redux';

import {
  FormField,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from 'semantic-ui-react';

const INITIAL_LESSON = {
  title: '',
};

export const CreateModal = ({
  onSubmit,
  buttonText,
  modalTitle,
  label,
  placeholder,
  entity,
}) => {
  const { lesson } = useSelector((state) => state.lessonData);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { handleSubmit, reset, control, formState } = useForm({
    defaultValues: INITIAL_LESSON,
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  const onSubmitHandler = useCallback(
    async (data) => {
      await onSubmit(data);
      setIsOpen(false);
      reset();
    },
    [onSubmit, setIsOpen, reset]
  );

  return (
    <div>
      <Modal
        keepMounted
        onClose={handleClose}
        onOpen={handleOpen}
        trigger={
          !lesson?.[entity]?.length && (
            <ButtonStyled onClick={handleOpen}>
              <AddCraftIcon />
              {buttonText}
            </ButtonStyled>
          )
        }
        open={isOpen}>
        <ModalHeader className="title">
          {modalTitle}
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </ModalHeader>
        <ModalContent image className="dynamic-list">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <FormField>
                <label htmlFor="title" color="secondary">
                  {label}
                </label>
                <InputStyled
                  id="title"
                  name="title"
                  placeholder={placeholder}
                  value={field.value}
                  onChange={field.onChange}
                />
                {formState.errors['title'] && (
                  <label sx={{ color: PRIMARY_MAIN }}>
                    Потрібно заповнити це поле
                  </label>
                )}
              </FormField>
            )}
          />
        </ModalContent>
        <ModalActions>
          <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={handleSubmit(onSubmitHandler)}>
            Зберегти
          </ButtonStyled>
        </ModalActions>
      </Modal>
    </div>
  );
};
