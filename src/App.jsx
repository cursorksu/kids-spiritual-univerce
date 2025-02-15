import { AppRouter } from './router';
import { Notification } from './components/Notification/Notification.jsx';
import { Provider } from 'react-redux';
import store from './store';
import 'react-datepicker/dist/react-datepicker.css';
import './i18n';
import './App.scss';

function Situations() {
  return (
    <Provider store={store}>
      <>
        <Notification />
        <AppRouter />
      </>
    </Provider>
  );
}

export default Situations;
