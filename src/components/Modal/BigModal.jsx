import {
    Modal,
    Tooltip,
} from 'antd';
import {
    ButtonIconMiniStyled,
} from '../ButtonStyled';
import { useCallback } from 'react';

import PropTypes from 'prop-types';
import { MODAL_WIDTH } from '../../constants/main.js';

export const BigModal = ({
    isOpen,
    setIsOpen,
    modalTitle,
    onCancel,
    icon,
    size = 'large',
    children,
    footer = null,
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
                        width={MODAL_WIDTH[size]}
                        size={size}
                        open={isOpen}
                        onCancel={handleClose}
                        onOk={onCancel}
                        title={modalTitle}
                        footer={footer}
                >
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
    footer: PropTypes.node,
    children: PropTypes.node,
};