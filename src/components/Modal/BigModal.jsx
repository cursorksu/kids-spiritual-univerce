import {
    Modal,
    Tooltip,
} from 'antd';
import {
    ButtonIconMiniStyled,
    ButtonIconStyled,
} from '../ButtonStyled';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { useCallback } from 'react';

import PropTypes from 'prop-types';

export const BigModal = ({
    isOpen,
    setIsOpen,
    modalTitle,
    onCancel,
    icon,
    size = 'big',
    children,
}) => {

    const handleOpen = useCallback((e) => {
        e.stopPropagation();
        setIsOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        onCancel && onCancel();
        setIsOpen(false);
    }, [onCancel]);

    return (
            <>
                <Tooltip placement="topLeft" title={modalTitle} arrow={true}>
                    <ButtonIconMiniStyled
                            className={'ksu-modal-trigger'}
                            onClick={handleOpen}>
                        {icon}
                    </ButtonIconMiniStyled>
                </Tooltip>

                <Modal
                        size={size}
                        open={isOpen}
                        onCancel={onCancel}
                        onOk={onCancel}
                >
                    <div className="title modal-header">
                        <h2>{modalTitle}</h2>
                        <ButtonIconStyled onClick={handleClose}>
                            <CloseIcon/>
                        </ButtonIconStyled>
                    </div>
                    {children}
                </Modal>
            </>
    );
};

BigModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    icon: PropTypes.node,
    size: PropTypes.string,
    children: PropTypes.node,
};