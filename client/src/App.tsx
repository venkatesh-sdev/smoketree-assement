// src/App.tsx
import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Address from './components/Address';
import { Button } from './components/ui/button';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };
  const handleLogout = () => {
    setToken(null)
    localStorage.setItem("smoke_tree_auth_token", '')
  }
  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("smoke_tree_auth_token"))
    }
  }, [token])

  return (
    <div className="p-8">
      <div className='flex justify-around items-center my-5'>
        <h1 className="text-5xl font-bold ">SmokeTree Assignment</h1>
        {token && <Button onClick={handleLogout} className="">Logout</Button>}
      </div>
      {token ? (
        <>
          <Address token={token} />
        </>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
