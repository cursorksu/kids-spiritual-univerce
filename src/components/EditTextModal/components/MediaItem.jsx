import { useEffect, useState } from 'react';
import { BlockWrapperInputStyled } from '../style';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { ButtonIconStyled } from '../../ButtonStyled';
import {
  InputFieldStyled,
  InputStyled,
  TextareaAutosizeStyled,
} from '../../InputStyled';

export const MediaItem = ({ field, index, handleRemove, handleChange }) => {
  const [media, setMedia] = useState(field.value);
  const [text, setText] = useState(field.text);

  useEffect(() => {
    const link = media.replace('youtu.be/', 'www.youtube.com/embed/');
    handleChange({
      value: link,
      text,
    });
  }, [media, text]);

  return (
    <div key={index.toString()}>
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <InputFieldStyled>
            <label htmlFor={field?.id}>
              Ми не можемо зберігати повні відео у нашій базі даних, яка
              фінансується на кошти волотнерів і власні кошти розробніків
            </label>
            <br />
            <label htmlFor={field?.id}>
              Але ви можете розмістити своє відео в YouTube і додати посилання
              на нього тут.
            </label>
            <br />
            <label htmlFor={field?.id}>
              На даний момент платформа корректно працює тільки з посиланнями з
              YouTube.
            </label>
            <br />
            <label htmlFor={field?.id}>
              Для вставки відео використовуйте посилання, яке з'являється після
              натискання кнопки "Поділитися"
            </label>
            <br />
            <br />
            <InputStyled
              key={field?.id}
              id={field?.id}
              name={field.type}
              placeholder="Додайте посилання на відео"
              value={field.value}
              onChange={(e) => setMedia(e.target.value)}
            />
            <br />
            <label htmlFor={field?.id}>Додайте опис до відео</label>
            <TextareaAutosizeStyled
              placeholder="Додайте опис відео"
              value={field.text}
              onChange={(e) => setText(e.target.value)}
            />
          </InputFieldStyled>
          <ButtonIconStyled
            className="remove-handle"
            onClick={() => handleRemove(field?.id)}>
            <RemoveIcon />
          </ButtonIconStyled>
        </BlockWrapperInputStyled>
      )}
    </div>
  );
};
