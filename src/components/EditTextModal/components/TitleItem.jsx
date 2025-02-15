import { InputFieldStyled, InputStyled } from '../../InputStyled';
import { ButtonIconStyled } from '../../ButtonStyled';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { BlockWrapperInputStyled } from '../style';

export const TitleItem = ({
  field,
  index,
  label,
  placeholder,
  handleRemove,
  handleChange,
}) => {
  return (
    <div
      key={index.toString()}>
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <InputFieldStyled>
            <label htmlFor={field?.id}>{label}</label>
            <InputStyled
              key={field?.id}
              id={field?.id}
              name={field.type}
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => handleChange(e.target)}
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
