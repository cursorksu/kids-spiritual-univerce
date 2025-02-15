import { message } from 'antd';
import { useEffect } from 'react';

export const InviteFailedMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        messageApi.open({
            type: 'error',
            content: (
                    <>
                        <h2 className={'title'}>
                            Запрошення видалене!
                        </h2>
                        <br/>
                        <div>
                            <p>
                                З метою покращення безпекових якостей додатку запрошення залишається дійсним лише 7
                                днів.
                            </p>
                            <p>
                                Будь ласка зверніться до тієї людини,
                                яка вас запросила для того щоб отримати нове запрошення або зареєструйтеся за допомогою
                                Google.
                                Після цього адміністратор вашої церкви у нашому додатку зможе додати вас самостійно.
                            </p>
                        </div>
                    </>
            ),
        });
    }, [messageApi]);

    return (
            <>
                {contextHolder}
            </>
    );
};
