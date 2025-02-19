import PropTypes from 'prop-types';
import { OptionTeacherStyled } from './StyledDropdown.js';

export const OptionTeacherRender = ({ label, imgUrl, email }) => {
    return (
            <OptionTeacherStyled>
                {imgUrl && <img src={imgUrl} alt={label} />}
                <span>
                    {label}
                    {email && <span className="user-email"> {email}</span>}
                </span>
            </OptionTeacherStyled>
    );
};

OptionTeacherRender.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    email: PropTypes.string,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
};