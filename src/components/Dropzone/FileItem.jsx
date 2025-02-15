import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { ButtonIconStyled } from '../ButtonStyled';
import { FileItemStyled } from './styles';

import PropTypes from 'prop-types';

export const UvFileItem = ({ files, handleRemove }) => {
  const getExe = (title) => {
    if (!title) return;
    const arr = title?.split('.');
    return arr[arr?.length - 1];
  };

  return (
    <div>
      {files?.length
? (
        files?.map((el) => {
          return (
            <FileItemStyled key={el.name}>
              <span>{el?.name?.split('.')[0]}</span>
              <div component="span" className="secondaryGray">
                {el?.name && getExe(el?.name)}
              </div>
              <div>
                {!el?.progress || el?.progress === 100
                  ? Math.round((el?.size / 1000000 + Number.EPSILON) * 100) /
                      100 +
                    'MB'
                  : `${el?.bytesTransferred} Kb of ${el?.totalBytes} Kb`}
              </div>

              <ButtonIconStyled onClick={() => handleRemove(el)}>
                <CloseIcon />
              </ButtonIconStyled>
            </FileItemStyled>
          );
        })
      )
: (
        <></>
      )}
    </div>
  );
};

UvFileItem.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      progress: PropTypes.number,
      bytesTransferred: PropTypes.number,
      totalBytes: PropTypes.number,
    })
  ).isRequired,
  handleRemove: PropTypes.func.isRequired,
};
