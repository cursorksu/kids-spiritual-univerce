import { KsuCard } from '../KsuCard/index.js';
import { TitleMedium } from '../TitleStyled.jsx';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal.jsx';
import PropTypes from 'prop-types';
import { PHOTO_PLACEHOLDER } from '../../constants/main.js';
import { MetaStyled } from './styles.js';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const PresentationItem = ({ presentation }) => {
    const { deleteEntity } = useDeleteEntity('presentations');
    const navigate = useNavigate();
    
    const onDelete = useCallback (async () => {
        presentation && await deleteEntity(presentation?.id);
    }, [deleteEntity, presentation])
    
    return (
            <KsuCard
                    title={'Status: Published'}
                    image={presentation?.slides[0]?.img || PHOTO_PLACEHOLDER}
                    onClick={() => navigate(`/presentations/${presentation?.id}`)}
            >
                <TitleMedium>
                    {presentation?.title}
                    <DeleteConfirmationModal
                            onConfirm={onDelete}
                            modalTitle="Delete presentation"
                            modalContent="Are you sure you want to delete this presentation?"
                    />
                </TitleMedium>

                <MetaStyled>
                    <div>Slides: {presentation?.slides?.length}</div>
                    <div>Author: {presentation?.createdBy?.fullName}</div>
                </MetaStyled>
            </KsuCard>
    );
};

PresentationItem.propTypes = {
    presentation: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        slides: PropTypes.arrayOf(
            PropTypes.shape({
                img: PropTypes.string,
            })
        ),
        createdBy: PropTypes.shape({
            fullName: PropTypes.string,
        }),
    }),
};