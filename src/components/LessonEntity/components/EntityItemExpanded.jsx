import {EntityItemStyled} from '../EntityItemStyled';
import {HTMLRenderer} from '../../HTMLRender/HTMLRender';
import {useState} from 'react';
import {clsx} from 'clsx';
import {EditIcon} from '../../../assets/EditIcon.jsx';
import {getDateLocalString} from '../../../utils/getDateLocalString';
import {ButtonIconMiniStyled} from '../../ButtonStyled';
import {useDeleteEntity} from '../../../api/entity/useDeleteEntity';
import {useSelector} from 'react-redux';
import {DeleteConfirmationModal} from '../../Modal/DeleteConfirmationModal';
import {useTranslation} from 'react-i18next';
import {useAssignEntityToLesson} from '../../../api/refs/useAssignEntityToLesson';
import {useEditEntity} from '../../../api/entity/useEditEntity';
import PropTypes from 'prop-types';
import { PHOTO_PLACEHOLDER } from '../../../constants/main.js';

export const EntityItemExpanded = ({
                                       entityName,
                                       item,
                                       onConfirm,
                                       onEdit,
                                   }) => {
    const {t} = useTranslation('tr');
    const {user} = useSelector((store) => store.auth);
    const [isContentShown, setIsContentShown] = useState(false);
    const {removeEntityFromArrayField, addEntityToArrayField} =
        useAssignEntityToLesson(entityName);
    const [selectedLesson, setSelectedLesson] = useState('');
    const {deleteEntity} = useDeleteEntity(entityName);
    const {editEntity} = useEditEntity(entityName);
    const findFirstImage = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const imgElement = doc.querySelector('img');
        if (imgElement) {
            return imgElement.outerHTML; // Возвращает HTML-код первого изображения
        } else {
            return null;
        }
    };
    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            if (Array.isArray(item?.lessons) && item.lessons.length > 0) {
                for (let lessonId of item.lessons) {
                    await removeEntityFromArrayField(entityName, item?.id, lessonId);
                }
            }
            await deleteEntity(item.id);
            onConfirm();
        } catch (err) {
            throw new Error(err);
        }
    };

    const assignToLesson = async () => {
        try {
            await addEntityToArrayField(entityName, item.id, selectedLesson);
            await editEntity({
                id: item.id,
                lessons: [...item.lessons, selectedLesson],
            });
            setSelectedLesson('');
            onConfirm();
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <EntityItemStyled
            className={clsx({
                entityName,
                expanded: isContentShown,
            })}
            role="button"
            onClick={() => setIsContentShown((prev) => !prev)}>
            <div className="item-content">
                <div className="image">
                    {item?.imageUrl
                        ? (
                            <img src={item?.imageUrl} alt={item.title}/>
                        )
                        : (
                           <img src={PHOTO_PLACEHOLDER} alt={item.title}/>
                        )}
                </div>
                <div className="item-title">
                    <div className="btn-block">
                        {user?.uid === item?.createdBy?.uid ? (
                            <ButtonIconMiniStyled onClick={(e) => onEdit(e, item)}>
                                <EditIcon/>
                            </ButtonIconMiniStyled>
                        ) : null}
                        {user?.uid === item?.createdBy?.uid && (
                            <DeleteConfirmationModal
                                modalTitle={t(`delete.${entityName}.title`)}
                                modalContent={t(`delete.${entityName}.content`)}
                                onConfirm={handleDelete}
                                onCancel={() => {
                                }}
                            />
                        )}
                    </div>
                    <h1>{item?.title || <span className="light">No title</span>}</h1>
                    <div className="meta">
                        <p>
                            <b>Автор: </b>
                            {item.createdBy?.fullName}
                        </p>
                        <p>
                            <b>Створено: </b>
                            {item?.createdAt && getDateLocalString(JSON.parse(item?.createdAt))}
                        </p>
                        <p>
                            <b>Кількість використань: </b>
                            {item?.lessons?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
            {isContentShown && (
                <div className="text">
                    <HTMLRenderer htmlContent={item?.text}/>
                </div>
            )}
        </EntityItemStyled>
    );
};

EntityItemExpanded.propTypes = {
    entityName: PropTypes.string.isRequired,
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        imageUrl: PropTypes.string,
        createdBy: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
        }),
        createdAt: PropTypes.string,
        lessons: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onConfirm: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};
