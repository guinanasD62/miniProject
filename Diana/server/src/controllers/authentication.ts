import express from 'express';
import { getUserByEmail , createUser} from '../db/users'; //userModel
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const { email, password } = req.body;

        if (!email || !password){
            return res.sendStatus(400);
        }
        //check if there is an existing user|| email, IMPORTANT to access authentication & salt
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        
        if(!user) {
            return res.sendStatus(400);
        }
        //authenticate user w/o knowing PW using hash comparison
        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('DIANA-AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});
    
        return res.status(200).json(user).end();
        //return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
    }
export const register = async ( req: express.Request, res: express.Response) => {
    try{

        const { email, password, username } = req.body;

        if (!email || !password || !username){// input validation
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email); //check if the user already exist prevent duplicate entries

        if(existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
    } catch (error) {
    console.log(error);
    return res.sendStatus(400);
   }
}