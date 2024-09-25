import React, { useState } from 'react';
import UserForm from './UserForm';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <UserForm
        title={isLogin ? 'Login' : 'Register'}
        action={isLogin ? '/login' : '/register'}
      />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default LoginRegister;