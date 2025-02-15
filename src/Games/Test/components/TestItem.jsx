import { MinusIcon as RemoveIcon } from '../../../assets/MinusIcon.jsx';
import {
    InputStyled,
    LabelStyled,
} from '../../../components/InputStyled';
import { ButtonIconStyled } from '../../../components/ButtonStyled';
import { TestItemStyled } from './TestItemStyled';
import {
    Checkbox,
    Tooltip,
} from 'antd';
import { ShadowCardStyled } from '../../../pages/MainContentStyled';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

export const answerIds = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
];
import PropTypes from 'prop-types';

export const TestItem = ({ item, onRemoveItem, onChange }) => {
    return (
            <ShadowCardStyled className="d-block">
                <TestItemStyled>
                    <div className="test-question">
                        <div>
                            <LabelStyled className="input-label">Текст питання</LabelStyled>
                            <InputStyled
                                    id={item.id}
                                    name={'question'}
                                    placeholder="Текст запитання"
                                    value={item.question}
                                    onChange={(e) => onChange(item.id, e.target.value)}
                            />
                        </div>
                        <div/>
                        <Tooltip content={'Видалити питання з тесту'} arrow={true}>
                            <ButtonIconStyled
                                    className="remove-handle"
                                    onClick={() => onRemoveItem(item.id)}>
                                <RemoveIcon/>
                            </ButtonIconStyled>
                        </Tooltip>
                        <Tooltip content={'Додати ще один варіант відповіді'} arrow={true}>
                            <ButtonIconStyled
                                    className="remove-handle"
                                    onClick={() =>
                                            onChange(item.id, [
                                                ...item.answer,
                                                {
                                                    id: uuidv4(),
                                                    text: '',
                                                    isTrue: false,
                                                },
                                            ])
                                    }>
                                +
                            </ButtonIconStyled>
                        </Tooltip>
                    </div>
                    {item.answer &&
                     item.answer.map((el, idx) => (
                             <div className="test-answer" key={el.id}>
                                 <div>
                                     <LabelStyled className="input-label">
                                         Відповідь {answerIds[idx]}
                                     </LabelStyled>
                                     <InputStyled
                                             id={el.id}
                                             name={'answer'}
                                             placeholder="Наступний елемент списку"
                                             value={el.text}
                                             onChange={(e) =>
                                                     onChange(
                                                             item.id,
                                                             item.answer.map((answer) =>
                                                                     answer.id === el.id
                                                                             ? {
                                                                                 ...answer,
                                                                                 text: e.target.value,
                                                                                 char: answerIds[idx],
                                                                             }
                                                                             : answer,
                                                             ),
                                                     )
                                             }
                                     />
                                 </div>
                                 <Tooltip content={'Відмітити відповідь як вірну'} arrow={true}>
                                     <Checkbox
                                             slider
                                             checked={el.isTrue}
                                             onChange={() =>
                                                     onChange(
                                                             item.id,
                                                             item.answer.map((answer) =>
                                                                     answer.id === el.id
                                                                             ? {
                                                                                 ...answer,
                                                                                 isTrue: !el.isTrue,
                                                                             }
                                                                             : {
                                                                                 ...answer,
                                                                                 isTrue:
                                                                                         !el.isTrue === true
                                                                                                 ? false
                                                                                                 : answer.isTrue,
                                                                             },
                                                             ),
                                                     )
                                             }
                                     />
                                 </Tooltip>
                                 <Tooltip
                                         content={
                                             'Відзначте ті питання які можуть бути видалені під час вибору опції 50%50'
                                         } arrow={true}
                                 >
                                     <ButtonIconStyled
                                             className={clsx({
                                                 'remove-handle': true,
                                                 'is-excluded': el.isExcluded,
                                             })}
                                             onClick={() =>
                                                     onChange(
                                                             item.id,
                                                             item.answer.map((answer) =>
                                                                     answer.id === el.id
                                                                             ? {
                                                                                 ...answer,
                                                                                 isExcluded: !answer.isExcluded,
                                                                             }
                                                                             : answer,
                                                             ),
                                                     )
                                             }>
                                         {!el.isExcluded
                                                 ? '%'
                                                 : 'X'}
                                     </ButtonIconStyled>
                                 </Tooltip>
                                 <Tooltip content={'Видалити варіант відповіді'} arrow={true}>
                                     <ButtonIconStyled
                                             className="remove-handle"
                                             onClick={() =>
                                                     onChange(
                                                             item.id,
                                                             item.answer.filter((answer) => answer.id !== el.id),
                                                     )
                                             }>
                                         <RemoveIcon/>
                                     </ButtonIconStyled>
                                 </Tooltip>
                             </div>
                     ))}
                </TestItemStyled>
            </ShadowCardStyled>
    );
};

TestItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        answer: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                    isTrue: PropTypes.bool.isRequired,
                    isExcluded: PropTypes.bool,
                }),
        ),
    }).isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
