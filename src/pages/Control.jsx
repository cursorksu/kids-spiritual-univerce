import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
} from 'react-pro-sidebar';
import { TranslateIcon } from '../assets/TranslateIcon.jsx';
import { MoveIcon as CollapseIcon } from '../assets/MoveIcon.jsx';
import { ChurchIcon } from '../assets/ChurchIcon.jsx';
import { UserIcon } from '../assets/UserIcon.jsx';
import { BackIcon } from '../assets/BackIcon.jsx';
import { GoogleIcon } from '../assets/GoogleIcon.jsx';
import { CollectionIcon as CollectionsIcon } from '../assets/CollectionIcon.jsx';
import { ShowIcon } from '../assets/ShowIcon.jsx';
import { HeartIcon } from '../assets/HeartIcon.jsx';
import { PalletIcon } from '../assets/PalletIcon.jsx';
import { TopicIcon } from '../assets/TopicIcon.jsx';
import {GameIcon, GameIcon as NormalGameIcon} from '../assets/GameIcon.jsx';
import { FoodIcon } from '../assets/FoodIcon.jsx';
import { MemoryIcon } from '../assets/MemoryIcon.jsx';
import { BookmarkIcon } from '../assets/BookmarkIcon.jsx';
import { setMainMenuCollapsed } from '../store/mainMenuReducer';
import { useTranslation } from 'react-i18next';
import {
    Link,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { routes } from '../router/constants';
import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import { PresentationIcon } from '../assets/PresentationIcon.jsx';

export const Control = ({ loginWithGoogle, signOut }) => {
    const mainMenuCollapsed = useSelector(
            ({ mainMenuCollapsed }) => mainMenuCollapsed,
    );
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('tr');
    const handleCollapse = () => {
        dispatch(setMainMenuCollapsed(!mainMenuCollapsed));
    };

    const currentLang = i18n.language;

    return (
            <div className="collapsed-menu">
                <Sidebar collapsed={mainMenuCollapsed}>
                    <Menu>
                        <div>
                            <MenuItem
                                    icon={<HeartIcon/>}
                                    component={<Link to={`${routes.home}`}/>}
                                    className={clsx({
                                        big: true,
                                        active: pathname === '/',
                                    })}>
                                {t('mainMenu.home')}
                            </MenuItem>
                            <MenuItem
                                    icon={<ChurchIcon/>}
                                    component={<Link to={routes.church}/>}
                                    className={clsx({
                                        active: pathname.includes(routes.church),
                                    })}>
                                {t('mainMenu.community')}
                            </MenuItem>
                            <SubMenu
                                    label={t('collections.collections')}
                                    icon={<CollectionsIcon/>}>
                                <MenuItem
                                        icon={<TopicIcon/>}
                                        component={<Link to={`${routes.collections}`}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.collections),
                                        })}>
                                    Список уроков
                                </MenuItem>
                                <MenuItem
                                        icon={<BookmarkIcon/>}
                                        component={<Link to={routes.subject}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.subject),
                                        })}>
                                    Предметний приклад
                                </MenuItem>
                                <MenuItem
                                        icon={<PresentationIcon/>}
                                        component={<Link to={routes.presentations}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.presentations),
                                        })}>
                                    Презентації
                                </MenuItem>
                                <MenuItem
                                        icon={<NormalGameIcon/>}
                                        component={<Link to={routes.game}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.game),
                                        })}>
                                    {t('mainMenu.game')}
                                </MenuItem>
                                <MenuItem
                                        icon={<PalletIcon/>}
                                        component={<Link to={`${routes.creativity}`}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.creativity),
                                        })}>
                                    {t('collections.creativity')}
                                </MenuItem>
                                <MenuItem
                                        icon={<MemoryIcon/>}
                                        component={<Link to={`${routes.memory}`}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.memory),
                                        })}>
                                    Запам'ятовування
                                </MenuItem>
                                <MenuItem
                                        icon={<FoodIcon/>}
                                        component={<Link to={`${routes.food}`}/>}
                                        className={clsx({
                                            active: pathname.includes(routes.food),
                                        })}>
                                    Частування
                                </MenuItem>
                            </SubMenu>
                            <MenuItem
                                    icon={<ShowIcon/>}
                                    component={<Link to={`${routes.scenario}`}/>}
                                    className={clsx({
                                        middle: true,
                                        active: pathname.includes(routes.scenario),
                                    })}>
                                {t('mainMenu.show')}
                            </MenuItem>
                            <MenuItem
                                    hidden={!auth?.user?.uid}
                                    icon={<UserIcon/>}
                                    component={
                                        <Link
                                                to={`${routes.cabinet}/${auth?.user?.uid}${routes.group}/${
                                                        auth?.user?.groups && auth?.user?.groups[0]
                                                }`}
                                        />
                                    }
                                    className={clsx({
                                        disabled: !auth?.user?.uid,
                                        active: pathname.includes(routes.cabinet),
                                    })}>
                                {t('mainMenu.cabinet')}
                            </MenuItem>
                            {!auth?.token && !pathname.includes('invite') && (
                                    <MenuItem
                                            icon={<GoogleIcon/>}
                                            onClick={loginWithGoogle}
                                            className="big">
                                        Sign in
                                    </MenuItem>
                            )}
                                <MenuItem
                                    hidden={!auth?.user?.uid}
                                    icon={<GameIcon />}
                                    component={
                                        <Link to={`/goal`}/>
                                    }
                                    className="big">
                                    Мета
                                </MenuItem>
                            {auth?.token && (
                                    <MenuItem icon={<GoogleIcon/>} onClick={signOut} className="big">
                                        Sign out
                                    </MenuItem>
                            )}
                        </div>
                        <div>
                            <SubMenu label={t('mainMenu.lang')} icon={<TranslateIcon/>}>
                                <MenuItem
                                        className={clsx({ active: currentLang === 'ua' })}
                                        onClick={() => i18n.changeLanguage('ua')}>
                                    {t('mainMenu.ua')}
                                </MenuItem>
                                <MenuItem
                                        className={clsx({ active: currentLang === 'en' })}
                                        onClick={() => i18n.changeLanguage('en')}>
                                    {t('mainMenu.en')}
                                </MenuItem>
                                <MenuItem
                                        className={clsx({ active: currentLang === 'ru' })}
                                        onClick={() => i18n.changeLanguage('ru')}>
                                    {t('mainMenu.ru')}
                                </MenuItem>
                            </SubMenu>
                            <MenuItem
                                    icon={<CollapseIcon/>}
                                    className={clsx({ active: !mainMenuCollapsed })}
                                    onClick={handleCollapse}>
                                {t('mainMenu.collapse')}
                            </MenuItem>
                            <MenuItem icon={<BackIcon/>} onClick={() => navigate(-1)}>
                                {t('mainMenu.goBack')}
                            </MenuItem>
                        </div>
                    </Menu>
                </Sidebar>
            </div>
    );
};

Control.propTypes = {
    loginWithGoogle: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
};
