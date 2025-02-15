import { ButtonIconStyled } from '../../ButtonStyled';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { BlockWrapperInputStyled } from '../style';
import { KsuDatePicker } from '../../KsuDatePicker/KsuDatePicker';

import PropTypes from 'prop-types';

export const DateItem = ({ field, index, handleChange, handleRemove }) => {
  return (
    <div
      key={index.toString()}
    >
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <KsuDatePicker
            id={field?.id}
            legend={'Дата'}
            value={field.value}
            onChange={(data) =>
              handleChange({
                id: field?.id,
                value: data,
                type: field.type,
              })
            }
          />

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

DateItem.propTypes = {
    field: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
};
