import express from 'express';
import http from 'http';
import cors from 'cors'; // Enables CORS with various options.
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression'; 
import mongoose from 'mongoose';
import router from './router';

const app = express();
//connecting api with front end 
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
  }));

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);
 
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

// Correct connection string variable usage
const MONGO_URL = "mongodb+srv://dianaroseguinanas:dianaroseguinanas@cluster0.hhqfg3z.mongodb.net/";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

