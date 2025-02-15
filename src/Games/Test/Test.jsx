import { useEffect, useRef, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../../components/ButtonStyled';
import { TestItem } from './components/TestItem.jsx';
import { Tooltip } from 'antd';
import { ValidationErrorStyled } from '../../components/ValidationErrorStyled';
import { TestTextStyled, TestWrapperStyled } from './components/TestItemStyled';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';

export const Test = ({ onSave, settings }) => {
  const timoutRef = useRef(null);
  const [testSaved, setTestSaved] = useState(false);
  const [test, setTest] = useState([
    {
      id: uuidv4(),
      question: '',
      error: {
        char: '',
        answersLength: '',
        questionLength: '',
        noFact: '',
      },
      answer: [
        {
          char: '',
          id: uuidv4(),
          text: '',
          isTrue: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    const prevTest = localStorage.getItem('test');
    const prevTestParsed = prevTest && JSON.parse(prevTest);

    settings?.length
      ? setTest(settings)
      : prevTestParsed?.length && setTest(prevTestParsed);
  }, [settings]);

  useEffect(() => {
    timoutRef.current = setTimeout(() => {
      setTest((prev) =>
        prev.map((item) => ({
          ...item,
          error: {
            char: '',
            answersLength: '',
            questionLength: '',
            noFact: '',
          },
        }))
      );
    }, 12000);

    return () => {
      clearTimeout(timoutRef.current);
    };
  }, [test]);

  const addQuestion = () => {
    setTest((prev) => [
      {
        id: uuidv4(),
        question: '',
        error: {
          char: '',
          answersLength: '',
          questionLength: '',
          noFact: '',
        },
        answer: [
          {
            char: '',
            id: uuidv4(),
            text: '',
            isTrue: false,
          },
        ],
      },
      ...prev,
    ]);
  };

  const onRemoveItem = (id) => {
    setTest((prev) => prev.filter((el) => el.id !== id));
  };

  const handleChangeItem = (id, content) => {
    if (typeof content === 'string') {
      if (content?.length > 160) {
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
    } else {
      if (content?.length > 8) {
        setTest((prev) =>
          prev.map((el) =>
            el.id === id
              ? {
                ...el,
                error: {
                  ...el.error,
                  char:
                      'Для цього типу гри кількість відповідей не може' +
                      ' бути більше 8',
                },
              }
              : el
          )
        );

        return;
      }

      if (content?.some((el) => el.text?.length > 50)) {
        setTest((prev) =>
          prev.map((el) =>
            el.id === id
              ? {
                ...el,
                error: {
                  ...el.error,
                  answersLength:
                      'Для цього типу гри довжина відповіді не може' +
                      ' бути більше 50 символів',
                },
              }
              : el
          )
        );

        return;
      }

      setTest((prev) =>
        prev.map((el) => (el.id === id ? { ...el, answer: content } : el))
      );
    }
  };

  const handleSave = () => {
    const prevTest = localStorage.getItem('test');
    const prevTestParsed = settings
      ? settings
      : prevTest && JSON.parse(prevTest);

    const noFactItem = test?.find((item) =>
      item.answer.every((el) => !el.isTrue)
    );

    if (noFactItem?.id) {
      setTest((prev) =>
        prev.map((item) =>
          item.id === noFactItem.id
            ? {
              ...item,
              error: {
                ...item.error,
                noFact:
                    'Посуньте повзик щоб відмітити хочаб одну правильну' +
                    ' відповідь',
              },
            }
            : item
        )
      );

      return;
    }
    if (prevTestParsed?.length) {
      const newTest = new Set([...prevTestParsed, ...test]);
      onSave({
        id: 'test',
        settings: Array.from(newTest),
      });
      localStorage.setItem('test', JSON.stringify(Array.from(newTest)));
    }
    onSave({
      id: 'test',
      settings: Array.from(test),
    });
    localStorage.setItem('test', JSON.stringify(Array.from(test)));
    setTestSaved(true);
  };

  const handleCancel = () => {
    setTestSaved(false);
    setTest([
      {
        id: uuidv4(),
        question: '',
        error: {
          char: '',
          answersLength: '',
          questionLength: '',
          noFact: '',
        },
        answer: [
          {
            id: uuidv4(),
            text: '',
            isTrue: false,
            char: '',
          },
        ],
      },
    ]);
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

  return (
    <TestWrapperStyled>
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
                    test.map((testItem, idx) => (
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
                            <ul>
                              {testItem.answer.map((answer) => (
                                <li key={answer.id}>
                                  <b>{`${answer.char}${answer.char && ')'}`}</b>
                                  {answer.text}
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </div>
                    ))
                  )
: (
                    <div className="empty-test">
                      Тут з&apos;являться питання тесту
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
        <h2 className="title">Додайте тест</h2>
        <p>
          Відмідьте ті питання, які будуть скриті при виборі опції 50 на 50. Не
          відмічайте цією відміткою правильну відповідь. Тільки ви регулююте які
          відповіді будуть скриті під час вибору опції 50%50.
        </p>
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
            <Tooltip title={'Додати питання до тесту'} arrow={true}>
                <ButtonIconStyled onClick={addQuestion}>+</ButtonIconStyled>
            </Tooltip>
          {test?.length && (
            <>
              <ButtonStyled onClick={handleCancel}>Відмінити</ButtonStyled>
              <ButtonStyled onClick={handleSave}>Зберігти</ButtonStyled>
            </>
          )}
        </div>
        {test.map((el, idx) => {
          return (
            <div className="question-wrapper " key={el.id || idx}>
              {el.error.char && (
                <ValidationErrorStyled>{el.error.char}</ValidationErrorStyled>
              )}
              {el.error.answersLength && (
                <ValidationErrorStyled>
                  {el.error.answersLength}
                </ValidationErrorStyled>
              )}
              {el.error.noFact && (
                <ValidationErrorStyled>{el.error.noFact}</ValidationErrorStyled>
              )}
              {el.error.questionLength && (
                <ValidationErrorStyled>
                  {el.error.questionLength}
                </ValidationErrorStyled>
              )}
              <TestItem
                item={el}
                onRemoveItem={onRemoveItem}
                onChange={handleChangeItem}
              />
            </div>
          );
        })}
      </section>
    </TestWrapperStyled>
  );
};


Test.propTypes = {
    onSave: PropTypes.func.isRequired,
    settings: PropTypes.array,
};

