// HELPER fOR authentication MODULE
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// cryptographic functions, such as those for hashing, key generation, and random number generation.
const SECRET = 'DIANA-REST-API';

export const random = () => crypto.randomBytes(128).toString('base64');
// This function generates a random sequence of bytes and converts them to a Base64 string. It can be used for generating secure random tokens, such as session identifiers or CSRF tokens.

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
    // HMAC using the SHA-256 hashing algorithm. digest('hex'): finalizes the hashing process and outputs a string in hexadecimal format.
};

// Function to generate a JWT
export const generateToken = (payload: string | object | Buffer) => {
    const jwtSecret = random(); // Generating a random secret for JWT based on the existing random function
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

// Function to verify a JWT
export const verifyToken = (token: string, jwtSecret: jwt.Secret) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        return null; // or handle more specifically if needed
    }
};
