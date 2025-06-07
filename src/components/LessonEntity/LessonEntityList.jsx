import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useGetAllEntities} from '../../api/entity/useGetAllEntities';
import {EntityListStyled} from './EntityItemStyled';
import {EntityItemExpanded} from './components/EntityItemExpanded';
import {useGetEntityListByIds} from '../../api/entity/useGetEntityListByIds';
import {publicStatuses} from '../../constants/statuses/publicStatuses';
import {getOption} from '../../utils/getOption';
import {FormAsideCreation} from './components/FormAsideCreation';
import {VeremLayout} from '../../pages/VeremLayout.jsx';
import {TitleLarge} from '../TitleStyled.jsx';
import PropTypes from 'prop-types';
import {BigModal} from "../Modal/BigModal.jsx";
import {EditIcon} from "../../assets/EditIcon.jsx";
import {AddIcon} from "../../assets/AddIcon.jsx";

export const LessonEntityList = ({entityName}) => {
    const initialValue = {
        title: '',
        tags: [],
        text: '',
        image: null,
    };
    const {t} = useTranslation('tr');
    const {user} = useSelector((state) => state.auth);
    const {getAllEntities} = useGetAllEntities(entityName);
    const {getEntities: getMyLessons, entities: lessons} =
        useGetEntityListByIds('lessons');
    const [options, setOptions] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [isAsideFormOpen, setIsAsideFormOpen] = useState(false);
    const [entitiesList, setEntitiesList] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(initialValue);

    useEffect(() => {
        getAllEntities().then((data) => setEntitiesList(data));
    }, [getAllEntities, shouldUpdate]);

    useEffect(() => {
        user?.uid && getMyLessons(user?.lessons).then(() => {
        });
    }, [getMyLessons, user]);

    useEffect(() => {
        lessons.length > 0 &&
        setOptions(
            lessons
                .filter((el) => el.status === publicStatuses.draft)
                .map((el) => getOption(el))
        );
    }, [lessons]);

    return (
        <VeremLayout>
            <div className="entity-title-wrapper">
                <TitleLarge>{t(`entities.${entityName}`)}
                    {user?.uid && (
                        <BigModal
                            icon={selectedEntity.id ? <EditIcon/> : <AddIcon/>}
                            isOpen={isAsideFormOpen}
                            onCancel={() => {
                            }}
                            setIsOpen={setIsAsideFormOpen}
                            modalTitle={t('button.editLesson')}
                            onConfirm={() => {
                            }}
                        >
                            <FormAsideCreation
                                entityName={entityName}
                                onConfirm={() => {
                                    setShouldUpdate((prev) => !prev);
                                    setIsAsideFormOpen(true);
                                    setSelectedEntity(initialValue);
                                }}
                                onClose={() => setIsAsideFormOpen(false)}
                                defaultValues={selectedEntity}
                                lessonsOptions={[]}
                            />
                        </BigModal>
                    )}
                </TitleLarge>
            </div>
            <EntityListStyled>
                <section className="ksu-content">
                    <section className="content-wrapper">
                        <div className="content-list">
                            {entitiesList?.length > 0 &&
                                entitiesList.map((el) => (
                                    <EntityItemExpanded
                                        lessonsOptions={options}
                                        onLessonSelect={(e) => e.stopPropagation()}
                                        onConfirm={() => setShouldUpdate((prev) => !prev)}
                                        onEdit={(e, data) => {
                                            e.stopPropagation();
                                            setIsAsideFormOpen(true);
                                            setSelectedEntity(data);
                                        }}
                                        key={el.id}
                                        entityName={entityName}
                                        item={el}
                                    />
                                ))}
                        </div>
                    </section>
                </section>
            </EntityListStyled>
        </VeremLayout>
    );
};

LessonEntityList.propTypes = {
    entityName: PropTypes.string.isRequired,
};
