import {Button, Popover, Steps} from "antd";
import {useState} from "react";
import {GoalStyled} from "./GoalStyled.js";
import {GoalItem} from "./GoalItem.jsx";
import {useCreateEntity} from "../../api/entity/useCreateEntity.js";
import {useSelector} from "react-redux";
import {useGetAllEntities} from "../../api/entity/useGetAllEntities.js";

const customDot = (dot, {status, index}) => (
    <Popover content={<span>step {index} status: {status}</span>}>
        {dot}
    </Popover>
);
export const Goal = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const {createNoAuthEntity} = useCreateEntity('voting');
    const {getAllEntities} = useGetAllEntities('voting');
    const [votingResults, setVotingResults] = useState([]);

    const { user } = useSelector((state) => state.auth);

    const checkResult = async () => {
        const votingList = await getAllEntities();

        const steps = [0, 1, 2, 3]; // Все возможные шаги
        const results = steps.map((step) => {
            const filteredItems = votingList.filter(item => item.step === step);
            const totalValues = filteredItems.reduce((sum, item) => sum + (item.value || 0), 0);
            const midValue = filteredItems.length > 0 ? Math.round(totalValues / filteredItems.length) : 0;

            return {
                step,
                voters: filteredItems.length,
                midValues: midValue
            };
        });

        setVotingResults(results);
    };

    return (
        <GoalStyled>
            <p className="start-message">Спробуй оцінити свою позицію відносно суспільства</p>
            <Steps
                current={currentStep}
                onChange={setCurrentStep}
                progressDot={customDot}
                items={[
                    {
                        title: '1',
                        disabled: false,
                    },
                    {
                        title: '2',
                        disabled: false,
                    },
                    {
                        title: '3',
                        disabled: currentStep > 1,
                    },
                    {
                        title: '4',
                        disabled: currentStep > 2,
                    },
                ]}
            />
            <GoalItem
                isChecked={votingResults?.length}
                step={currentStep}
                onSave={val => createNoAuthEntity({value: val, step: currentStep})} />
            {user?.uid === 'T01wddIaCYa8Wx018PdffLhZTv43' && (
                <>
                    {!votingResults?.length &&
                        <Button onClick={checkResult} style={{marginBottom: 40}}>
                            Перевірити результат
                        </Button>
                    }
                    {votingResults?.length > 0 && (
                        <>
                            <h2>Проголосувало: {votingResults?.length && votingResults[currentStep].voters}</h2>
                            <h2>Середньє значення: {votingResults?.length && votingResults[currentStep].midValues}</h2>
                        </>
                    )}
                </>
            )}
        </GoalStyled>
    );
};