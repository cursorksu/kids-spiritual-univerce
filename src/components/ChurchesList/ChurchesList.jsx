import { UserProfileStyled } from '../UserProfile/UserProfileStyled';
import {
    ButtonIconStyled,
    ButtonStyled,
} from '../ButtonStyled';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { churchConfig } from '../../constants/entities/churchConfig';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { ChurchesListStyled } from './styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Modal } from 'antd';
import { CloseIcon } from '../../assets/CloseIcon.jsx';
import { useTransactions } from '../../api/transaction/useTransactions';
import { ChurchItem } from './ChurchItem';
import { VeremLayout } from '../../pages/VeremLayout.jsx';

const initialValues = {
    title: '',
    address: '',
    city: '',
    subtitle: '',
    about: '',
    phone: '',
    email: '',
    createdDate: new Date(),
    web: '',
    pastor: '',
    avatar: '',
    logo: '',
    pictures: [],
    groups: [],
    teachers: [],
};

export const ChurchesList = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isFormShown, setIsFormShown] = useState(false);
    const [defaultValues, setDefaultValues] = useState(initialValues);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const { t } = useTranslation('tr');
    const { getAllEntities } = useGetAllEntities('church');
    const [churchList, setChurchList] = useState([]);
    const { deleteChurchWithTransaction } = useTransactions();

    useEffect(() => {
        getAllEntities().then((data) => setChurchList(data));
    }, [
        getAllEntities,
        shouldUpdate,
    ]);

    const confirmationHandler = async () => {
        setShouldUpdate((prev) => !prev);
    };

    const cardClickHandler = useCallback((e, id) => {
        e.stopPropagation();
        navigate(`/church/${id}`);
    }, [navigate]);

    const handleDeleteWithTransaction = async (e, churchData) => {
        e.stopPropagation();
        await deleteChurchWithTransaction(churchData);
        setShouldUpdate(prev => !prev);
    };

    return (
            <VeremLayout>
                <UserProfileStyled>
                    <div className="top-container">
                        <h1 className="title">
                            {t('mainMenu.community')}
                            {user?.uid
                                    ? (
                                            <>
                                                <ButtonStyled
                                                        onClick={() => {
                                                            setDefaultValues({
                                                                ...initialValues,
                                                                teachers: [user.uid],
                                                            });
                                                            setIsFormShown(true);
                                                        }}>
                                                    + {t('church.addChurch')}
                                                </ButtonStyled>
                                                {user?.uid && (
                                                        <Modal
                                                                className={'ksu-modal'}
                                                                open={isFormShown}
                                                                title={
                                                                    <div className="title modal-header">
                                                                        <h2>{t('church.addChurch')}</h2>
                                                                        <ButtonIconStyled
                                                                                onClick={() => setIsFormShown(false)}>
                                                                            <CloseIcon/>
                                                                        </ButtonIconStyled>
                                                                    </div>
                                                                }
                                                                size={'large'}
                                                                onCancel={() => setIsFormShown(true)}
                                                        >
                                                            <CreateEntityForm
                                                                    entityName="church"
                                                                    onConfirm={confirmationHandler}
                                                                    onClose={() => setIsFormShown(false)}
                                                                    fields={churchConfig}
                                                                    defaultValues={defaultValues}
                                                            />
                                                        </Modal>
                                                )}
                                            </>
                                    )
                                    : (
                                            <p className="info">
                                                Якщо ви не знайшли свою церкву у списку нижче, зареєструйтеся і
                                                додайте її самостійно. Це дозволить вам ділитися вашим креативним
                                                контентом
                                            </p>
                                    )}
                        </h1>
                    </div>
                </UserProfileStyled>
                <ChurchesListStyled>
                    {churchList?.length > 0 && churchList.map((el) => (
                            <ChurchItem
                                    key={el.id}
                                    church={el}
                                    isAuthor={el.createdBy?.uid === user?.uid}
                                    onDelete={(e) => handleDeleteWithTransaction(e, el)}
                                    onClick={(e) => cardClickHandler(e, el.id)}
                                    titleHover={el.title}
                                    forceUpdate={setShouldUpdate}
                            />
                    ))}
                </ChurchesListStyled>
            </VeremLayout>
    );
};
