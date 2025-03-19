import PropTypes from 'prop-types';
import {PresentationTitleStyled} from './styles.js';
import {TitleLarge} from '../TitleStyled.jsx';
import {AddIcon} from '../../assets/AddIcon.jsx';
import {useCreateEntity} from '../../api/entity/useCreateEntity.js';
import {BigModal} from "../Modal/BigModal.jsx";
import {useState} from "react";
import {CreateEntityForm} from "../CreateEntityForm/CreateEntityForm.jsx";
import {presentationConfig, presentationDefaultValues} from "../../constants/entities/presentationConfig.js";

export const PresentationTitle = ({title}) => {
    const {createEntity} = useCreateEntity('presentations');
    const [isOpen, setIsOpen] = useState(false);


    return (
        <PresentationTitleStyled>
            <TitleLarge>{title}</TitleLarge>
            <BigModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle='Add new presentation'
                onCancel={() => setIsOpen(false)}
                icon={<AddIcon/>}
                size={'big'}
            >
                <CreateEntityForm
                    entityName="presentations"
                    onConfirm={createEntity}
                    onClose={() => setIsOpen(false)}
                    fields={presentationConfig}
                    defaultValues={presentationDefaultValues}
                />
            </BigModal>
        </PresentationTitleStyled>
    );
};

PresentationTitle.propTypes = {
    title: PropTypes.string.isRequired,
};