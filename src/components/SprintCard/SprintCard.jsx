import { SprintCardStyled } from './SprintCardStyled';
import { Shape as ShapeBg } from '../../assets/Shape.jsx';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';

import { EditImage } from '../Modal/EditImage';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

export const SprintCard = ({
    img,
    id,
    children,
    onClick,
    titleHover,
    onDelete,
    editEnable = false,
    modalTitle,
    modalContent,
    entity,
    forceUpdate,
}) => {
    const { t } = useTranslation('tr');

    return (
            <SprintCardStyled>
                <img src={img} alt="img"/>
                <div className="shape-light">
                    <ShapeBg/>
                </div>
                <div className="shape">
                    <ShapeBg/>
                </div>
                <div className="content">{children}</div>
                <h3 className="title hover" onClick={onClick}>{titleHover}</h3>
                {editEnable && (
                        <div className="action">
                            {entity && (
                                    <Tooltip placement={t('church.placeholders.avatar')} arrow={true}>
                                        <EditImage
                                                entity={entity}
                                                entityName={'church'}
                                                forceUpdate={forceUpdate}
                                                imageFieldName={'avatar'}
                                        />
                                    </Tooltip>
                            )}

                            <DeleteConfirmationModal
                                    modalTitle={`${t(modalTitle)} ${titleHover}`}
                                    modalContent={`${t(modalContent)}`}
                                    onConfirm={(e) => onDelete(e, id)}
                            />
                        </div>
                )}
            </SprintCardStyled>
    );
};

SprintCard.propTypes = {
    img: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    titleHover: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    editEnable: PropTypes.bool,
    modalTitle: PropTypes.string,
    modalContent: PropTypes.string,
    entity: PropTypes.object,
    forceUpdate: PropTypes.func,
};