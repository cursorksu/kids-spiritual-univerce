import PropTypes from 'prop-types';
import {
    KsuTagStyled,
} from '../KsuTags/styles.js';

export const TagRender = ({ label, value, onClose }) => {
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
            <KsuTagStyled
                    onMouseDown={onPreventMouseDown}
                    closable={true}
                    onClose={() =>  onClose(value)}
                    style={{ marginInlineEnd: 4 }}
            >
                {label}
            </KsuTagStyled>
    );
};

TagRender.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
};