import { routes } from './constants';
import { LessonsPage } from '../pages/Lessons';
import { LessonEntityList } from '../components/LessonEntity/LessonEntityList.jsx';
import { Lesson } from '../pages/Lesson';
import { Cabinet } from '../pages/Cabinet';
import { Collections } from '../pages/Collections';
import { Home } from '../pages/Home';
import { ChurchesList } from '../components/ChurchesList';
import { Test } from '../Games/Test/Test';
import { Rate } from '../Games/Rate/Rate';
import { Scenario } from '../components/Scenario/index.js';
import { ScenarioItem } from '../components/ScenarioItem/index.js';
import { TestGameView } from '../Games/Test/TestGameView.jsx';
import { GroupItem } from '../components/GroupItem/index.js';
import { Invite } from '../pages/Invite.jsx';
import { VeremChurch } from '../components/VeremChurch/VeremChurch.jsx';
import { Presentations } from '../pages/Presentations.jsx';
import { Presentation } from '../pages/Presentation.jsx';
import {Goal} from "../Games/Goal/Goal.jsx";

export const publicRoutes = [
    {
        path: '/',
        title: 'Home',
        component: <Home/>,
    },
    {
        path: `${routes.collections}/:collectionId${routes.lessons}`,
        title: 'Lesson list',
        component: <LessonsPage/>,
    },
    {
        path: `${routes.collections}/:collectionId${routes.lessons}/:lessonId`,
        title: 'Lesson',
        component: <Lesson/>,
    },
    {
        path: `${routes.church}`,
        title: 'ChurchList',
        component: <ChurchesList/>,
    },
    {
        path: `${routes.church}/:churchId`,
        title: 'Church',
        component: <VeremChurch/>,
    },
    {
        path: `${routes.church}/:churchId/invite/:inviteId`,
        title: 'Church',
        component: <Invite/>,
    },
    {
        path: `${routes.group}/:groupId`,
        title: 'GroupItem',
        component: <GroupItem/>,
    },
    {
        path: `${routes.scenario}`,
        title: 'Scenario',
        component: <Scenario/>,
    },
    {
        path: `${routes.presentations}`,
        title: 'Presentations',
        component: <Presentations/>,
    },
    {
        path: `${routes.presentations}/:presentationId`,
        title: 'Presentation',
        component: <Presentation/>,
    },
    {
        path: `${routes.scenario}/:scenarioId`,
        title: 'ScenarioItem',
        component: <ScenarioItem/>,
    },
    {
        path: `${routes.games}/test-game-view`,
        title: 'Test',
        component: <TestGameView/>,
    },
    {
        path: routes.collections,
        title: 'Collections',
        component: <Collections/>,
    },
    {
        path: routes.subject,
        title: 'Subject',
        component: <LessonEntityList entityName={'subject'}/>,
    },
    {
        path: routes.food,
        title: 'Food',
        component: <LessonEntityList entityName={'food'}/>,
    },
    {
        path: routes.memory,
        title: '<Memory>',
        component: <LessonEntityList entityName={'memory'}/>,
    },
    {
        path: routes.creativity,
        title: 'Creativity',
        component: <LessonEntityList entityName={'creative'}/>,
    },
    {
        path: routes.game,
        title: 'Game',
        component: <LessonEntityList entityName={'activeGame'}/>,
    },
    {
        path: '/goal',
        title: 'Goal',
        component: <Goal/>,
    },
];
export const authRouts = [
    {
        path: `${routes.cabinet}/:userId${routes.group}/:groupId`,
        title: 'Cabinet',
        component: <Cabinet/>,
    },
    {
        path: `${routes.games}/test`,
        title: 'Test',
        component: <Test onSave={() => {}} settings={[]} onCancel={() => {}}/>,
    },
    {
        path: `${routes.group}/:groupId${routes.games}/rate`,
        title: 'Rate',
        component: <Rate/>,
    },
];
