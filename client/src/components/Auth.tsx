// src/components/Auth.tsx
import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/api';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react'
interface AuthProps {
    onLogin: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            if (isLogin) {
                const response = await loginUser(username, password);
                if (response.data.token) {
                    onLogin(response.data.token);
                    localStorage.setItem("smoke_tree_auth_token", response.data.token);
                    toast({ title: 'Welcome!!!', variant: 'successs' });
                }
            } else {
                await registerUser(username, password);
                toast({ title: 'User registered! Please login.', variant: 'destructive' });
                setMessage('User registered! Please login.');
                setIsLogin(true);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                toast({ title: error.response.data.error ?? error.message, variant: 'destructive' });
                setMessage(error.response.data.error);
            } else {
                toast({ title: 'Something went wrong', variant: 'destructive' });
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full"
                />
                <Button className="flex items-center gap-2 w-full" disabled={isLoading} type="submit" >{isLogin ? 'Login' : 'Register'} {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />} </Button>
            </form>
            <Button onClick={() => setIsLogin(!isLogin)} className="mt-4">
                Switch to {isLogin ? 'Register' : 'Login'}
            </Button>
            {message && <p className="text-red-500">{message}</p>}
        </div>
    );
};

export default Auth;
