import { ButtonIconStyled } from '../ButtonStyled';
import { useCallback, useEffect, useState } from 'react';
import { ChurchHeroStyled } from '../UserProfile/UserProfileStyled';
import { EditIcon } from '../../assets/EditIcon.jsx';
import { DeleteIcon } from '../../assets/DeleteIcon.jsx';
import { useSelector } from 'react-redux';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import {
  getDateLocalString,
  getDateObject,
} from '../../utils/getDateLocalString';
import { scenarioConfig } from '../../constants/entities/scenarioConfig';
import { useNavigate, useParams } from 'react-router';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ScenarioStyled } from '../Scenario/styles';
import { KsuStatus } from '../KsuStatus/KsuStatus';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { useDeleteEntity } from '../../api/entity/useDeleteEntity';
import { routes } from '../../router/constants';
import { VeremLayout } from '../../pages/VeremLayout.jsx';

export const ScenarioItem = () => {
  const [isFormShown, setIsFormShown] = useState(false);
  const { editEntity: editScenario } = useEditEntity('scenario');
  const { deleteEntity } = useDeleteEntity('scenario');
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState({});
  const { getEntityById } = useGetEntity('scenario');
  const navigate = useNavigate();

  useEffect(() => {
    getEntityById(scenarioId).then((data) => {
      setScenario(data);
      setShouldUpdate((prev) => !prev);
    });
  }, [scenarioId, getEntityById, shouldUpdate]);
  const confirmationHandler = async (_, churchData) => {
    setShouldUpdate((prev) => !prev);
  };

  const onStatusChange = useCallback(
    async (status) => {
      await editScenario({ ...scenario, status });
      setShouldUpdate((prev) => !prev);
    },
    [scenario, editScenario]
  );

  const onDelete = useCallback(
    async (id) => {
      await deleteEntity(id);
      setShouldUpdate((prev) => !prev);
      navigate(routes.scenario);
    },
    [deleteEntity]
  );

  return (
    <VeremLayout>
      <ChurchHeroStyled>
        <div className="top-container scenario">
          <div className="avatar">
            <img
              src={scenario?.avatar && scenario?.avatar[0]?.base64}
              alt="church"
            />
          </div>
          <h1 className="title">{scenario?.title}</h1>
          <div className="meta">
            <p>
              Author: <b>{scenario?.author}</b>
            </p>
            <p>
              Created at: <b>{getDateLocalString(scenario?.createdDate)}</b>
            </p>
            <p>
              Created by: <b>{scenario?.createdBy?.name}</b>
            </p>
            <p>
              Church: <b>{scenario?.church?.title}</b>
            </p>
          </div>
          <div className="actions">
            {scenario?.createdBy?.uid === user?.uid && (
              <div className="button-wrapper">
                <ButtonIconStyled onClick={() => setIsFormShown(true)}>
                  <EditIcon />
                </ButtonIconStyled>

                <ButtonIconStyled onClick={() => onDelete(scenarioId)}>
                  <DeleteIcon />
                </ButtonIconStyled>
              </div>
            )}
          </div>
        </div>
      </ChurchHeroStyled>
      {isFormShown && (
        <CreateEntityForm
          entityName="scenario"
          onConfirm={confirmationHandler}
          onClose={() => setIsFormShown(false)}
          fields={scenarioConfig}
          defaultValues={{
            ...scenario,
            createdDate:
              scenario?.createdDate && getDateObject(scenario?.createdDate),
          }}
        />
      )}
      <ScenarioStyled>
        <section className="ksu-content">
          <aside className="aside-wrapper">
            <div>
              {scenario?.createdBy?.uid === user?.uid && (
                <KsuStatus
                  status={scenario?.status}
                  mode="normal"
                  onStatusChange={onStatusChange}
                />
              )}
            </div>
          </aside>
          <section className="content-wrapper">
            <div className="content-list">
              <h1>{scenario?.title}</h1>
            </div>
          </section>
        </section>
      </ScenarioStyled>
    </VeremLayout>
  );
};
