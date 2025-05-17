import { Tooltip, Modal } from 'antd';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { ImageIcon } from '../../assets/ImageIcon.jsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const CropModal = ({
                             isOpen,
                             setIsOpen,
                             modalTitle,
                             onCancel,
                             onConfirm,
                             children
                         }) => {
    const { t } = useTranslation('tr');

    const handleOpen = useCallback((e) => {
        e.stopPropagation();
        setIsOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        onCancel && onCancel();
        setIsOpen(false);
    }, [ onCancel ]);

    return (
            <>
                <Tooltip placement="topLeft" title='Open Crop Modal' arrow={true}>
                   <ButtonIconStyled onClick={handleOpen}><ImageIcon /></ButtonIconStyled>
                </Tooltip>
                <Modal
                        open={isOpen}
                        title={modalTitle}
                        onOk={onConfirm}
                        onCancel={onCancel}
                        footer={(_, { OkBtn, CancelBtn }) => (
                                <>
                                    <ButtonStyled
                                            className="secondary"
                                            onClick={async () => {
                                                CancelBtn();
                                            }}>
                                        {t('button.cancel')}
                                    </ButtonStyled>
                                    <ButtonStyled
                                            onClick={async () => {
                                                OkBtn();
                                            }}>
                                        Crop
                                    </ButtonStyled>
                                </>
                        )}
                >
                    <div className="modal-header title">
                        <ButtonIconStyled onClick={handleClose}>
                            <CloseIcon/>
                        </ButtonIconStyled>
                    </div>
                    <div>
                        {children}
                    </div>
                </Modal>
            </>
    );
};

CropModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
};