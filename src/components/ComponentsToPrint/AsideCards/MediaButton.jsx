import {MediaButtonStyled} from './styles';
import {useTranslation} from 'react-i18next';
import { Tooltip } from 'antd';


import PropTypes from 'prop-types';

export const MediaButton = ({ title, icon, onClick, className }) => {
    const {t} = useTranslation('tr');

    return (
            <Tooltip title={t(title)} arrow={true}>
                <MediaButtonStyled onClick={onClick} className={className}>
                    {icon}
                </MediaButtonStyled>
            </Tooltip>
    );
};

MediaButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};