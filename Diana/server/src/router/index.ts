import express from 'express';
import authentication from './authentication';
import users from './users';

const router = express.Router();//creates a new router object which can be used to define routes.

export default (): express.Router => {
    authentication(router); // function likely adds specific middleware or routes related to authentication to the router.
    users(router);
    return router;
};