import {TranslateIcon} from '../assets/TranslateIcon.jsx';
import {MoveIcon as CollapseIcon} from '../assets/MoveIcon.jsx';
import {ChurchIcon} from '../assets/ChurchIcon.jsx';
import {UserIcon} from '../assets/UserIcon.jsx';
import {BackIcon} from '../assets/BackIcon.jsx';
import {GoogleIcon} from '../assets/GoogleIcon.jsx';
import {CollectionIcon as CollectionsIcon} from '../assets/CollectionIcon.jsx';
import {ShowIcon} from '../assets/ShowIcon.jsx';
import {HeartIcon} from '../assets/HeartIcon.jsx';
import {PalletIcon} from '../assets/PalletIcon.jsx';
import {TopicIcon} from '../assets/TopicIcon.jsx';
import {GameIcon, GameIcon as NormalGameIcon} from '../assets/GameIcon.jsx';
import {FoodIcon} from '../assets/FoodIcon.jsx';
import {MemoryIcon} from '../assets/MemoryIcon.jsx';
import {BookmarkIcon} from '../assets/BookmarkIcon.jsx';
import {
    Link, NavLink,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import {useSelector,} from 'react-redux';
import {routes} from '../router/constants';
import PropTypes from 'prop-types';
import {PresentationIcon} from '../assets/PresentationIcon.jsx';
import  { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import i18n, {t} from "i18next";
import {ButtonIconMiniStyled, ButtonIconStyled} from "../components/ButtonStyled.js";
import {ControlMobileStyled} from "./MainContentStyled.js";


export const ControlMobile = ({loginWithGoogle, signOut}) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    ControlMobile.propTypes = {
        loginWithGoogle: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
    };
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const currentLang = i18n.language;

    const items = [
        {
            key: 'home',
            icon: <HeartIcon />,
            label: 'Главная',
            onClick: () => navigate(`${routes.home}`),
        },
        {
            key: 'church',
            icon: <ChurchIcon />,
            label: 'Сообщество',
            onClick: () => navigate(`${routes.church}`),
        },
        {
            key: 'collections',
            icon: <CollectionsIcon />,
            label: 'Коллекции',
            children: [
                {
                    key: 'lessons',
                    icon: <TopicIcon />,
                    label: 'Список уроков',
                    onClick: () => navigate(`${routes.collections}`),
                },
                {
                    key: 'subject',
                    icon: <BookmarkIcon />,
                    label: 'Предметний приклад',
                    onClick: () => navigate(`${routes.subject}`),
                },
                {
                    key: 'presentations',
                    icon: <PresentationIcon />,
                    label: 'Презентації',
                    onClick: () => navigate(`${routes.presentations}`),
                },
                {
                    key: 'game',
                    icon: <NormalGameIcon />,
                    label: 'Игры',
                    onClick: () => navigate(`${routes.game}`),
                },
                {
                    key: 'creativity',
                    icon: <PalletIcon />,
                    label: 'Творчество',
                    onClick: () => navigate(`${routes.creativity}`),
                },
                {
                    key: 'memory',
                    icon: <MemoryIcon />,
                    label: 'Запомнить',
                    onClick: () => navigate(`${routes.memory}`),
                },
                {
                    key: 'food',
                    icon: <FoodIcon />,
                    label: 'Частування',
                    onClick: () => navigate(`${routes.food}`),
                },
            ],
        },
        {
            key: 'show',
            icon: <ShowIcon />,
            label: t('mainMenu.show'),
            onClick: () => navigate(`${routes.scenario}`),
        },
        {
            key: 'cabinet',
            icon: <UserIcon />,
            label: t('mainMenu.cabinet'),
            hidden: !auth?.user?.uid,
            onClick: () => navigate(`${routes.cabinet}/${auth?.user?.uid}${routes.group}/${auth?.user?.groups?.[0]}`),
        },
        {
            key: 'signin',
            icon: <GoogleIcon />,
            label: 'Sign in',
            hidden: !!auth?.token || pathname.includes('invite'),
            onClick: loginWithGoogle,
        },
        {
            key: 'signout',
            icon: <GoogleIcon />,
            label: 'Sign out',
            hidden: !auth?.token,
            onClick: signOut,
        },
        {
            key: 'language',
            icon: <TranslateIcon />,
            label: 'Язык',
            children: [
                {
                    key: 'lang-ua',
                    label: t('mainMenu.ua'),
                    active: currentLang === 'ua',
                    onClick: () => i18n.changeLanguage('ua'),
                },
                {
                    key: 'lang-en',
                    label: t('mainMenu.en'),
                    active: currentLang === 'en',
                    onClick: () => i18n.changeLanguage('en'),
                },
                {
                    key: 'lang-ru',
                    label: t('mainMenu.ru'),
                    active: currentLang === 'ru',
                    onClick: () => i18n.changeLanguage('ru'),
                },
            ],
        },
    ];

    return (
        <ControlMobileStyled collapsed={collapsed}>
            <ButtonIconStyled type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </ButtonIconStyled>
            {collapsed ? null : (
                <div className="fixed-mobile-menu">
                    <Menu
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={items}
                    />
                </div>
            )}
        </ControlMobileStyled>
    );
};

ControlMobile.propTypes = {
    loginWithGoogle: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
};
