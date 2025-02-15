import { DynamicList } from '../../DynamicList/DynamicList';
import { ButtonIconStyled } from '../../ButtonStyled';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { BlockWrapperInputStyled } from '../style';

export const List = ({ field, index, handleChange, handleRemove }) => {
  return (
    <div key={index.toString()}>
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <DynamicList field={field} onChangeField={handleChange} />
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
