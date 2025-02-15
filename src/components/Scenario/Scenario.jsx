import { ScenarioStyled } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { scenarioConfig } from '../../constants/entities/scenarioConfig';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { useTranslation } from 'react-i18next';
import { SprintCard } from '../SprintCard/SprintCard';
import { getDateLocalString } from '../../utils/getDateLocalString';
import { useNavigate } from 'react-router';
import { routes } from '../../router/constants';
import { useGetFilteredScenario } from '../../api/scenario/useGetFilteredScenario';
import { clsx } from 'clsx';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { PAGE_SIZE } from '../../constants/main';
import { VeremLayout } from '../../pages/VeremLayout.jsx';

const initialValues = {
  avatar: [],
  title: '',
  createdDate: new Date(),
  author: '',
  church: '',
  content: '',
  status: 4,
  tags: [],
  videos: [],
  soundtracks: [],
};

export const Scenario = () => {
  const { t } = useTranslation('tr');
  const [pageIndex, setPageIndex] = useState(1);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [defaultValues, setDefaultValues] = useState(initialValues);
  const [isFormShown, setIsFormShown] = useState(false);
  const [scenario, setScenario] = useState([]);
  const { getPublishedScenarioList, totalCount } = useGetFilteredScenario();
  const { deleteEntity } = useDeleteEntity('scenario');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getPublishedScenarioList().then((data) => {
      setScenario(data);
    });
  }, [shouldUpdate]);

  useEffect(() => {
    user?.church?.length &&
      setDefaultValues((prev) => ({
        ...prev,
        church: user?.church[0],
      }));
  }, [user]);
  const confirmationHandler = async () => {
    getPublishedScenarioList().then((data) => {
      setScenario(data);
    });
  };

  const onDelete = useCallback(
    async (e, id) => {
      e.stopPropagation();
      await deleteEntity(id);
      setShouldUpdate((prev) => !prev);
    },
    [deleteEntity]
  );

  return (
    <VeremLayout>
      <div className="hero scenario-hero">
        <div className="title-wrapper top-container">
          <h1 className="title">{t('mainMenu.show')}</h1>
          {user?.uid && (
            <div>
              <ButtonStyled
                onClick={() => {
                  setDefaultValues(initialValues);
                  setIsFormShown(true);
                }}>
                + {t('scenario.addScenario')}
              </ButtonStyled>
            </div>
          )}
        </div>
      </div>
      {user?.uid && isFormShown && (
        <CreateEntityForm
          entityName="scenario"
          onConfirm={confirmationHandler}
          onClose={() => setIsFormShown(false)}
          fields={scenarioConfig}
          defaultValues={defaultValues}
        />
      )}
      <ScenarioStyled>
        <section className="ksu-content">
          <aside className="aside-wrapper">
            <h2 className="title">Вибирайте сценарії за тегами та назвою</h2>
            <ul>
              <li>
                Попасть на стр сценариев можно
                <ul>
                  <li>
                    со страницы церкви - к конкретному сценарию и к списку
                    сценариев церкви в статусе active
                  </li>
                  <li>
                    со страницы пользователя - к конкретному сценарию и к списку
                    сценариев созданных пользователем (сортировать по статусту
                    драфт, эктив... и т п){' '}
                  </li>
                  <li>
                    из бокового меню к полному списку опубликованных сценариев
                    ✅
                  </li>
                </ul>
              </li>
              <li>Сценарий создает пользователь</li>
              <li>Который может быть заасайнен на церковь как учитель</li>
              <li>Сценарий можно распечатать</li>
              <li>Значит у него особые стили для печати</li>
              <li>Сценарий должен иметь галочку "опубликовать"</li>
              <li>
                Сценарии с полем public = true попадают на борду к модератору
                для модерации
              </li>
              <li>
                Нужен Телеграм бот для оповещения модератора о новых
                поступлениях
              </li>
              <li>
                Сценарии с полем moderatorApproved = true становятся доступными
                для просмотра без регистрации
              </li>
              <li>
                Во время создания сценария создается или выбирается из
                существующих тег по которому может осуществляться выборка из
                списка сценариев
              </li>
            </ul>
            {/*<ReactQuill theme="snow" value={value} onChange={setValue} />*/}
          </aside>
          <section className="content-wrapper">
            <div className="content-list">
              {scenario?.length >= 0 &&
                scenario.map((el) => {
                  return (
                    <SprintCard
                      key={el.id}
                      editEnable={el.createdBy?.uid === user?.uid}
                      onDelete={(e) => onDelete(e, el.id)}
                      modalTitle={'church.deleteChurch'}
                      modalContent={'modal.churchDelete'}
                      onClick={() => navigate(`${routes.scenario}/${el.id}`)}
                      img={el?.avatar[0]?.base64}
                      titleHover={el.title}
                      id={el.id}>
                      <div>
                        <div>
                          <span className="meta">
                            {getDateLocalString(el.createdDate)}
                          </span>
                        </div>
                        <div>
                          <span className="meta">{el.author}</span>
                        </div>
                      </div>
                      <div>
                        <hr />
                        <div>
                          <span className="meta description">{el.tags[0]}</span>
                        </div>
                        <h3 className="title">{el.title}</h3>
                      </div>
                    </SprintCard>
                  );
                })}
            </div>
            {totalCount > PAGE_SIZE && (
              <div className="pagination">
                <ButtonIconStyled
                  className={clsx({ activePage: pageIndex === 1 })}
                  onClick={() => setPageIndex(1)}>
                  1
                </ButtonIconStyled>
                <ButtonIconStyled
                  className={clsx({ activePage: pageIndex === 2 })}
                  onClick={() => setPageIndex(2)}>
                  2
                </ButtonIconStyled>
                <ButtonIconStyled
                  className={clsx({ activePage: pageIndex === 3 })}
                  onClick={() => setPageIndex(3)}>
                  3
                </ButtonIconStyled>
                <ButtonIconStyled
                  className={clsx({ activePage: pageIndex === 4 })}
                  onClick={() => setPageIndex(4)}>
                  4
                </ButtonIconStyled>
              </div>
            )}
          </section>
        </section>
      </ScenarioStyled>
    </VeremLayout>
  );
};
