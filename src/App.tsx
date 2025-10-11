import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Customize from './Pages/Customize';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchUser } from './Redux/Features/userSlice';
import type { AppDispatch, RootState } from './Redux/Store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={user?.assistantImage && user?.assistantName ? (<Home />) : (<Navigate to="/customize" />)} />
        <Route path="/SignIn" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/SignUp" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/customize" element={user ? <Customize /> : <Navigate to="/SignIn" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
