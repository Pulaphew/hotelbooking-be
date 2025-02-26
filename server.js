// -------------------------- Import -------------------------- //

// Library
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Function
import { connectDB } from './config/db.js';

// API
import auth from './routes/auth.js';

// -------------------------- Setting -------------------------- //

// Config
dotenv.config();

// Initialize app
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// API Routes 
app.use('/api/auth', auth);

// -------------------------- Start the Server -------------------------- //

const PORT = process.env.PORT || 8000;

const initializeServer = async () => {
    try {
        console.log('Backend server is starting...');
        connectDB();
        const server = app.listen(PORT, () => { 
            console.log(`Backend server is ready at http://localhost:${PORT}`);
        });
        // -------------------------- Handle Error -------------------------- //
        process.on('unhandledRejection' , (err , promise)=> {
            console.log(`Error : ${err.message}`);
            server.close(()=>process.exit);
        });
    } catch (err) {
        console.log("Failed to start backend server:", err);
    }
}

initializeServer();