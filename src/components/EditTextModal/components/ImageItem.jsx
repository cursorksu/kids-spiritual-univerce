import { BlockWrapperInputStyled } from '../style';
import { ButtonIconStyled } from '../../ButtonStyled';
import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import { DropzoneField } from '../../Dropzone/DropzoneField';

import PropTypes from 'prop-types';

export const ImageItem = ({ field, index, handleRemove, handleChange }) => {
  return (
    <div key={index.toString()}>
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <DropzoneField onChange={handleChange} field={field} />
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

ImageItem.propTypes = {
  field: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
