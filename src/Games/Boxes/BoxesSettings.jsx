import { BoxesSettingsStyled } from './BoxesStyled';
import { useEffect, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../../components/ButtonStyled';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { TestTextStyled } from '../Test/components/TestItemStyled';
import { clsx } from 'clsx';
import { Tooltip } from 'antd';
import { ValidationErrorStyled } from '../../components/ValidationErrorStyled';
import { MinusIcon as RemoveIcon } from '../../assets/MinusIcon.jsx';
import { v4 as uuidv4 } from 'uuid';
import { InputStyled, LabelStyled } from '../../components/InputStyled';

export const BoxesSettings = ({ data, onSave }) => {
  const [testSaved, setTestSaved] = useState(false);
  const [test, setTest] = useState([
    {
      id: uuidv4(),
      question: '',
      error: { questionLength: '' },
    },
  ]);
  const dispatch = useDispatch();

  const addQuestion = () => {
    setTest((prev) => [
      {
        id: uuidv4(),
        question: '',
        error: { questionLength: '' },
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    setTest(data);
  }, [data]);

  const handleCancel = () => {
    setTest([
      {
        id: uuidv4(),
        question: '',
        error: { questionLength: '' },
      },
    ]);
  };

  const handleSave = async () => {
    try {
      const newData = {
        id: 'boxes',
        settings: test,
      };

      await onSave(newData);
      setTestSaved(true);
      dispatch(
        setMessage({
          type: 'success',
          message: {
            title: `Success`,
            description: `Boxes settings was saved successfully`,
          },
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error`,
            description: error.message,
          },
        })
      );
    }
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    setTest((prevCards) => {
      // Создаем копию массива prevCards
      const updatedCards = [...prevCards];
      // Удаляем элемент, который нужно переместить
      const [draggedCard] = updatedCards.splice(result.source.index, 1);
      // Вставляем элемент в новую позицию
      updatedCards.splice(result.destination.index, 0, draggedCard);
      return updatedCards; // Обновляем стейт
    });
  }

  const onRemoveItem = (id) => {
    setTest((prev) => prev.filter((el) => el.id !== id));
  };

  const handleChangeItem = (id, content) => {
    if (typeof content === 'string') {
      if (content?.length > 200) {
        setTest((prev) =>
          prev.map((item) => ({
            ...item,
            error: {
              ...item.error,
              questionLength:
                'Для цього типу гир довжина запитання не може' +
                ' перевищувати 160 символів',
            },
          }))
        );

        return;
      }
      setTest((prev) =>
        prev.map((el) => (el.id === id ? { ...el, question: content } : el))
      );
    }
  };

  return (
    <div>
      <BoxesSettingsStyled>
        <aside className="aside-wrapper">
          <div>
            <h2 className="title d-flex">Створіть тест</h2>
            <div>
              <div>
                {(provided) => (
                  <TestTextStyled
                    className="test dnd-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {test?.some((el) => el.question?.length)
? (
                      test?.map((testItem, idx) => (
                        <div
                          key={idx.toString()}
                        >
                          {(provided) => (
                            <li
                              key={testItem.id}
                              className="test-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <div className="drag-handler" />
                              <span className="test-text-question">
                                <b>
                                  {idx + 1}. {testItem.question}
                                </b>
                              </span>
                            </li>
                          )}
                        </div>
                      ))
                    )
: (
                      <div className="empty-test">
                        Тут з'являться питання тесту
                      </div>
                    )}
                  </TestTextStyled>
                )}
              </div>
            </div>
          </div>
          <br />
        </aside>
        <section className="content-wrapper">
          <h2 className="title">Додайте питання</h2>
          <div
            className={clsx({
              'sticky-action': true,
              error: test?.some((el) =>
                Object.keys(el.error)?.some((key) => el.error[key])
              ),
              success:
                testSaved &&
                test.every((el) =>
                  Object.keys(el.error).every((key) => !el.error[key])
                ),
            })}>
              <Tooltip placement="Додати питання до тесту" arrow={true}>
                  <ButtonIconStyled onClick={addQuestion}>+</ButtonIconStyled>
              </Tooltip>
            {test?.length && (
              <>
                <ButtonStyled onClick={handleCancel}>Відмінити</ButtonStyled>
                <ButtonStyled onClick={handleSave}>Зберігти</ButtonStyled>
              </>
            )}
          </div>
          {test?.map((el) => {
            return (
              <div className="question-wrapper ">
                {el.error.questionLength && (
                  <ValidationErrorStyled>
                    {el.error.questionLength}
                  </ValidationErrorStyled>
                )}
                <div className="test-question">
                  <div>
                    <LabelStyled className="input-label">
                      Текст питання
                    </LabelStyled>
                    <InputStyled
                      id={el.id}
                      name={'question'}
                      placeholder="Текст запитання"
                      value={el.question}
                      onChange={(e) => handleChangeItem(el.id, e.target.value)}
                    />
                  </div>
                    <Tooltip placement="Додати питання до тесту" arrow={true}>
                        <ButtonIconStyled
                                className="remove-handle"
                                onClick={() => onRemoveItem(el.id)}>
                            <RemoveIcon />
                        </ButtonIconStyled>
                    </Tooltip>
                </div>
              </div>
            );
          })}
        </section>
      </BoxesSettingsStyled>
    </div>
  );
};
