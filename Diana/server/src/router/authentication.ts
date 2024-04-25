//keeping the route definitions separate from the main application file.
import express from 'express';

import { login, register } from '../controllers/authentication';

export default ( router: express.Router) => {
    router.post('/auth/register', register);//when the server receives a POST request at this URL, the register function will be executed, handling the registration logic (like creating a new user in the database).
    router.post('/auth/login', login);
};//postman
