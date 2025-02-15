import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { EditIcon } from '../../assets/EditIcon.jsx';
import { AddIcon } from '../../assets/AddIcon.jsx';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { studentConfig } from '../../constants/entities/studentConfig';
import { useState } from 'react';
import {
    Modal,
    Tooltip,
} from 'antd';
import { ButtonIconMiniStyled } from '../ButtonStyled';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

export const EditStudentModal = ({
    student,
    onConfirm,
}) => {
    const { t } = useTranslation('tr');
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
            <>
                <Tooltip
                        content={!student.id
                                ? t('students.addStudent')
                                : t('students.editStudent')}
                >
                    <ButtonIconMiniStyled onClick={handleOpen}>
                        {student.id
                                ? <EditIcon/>
                                : <AddIcon/>}
                    </ButtonIconMiniStyled>
                </Tooltip>
                <Modal
                        className={'ksu-modal'}
                        onCancel={handleClose}
                        size={'large'}
                        open={isOpen}
                >
                    <div className="title modal-header">
                        <h2>{!student.id
                                ? t('students.addStudent')
                                : t('students.editStudent')}</h2>
                        <ButtonIconMiniStyled onClick={handleClose}>
                            <CloseIcon/>
                        </ButtonIconMiniStyled>
                    </div>
                    <CreateEntityForm
                            className="sticky"
                            entityName="students"
                            onConfirm={() => {
                                onConfirm();
                                handleClose();
                            }}
                            onClose={handleClose}
                            fields={studentConfig}
                            defaultValues={student}
                    />
                </Modal>
            </>
    );
};

EditStudentModal.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }).isRequired,
    onConfirm: PropTypes.func.isRequired,
};