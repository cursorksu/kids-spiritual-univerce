import {
    BottomNavigationStyled,
    DonationStyled,
    FooterStyles,
} from './styles';
import {
    ButtonIconMiniStyled,
    ButtonStyled,
} from '../ButtonStyled';
import {
    InputFieldStyled,
    InputStyled,
    LabelStyled,
} from '../InputStyled';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../router/constants';
import { EmailIcon } from '../../assets/EmailIcon.jsx';
import { Tooltip } from 'antd';
import { TelegramIcon } from '../../assets/TelegramIcon.jsx';
import { CommentIcon as WatsUpIcon } from '../../assets/CommentIcon.jsx';

export const Footer = () => {
    const [amount, setAmount] = useState(500);
    const [isDonation, setIsDonation] = useState(true);

    return (
            <FooterStyles className="print-hide">
                +++++
                <div />
                <div />
                {/*<DonationStyled>*/}
                {/*    <p>*/}
                {/*        Ми розвиваємо цей проект з власної ініціативи і несемо всі видатки.*/}
                {/*        Якщо ви знаходите його корисним, підтримайте нашу роботу!*/}
                {/*    </p>*/}
                {/*    <div className="donation-buttons">*/}
                {/*        <ButtonStyled*/}
                {/*                onClick={() => setAmount(200)}*/}
                {/*                className={amount === 200 && 'active'}>*/}
                {/*            2$*/}
                {/*        </ButtonStyled>*/}
                {/*        <ButtonStyled*/}
                {/*                onClick={() => setAmount(500)}*/}
                {/*                className={amount === 500 && 'active'}>*/}
                {/*            5$*/}
                {/*        </ButtonStyled>*/}
                {/*        <ButtonStyled*/}
                {/*                onClick={() => setAmount(100)}*/}
                {/*                className={amount === 100 && 'active'}>*/}
                {/*            10$*/}
                {/*        </ButtonStyled>*/}
                {/*    </div>*/}
                {/*    <InputFieldStyled>*/}
                {/*        <LabelStyled>Інша сума</LabelStyled>*/}
                {/*        <InputStyled*/}
                {/*                value={amount / 100}*/}
                {/*                onChange={(e) => setAmount(e.target.value * 100)}*/}
                {/*                type={'number'}*/}
                {/*                placeholder={'Type here..'}*/}
                {/*        />*/}
                {/*    </InputFieldStyled>*/}
                {/*    <div className="donation-buttons">*/}
                {/*        <InputFieldStyled>*/}
                {/*            <LabelStyled>Щомісячно</LabelStyled>*/}
                {/*            <ButtonStyled*/}
                {/*                    onClick={() => setIsDonation(true)}*/}
                {/*                    className={isDonation && 'active'}>*/}
                {/*                Підпісатися*/}
                {/*            </ButtonStyled>*/}
                {/*        </InputFieldStyled>*/}
                {/*        <InputFieldStyled>*/}
                {/*            <LabelStyled>Разово</LabelStyled>*/}
                {/*            <ButtonStyled*/}
                {/*                    onClick={() => setIsDonation(false)}*/}
                {/*                    className={!isDonation && 'active'}>*/}
                {/*                Підтримати*/}
                {/*            </ButtonStyled>*/}
                {/*        </InputFieldStyled>*/}
                {/*    </div>*/}
                {/*</DonationStyled>*/}
                <BottomNavigationStyled>
                    <ul>
                        <li><NavLink to={routes.church}>Churches</NavLink></li>
                        <li><NavLink to={routes.lessons}>Lessons</NavLink></li>
                        <li><NavLink to={routes.scenario}>Scenarios</NavLink></li>
                        <li><NavLink to={routes.blog}>Blog</NavLink></li>
                        <li><NavLink to={routes.cabinet}>User Cabinet</NavLink></li>
                    </ul>
                    <div className="network-buttons">
                        <div/>
                        <Tooltip
                                basic
                                content={'Відправити імейл'}
                        >
                            <ButtonIconMiniStyled><EmailIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                        <Tooltip
                                basic
                                content={'Запросити через Tелеграм'}
                        >
                            <ButtonIconMiniStyled><TelegramIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                        <Tooltip
                                basic
                                content={'Запросити через Watsapp'}
                        >
                            <ButtonIconMiniStyled><WatsUpIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                    </div>
                </BottomNavigationStyled>
            </FooterStyles>
    );
};