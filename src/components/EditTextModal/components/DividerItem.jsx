import { ButtonIconStyled } from '../../ButtonStyled';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { BlockWrapperInputStyled } from '../style';
import { InputFieldStyled } from '../../InputStyled';

export const DividerItem = ({ field, index, handleRemove }) => {
  return (
    <div key={index.toString()}>
      {(provided) => (
        <BlockWrapperInputStyled
          className="divider"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <InputFieldStyled>
            <label>Розділювач</label>
            <hr />
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
