import { BlockWrapperInputStyled } from '../style';
import { ButtonIconStyled } from '../../ButtonStyled';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { useEffect, useState } from 'react';
import { InputFieldStyled, InputStyled } from '../../InputStyled';

import PropTypes from 'prop-types';

export const LinkItem = ({
  field,
  index,
  handleRemove,
  handleChange,
  placeholder,
  label,
}) => {
  const [link, setLink] = useState(field.value);
  const [text, setText] = useState(field.text);

  useEffect(() => {
    handleChange({
      value: link,
      text,
    });
  }, [link, text]);

  return (
    <div
      key={index.toString()}>
      {(provided) => (
        <BlockWrapperInputStyled
          className="grid"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <InputFieldStyled>
            <label>{label.value}</label>
            <InputStyled
              name={`${field.type}-value`}
              placeholder={placeholder?.value}
              value={field.value}
              onChange={(e) => setLink(e.target.value)}
            />
          </InputFieldStyled>
          <InputFieldStyled>
            <label>{label.text}</label>
            <InputStyled
              name={`${field.type}-text`}
              placeholder={placeholder?.text}
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

LinkItem.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  }),
  label: PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  }),
};
