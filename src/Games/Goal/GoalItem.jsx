import {Button, Col, InputNumber, Row, Slider} from "antd";
import {useEffect, useState} from "react";

const data = [
    {
        title: 'Я можу бачити проблеми людей',
        description_1: 'Де 0 - це "Я навіть не розумію що турбує мене",',
        description_2: 'а 10 - це "Я розумію причини проблем цього світу"',
    },
    {
        title: 'Я знаю як закривати потреби людей',
        description_1: 'Де 0 - це "Я не закриваю самостійно навіть свої потреби",',
        description_2: 'а 10 - це "Я маю бачення відносно вирішення проблем великих груп людей"',
    },
    {
        title: 'Я маю ресурс щоб вирішити проблеми людей',
        description_1: 'Де 0 - це "Я не маю власного ресурсу",',
        description_2: 'а 10 - це "Я можу допомогти кожному до кого дотягнуся"',
    },
    {
        title: 'Я знаю своє покликання і рухаюсь в ньому',
        description_1: 'Де 0 - це "Я не вірю що в людини має бути покликання",',
        description_2: 'а 10 - це "Так - мені зрозуміле моє покликання і я рухаюсь в ньому"',
    }
]

// eslint-disable-next-line react/prop-types
export const GoalItem = ({ step, onSave, isChecked }) => {
    const [inputValue, setInputValue] = useState(0);
    const [saveIsDisabled, setSaveIsDisabled] = useState(false);

    useEffect(() => {
        setSaveIsDisabled(false);
    }, [step]);
    const onChange = (newValue) => {
        setInputValue(newValue);
    };

    return (
        <Row>
            <h1>{data[step].title}</h1>
            {!isChecked && (
                <>
                    <p>{data[step].description_1}</p>
                    <p>{data[step].description_2}</p>
                    <div className="block-slider">
                        <Col span={8}>
                            <Slider
                                min={0}
                                max={10}
                                onChange={onChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={20}
                                style={{margin: '0 16px'}}
                                value={inputValue}
                                onChange={onChange}
                            />
                        </Col>
                        <Col span={4}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    onSave(inputValue);
                                    setSaveIsDisabled(true);
                                }}
                                disabled={saveIsDisabled}
                            >
                                Зберегти
                            </Button>
                        </Col>
                    </div>
                </>
            )}
        </Row>
    );
}