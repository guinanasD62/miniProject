import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Attempting login for username: ${username}`);

        if (!username || !password) {
            setUsernameError('Please fill in all fields.');
            console.log('Error: One or more fields are empty.');
            return;
        }

        const storedData = localStorage.getItem('users');
        if (storedData) {
            const users = JSON.parse(storedData);
            const userFound = users.find((user: { username: string; password: string; name?: string; }) => user.username === username);
            
            if (userFound && userFound.password === password) {
                alert('Login successful!');
                console.log('Login successful, navigating to home page.');

                // Make sure to retrieve the user's name from the userFound object
                if (userFound.name) {
                    localStorage.setItem('currentName', userFound.name); // Store the user's name in localStorage
                }

                login();
                navigate('/');
            } else {
                alert('Invalid username or password.');
                console.log(`Login failed: No matching user found for username: ${username}`);
            }
        } else {
            alert('No user found. Please register.');
            console.log('No user data found in local storage.');
            navigate('/register');
        }
    };

    return (       
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} required />
                    {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <button type="submit">Login</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
};

export default LoginForm;
