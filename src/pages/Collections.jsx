import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { SprintCard } from '../components/SprintCard/SprintCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CreateEntityForm } from '../components/CreateEntityForm/CreateEntityForm';
import { useGetAllEntities } from '../api/entity/useGetAllEntities';
import { useDeleteEntity } from '../api/entity/useDeleteEntity';
import { Tooltip } from 'antd';
import {
    collectionConfig,
    defaultValues,
} from '../constants/entities/collectionsConfig';
import { VeremLayout } from './VeremLayout.jsx';
import { ButtonStyled } from '../components/ButtonStyled.js';

export const Collections = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { collections } = useSelector((store) => store);
    const { getAllEntities } = useGetAllEntities('collections');
    const { deleteEntity } = useDeleteEntity('collections', getAllEntities);
    const { t } = useTranslation('tr');
    const [initialValues, setInitialValues] = useState(defaultValues);

    useEffect(() => {
        getAllEntities().then(() => {});
    }, [getAllEntities]);

    const [isFormShown, setIsFormShown] = useState(false);

    const lessonsHandler = useCallback(
            (e, collectionId) => {
                e.stopPropagation();
                navigate(`${collectionId}${routes.lessons}`);
            },
            [navigate],
    );

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        await deleteEntity(id);
        await getAllEntities();
    };
    const handleEdit = (e, id) => {
        e.stopPropagation();
        setIsFormShown(true);
        setInitialValues(collections.find((el) => el.id === id));
    };

    const handleCreateConfirmation = async () => {
        setIsFormShown((prev) => !prev);
        await getAllEntities();
    };

    return (
            <VeremLayout>
                <div className="hero collection-hero">
                    <div className="title-wrapper top-container">
                        <h1 className="title">{t('collections.collections')}</h1>
                        {user?.uid && (
                                <div>
                                    <Tooltip content="Створити колекцію">
                                        <ButtonStyled onClick={() => setIsFormShown(!isFormShown)}>
                                            + {t('collections.createCollection')}
                                        </ButtonStyled>
                                    </Tooltip>
                                </div>
                        )}
                    </div>
                </div>

                <div className="collections-parent-wrapper">
                    {isFormShown && (
                            <CreateEntityForm
                                    className="sticky"
                                    defaultValues={initialValues}
                                    onConfirm={() => handleCreateConfirmation()}
                                    onClose={() => setIsFormShown(false)}
                                    entityName={'collections'}
                                    fields={collectionConfig}
                            />
                    )}
                    <div className="collections-wrapper">
                        {collections?.length > 0 &&
                         collections?.map((el) => (
                                 <SprintCard
                                         key={el.id}
                                         editEnable={user?.uid === el.createdBy?.uid}
                                         modalTitle={'collections.deleteCollection'}
                                         modalContent={'modal.collectionDelete'}
                                         onDelete={(e) => handleDelete(e, el.id)}
                                         onEdit={handleEdit}
                                         onClick={(e) => lessonsHandler(e, el.id)}
                                         img={el?.imageUrl}
                                         titleHover={el.title}
                                         id={el.id}>
                                     <div>
                                         <div>
                                         </div>
                                         <div>
                        <span className="meta">
                          {el.createdBy?.firstName} {el.createdBy?.lastName}
                        </span>
                                         </div>
                                     </div>
                                     <div>
                                         <hr/>
                                         <div>
                                             <span className="meta description">{el.description}</span>
                                         </div>
                                         <h3 className="title" title={el.title}>
                                             {el.title}
                                         </h3>
                                     </div>
                                 </SprintCard>
                         ))}
                    </div>
                </div>
            </VeremLayout>
    );
};
