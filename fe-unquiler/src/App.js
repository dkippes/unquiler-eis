import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/login/Login';
import UserRegister from './views/register/UserRegister';
import PublicRoute from './components/PublicRoute';
import Home from './views/home/Home';
import ClubRegister from './views/register/ClubRegister';
import Publish from './views/publish/Publish';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import ClubDetails from './views/ClubDetails/ClubDetails';
import Search from './views/Search/Search';
import CanchaDetails from './views/CanchaDetails/CanchaDetails';
import MyReservation from './views/MyReservation/MyReservation';
import CanchaReservadas from './views/CanchaReservadas/CanchaReservadas';

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/user/register"
          element={
            <PublicRoute>
              <UserRegister />
            </PublicRoute>
          }
        />
        <Route path="/club/*">
          <Route
            path=":id"
            exact
            element={
              <PrivateRoute canEnter={user?.isClub} redirectTo="/">
                {' '}
                <ClubDetails />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/reservas"
            element={
              <PrivateRoute canEnter={user?.isClub} redirectTo="/">
                <CanchaReservadas />
              </PrivateRoute>
            }
          />
          <Route
            path="publish"
            element={
              <PrivateRoute canEnter={user?.isClub} redirectTo="/">
                <Publish />
              </PrivateRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <ClubRegister />
              </PublicRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/:id_club/:id_cancha/ver-detalle/"
          element={<CanchaDetails />}
        />
        <Route path="/user/profile" element={<MyReservation />} />
        <Route path="/search/:text" element={<Search />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
