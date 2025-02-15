import React from 'react';
import { Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { authRouts, publicRoutes } from './routes';
import { Routes } from 'react-router';
import { useSelector } from 'react-redux';
import { routes } from './constants';
import Scala from '../Games/Scale/Scala';
import { BibleText } from '../Games/BibleText/BibleText';
import Situations from '../App';
import { Boxes } from '../Games/Boxes/Boxes';

export const AppRouter = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
        <Route
          key={`${routes.games}/scala`}
          path={`${routes.games}/scala`}
          element={<Scala />}
        />
        <Route
          key={`${routes.games}/bibleText`}
          path={`${routes.games}/bibleText`}
          element={<BibleText />}
        />
        <Route
          key={`${routes.games}/situations`}
          path={`${routes.games}/situations`}
          element={<Situations />}
        />
        <Route
          key={`${routes.games}/boxes`}
          path={`${routes.games}/boxes`}
          element={<Boxes />}
        />
        {auth?.user?.uid &&
          authRouts.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        {!auth?.user?.uid && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};
