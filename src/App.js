import React, { Suspense, useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const ActorPage = React.lazy(() => import('./pages/ActorPage'));
const AllMoive = React.lazy(() => import('./components/AllMoive/AllMoive'));
const MoiveDetails = React.lazy(() => import('./pages/MoiveDetails'));
const MainHomePage = React.lazy(() => import('./pages/MainHomePage'));

function App() {
  const [isDark, setIsDark] = useState(false);

  let AppClass = classes.App;
  const setLightHandler = () => {
    setIsDark((prevState) => !prevState);
    localStorage.setItem('colorState', isDark);
  };
  isDark
    ? (AppClass = classes.App + ' ' + classes.Light)
    : (AppClass = classes.App);

  useEffect(() => {
    const colorState = localStorage.getItem('colorState');
    if (colorState === 'false') {
      setIsDark((prevstate) => !prevstate);
    }
  }, []);

  return (
    <Layout
      className={AppClass}
      darkMoodHnadler={setLightHandler}
      isDark={isDark}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/:category" element={<MainHomePage />} />
          <Route path="/" element={<Navigate to="/movie" />} />
          <Route path="/:category/:movieId/*" element={<MoiveDetails />} />
          <Route
            path="/:category/all/:movie_type/*"
            element={<AllMoive />}
          />
          <Route
            path="/:category/search/:keyword/*"
            element={<AllMoive />}
          />
          <Route
            path="/:category/actor/id=:actor_id"
            element={<ActorPage />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
