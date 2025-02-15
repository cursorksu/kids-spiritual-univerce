import { useCallback, useEffect, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { Modal } from 'antd';
import { EditIcon } from '../../assets/EditIcon.jsx';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { HandleBar } from './components/HandleBar';
import { List } from './components/List';
import { DateItem } from './components/DateItem';
import { TitleItem } from './components/TitleItem';
import { ParagraphItem } from './components/ParagraphItem';
import { DividerItem } from './components/DividerItem';
import { ImageItem } from './components/ImageItem';
import { LinkItem } from './components/LinkItem';
import { MediaItem } from './components/MediaItem';
import { generateId } from '../../utils/generateId';
import { DialogStyled } from '../DialogStyled';

const getTitle = (name) => {
  switch (name) {
  case 'craft':
    return 'Додайте нову творчу активність';
  case 'game':
    return 'Додайте нову гру';
  default:
    return 'Створіть свою історію';
  }
};

import PropTypes from 'prop-types';

export const EditTextModal = ({ entityName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedEntity, setUpdatedEntity] = useState(null);

  useEffect(() => {}, [isOpen, entityName]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const reset = () => {
    setUpdatedEntity([]);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, []);

  const onSubmitHandler = useCallback(async () => {
    try {
    } finally {
      handleClose();
    }
  }, [handleClose]);

  const addEntity = useCallback((entityName) => {
    setUpdatedEntity((prev) =>
      Array.isArray(prev)
        ? [
          ...prev,
          {
            id: generateId(),
            value: '',
            type: entityName,
          },
        ]
        : []
    );
  }, []);

  const handleChangeField = (target, type) => {
    const { id, value, name } = target;
    const updatedData = { id, value, type: name || type };

    setUpdatedEntity((prev) =>
      prev.map((el) => (el?.id === id ? updatedData : el))
    );
  };

  const handleChangeParagraph = ({ target, ...e }) => {
    setUpdatedEntity((prev) => {
      let value = prev?.find((el) => el?.id === target.id)?.value;
      const updatedData = {
        id: target?.id,
        value: target.value,
        type: 'paragraph',
      };
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        updatedData.value = value + '\n';
      }

      return prev.map((el) => (el?.id === target.id ? updatedData : el));
    });
  };

  const handleRemove = useCallback((id) => {
    setUpdatedEntity((prev) => prev?.filter((el) => el?.id !== id));
  }, []);

  const handleChange = useCallback((data) => {
    setUpdatedEntity((prev) =>
      prev.map((el) => (el?.id === data.id ? data : el))
    );
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    // Создаем копию массива prevCards
    const updatedCards = [...updatedEntity];
    // Удаляем элемент, который нужно переместить
    const [draggedCard] = updatedCards.splice(result.source.index, 1);
    // Вставляем элемент в новую позицию
    updatedCards.splice(result.destination.index, 0, draggedCard);

    return setUpdatedEntity(updatedCards); // Обновляем стейт
  }

  return (
    <DialogStyled>
        <ButtonIconStyled className="print-hide" onClick={handleOpen}>
            <EditIcon />
        </ButtonIconStyled>
        <Modal
                open={isOpen}
                onCancel={handleClose}
        >
        <div className="title modal-header">
          {getTitle(entityName)}
          <HandleBar
            addEntity={addEntity}
            clearRenderList={reset}
            mode={entityName}
          />
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </div>
        <div className="dynamic-list modal-content">
          <div>
            <div>
              {(provided) => (
                <ul
                  className="dnd-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {updatedEntity?.map((el, index) => {
                    if (el.type === 'list') {
                      return (
                        <List
                          key={el?.id}
                          field={el}
                          index={index}
                          handleChange={handleChange}
                          handleRemove={handleRemove}
                        />
                      );
                    }

                    if (el.type === 'date') {
                      return (
                        <DateItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                          handleChange={handleChange}
                        />
                      );
                    }

                    if (el.type === 'title') {
                      return (
                        <TitleItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                          handleChange={handleChangeField}
                          placeholder={'Введіть заголовок'}
                          label={'Заголовок'}
                        />
                      );
                    }

                    if (el.type === 'subtitle') {
                      return (
                        <TitleItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                          handleChange={handleChangeField}
                          placeholder={'Введіть підзаголовок'}
                          label={'Підзаголовок'}
                        />
                      );
                    }

                    if (el.type === 'paragraph') {
                      return (
                        <ParagraphItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                          handleChange={handleChangeParagraph}
                          placeholder={'Введіть параграф тексту'}
                          label={'Текст'}
                        />
                      );
                    }

                    if (el.type === 'dev') {
                      return (
                        <DividerItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                        />
                      );
                    }

                    if (el.type === 'image') {
                      return (
                        <ImageItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                          handleChange={(data) =>
                            handleChange({
                              id: el?.id,
                              type: el.type,
                              ...data,
                            })
                          }
                        />
                      );
                    }

                    if (el.type === 'link') {
                      return (
                        <LinkItem
                          key={el?.id}
                          field={el}
                          index={index}
                          label={{
                            value: 'Посилання',
                            text: 'Текст посилання',
                          }}
                          placeholder={{
                            value: 'Додайте посилання',
                            text: 'Додайте текст посилання',
                          }}
                          handleRemove={handleRemove}
                          handleChange={(data) =>
                            handleChange({
                              id: el?.id,
                              type: el.type,
                              ...data,
                            })
                          }
                        />
                      );
                    }

                    if (el.type === 'media') {
                      return (
                        <MediaItem
                          key={el?.id}
                          field={el}
                          index={index}
                          handleRemove={handleRemove}
                          handleChange={(data) =>
                            handleChange({
                              id: el?.id,
                              type: el.type,
                              ...data,
                            })
                          }
                        />
                      );
                    }

                    if (el.type === 'dict') {
                      return (
                        <LinkItem
                          key={el?.id}
                          field={el}
                          index={index}
                          label={{
                            value: 'Слово',
                            text: 'Визначення',
                          }}
                          placeholder={{
                            value: 'Додайте слово',
                            text: 'Додайте визначення',
                          }}
                          handleRemove={handleRemove}
                          handleChange={(data) =>
                            handleChange({
                              id: el?.id,
                              type: el.type,
                              ...data,
                            })
                          }
                        />
                      );
                    }

                    return <></>;
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={'modal-actions'}>
          <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={onSubmitHandler}>Зберегти</ButtonStyled>
        </div>
      </Modal>
    </DialogStyled>
  );
};


EditTextModal.propTypes = {
    entityName: PropTypes.string.isRequired,
};

