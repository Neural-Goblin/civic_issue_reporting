// src/pages/UserAuth.jsx
import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? (
        <Login onToggleAuth={toggleAuthMode} />
      ) : (
        <Signup onToggleAuth={toggleAuthMode} />
      )}
    </>
  );
};

// Add default export
export default UserAuth;