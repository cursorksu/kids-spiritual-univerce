import {
    useCallback,
    useState,
} from 'react';
import {
    ButtonIconMiniStyled,
    ButtonStyled,
} from '../ButtonStyled';
import {
    Modal,
    Tooltip,
} from 'antd';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { DeleteIcon } from '../../assets/DeleteIcon.jsx';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

export const DeleteConfirmationModal = ({
    modalTitle, modalContent, onConfirm, onCancel, size = 'small',
}) => {
    const { t } = useTranslation('tr');
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback((e) => {
        e.stopPropagation();
        setOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        onCancel && onCancel();
        setOpen(false);
    }, [onCancel]);
    const handleConfirm = useCallback((e) => {
        onConfirm(e);
        setOpen(false);
    }, [onConfirm]);

    return (
            <>
                <Tooltip placement="topLeft" title={modalTitle} arrow={true}>
                    <ButtonIconMiniStyled onClick={handleOpen} className={'delete-button'}>
                        <DeleteIcon/>
                    </ButtonIconMiniStyled>
                </Tooltip>
                <Modal
                        size={size}
                        title={
                            <>
                                <h2 className="title">{modalTitle}</h2>
                                <ButtonIconMiniStyled onClick={handleClose}>
                                    <CloseIcon/>
                                </ButtonIconMiniStyled>
                            </>
                        }
                        open={open}
                        onCancel={onCancel}
                >
                    <div className={'modal-content'}>{modalContent}</div>
                    <div className={'modal-content'}>
                        <ButtonStyled onClick={handleClose} className="secondary">
                            {t('button.cancel')}
                        </ButtonStyled>
                        <ButtonStyled onClick={handleConfirm}>
                            {t('button.delete')}
                        </ButtonStyled>
                    </div>
                </Modal>
            </>
    );
};

DeleteConfirmationModal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    modalContent: PropTypes.node.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

