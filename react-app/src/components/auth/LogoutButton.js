import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {useNavigate} from 'react-router-dom';



const LogoutButton = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    navigate("/")
  };

  return <button className='logOutButton' onClick={onLogout}>Sign Out</button>;
};

export default LogoutButton;
