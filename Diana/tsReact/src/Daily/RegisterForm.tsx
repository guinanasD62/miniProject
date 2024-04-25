import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from './userSlice';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: ''
    });

    // Handler for form input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Update the corresponding state
        const stateSetters = {
            username: setUsername,
            password: setPassword,
            confirmPassword: setConfirmPassword,
            name: setName,
            email: setEmail
        };
        stateSetters[name as keyof typeof stateSetters](value);
        // Set or clear errors based on the new value
        setErrors(prev => ({ ...prev, [name]: value ? '' : `Please fill the ${name} field.` }));
    };

    // Handler for form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = { username, password, confirmPassword, name, email };
        const newErrors = { ...errors };
        let valid = true;

        // Validate each field to ensure it's not empty
        Object.keys(formData).forEach(key => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key as keyof typeof newErrors] = `Please fill the ${key} field.`;
                valid = false;
            }
        });

        setErrors(newErrors);

        if (!valid) {
            return;
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            return;
        }

        // Dispatch addUser action to add user to Redux store and local storage
        dispatch(addUser({ username, password, name, email }));
        alert('Registration successful!');
       
        navigate('/login');  // Redirect to login after successful registration
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={handleInputChange} />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={handleInputChange} />
                    {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleInputChange} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handleInputChange} />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
                    {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                </div>
                <button type="submit">Register</button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    );
};

export default RegisterForm;
