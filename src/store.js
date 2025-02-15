import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './store/notificationReducer';
import dataReducer from './store/dataReducer';
import mainMenuCollapsed from './store/mainMenuReducer';
import collectionsReducer from './store/collectionsResucer';
import entitiesReducer from './store/entitiesReducer';
import auth from './store/authReducer';
import testEnvMessage from './store/testEnvMessageReducer';

export default configureStore({
    reducer: {
        auth,
        notification: notificationReducer,
        lessonData: dataReducer,
        mainMenuCollapsed,
        testEnvMessage,
        collections: collectionsReducer,
        entities: entitiesReducer,
    },
});
