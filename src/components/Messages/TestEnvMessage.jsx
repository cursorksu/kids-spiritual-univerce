import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { setTestEnvMessageClose } from '../../store/testEnvMessageReducer';
import { Modal } from 'antd';

export const TestEnvMessage = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(store => store.testEnvMessage);
    const onClose = () => dispatch(setTestEnvMessageClose(false));

    return (
            <Modal open={isOpen} onCancel={onClose} footer={null} className={'testEnvMessage'}>
                <h3>
                    Увага! Ви працюєте з сайтом який знаходитсья у розробці!
                </h3>
                <div>
                    <p>
                        Деякі функції можуть не працювати або відпрацьовувати не так як
                        очікується! Якщо ви виявите несподівану поведінку або некорректний вид
                        сторінки, будь-ласка не залишайте сайт! Ви дуже посприяєте розробці якщо
                        зробите скріншот і повідомите розробникам про проблему!
                    </p>
                    <p>
                        Доступна тільки десктоп версія. На мобільному пристрої ви не зможете
                        отримати доступ до всієї інформації
                    </p>
                    <p>
                        Дякуємо за розуміння, терпіння і допомогу!
                    </p>
                </div>
            </Modal>
    );
};
