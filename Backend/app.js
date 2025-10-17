import express, {urlencoded} from 'express';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import cors from 'cors';

export const app = express();

config({path: "./Config/config.env"});

app.use(cors({
    origin : process.env.FRONTEND_URL,
    methods : ["GET","POST","PUT","DELETE", "PATCH"],
    credentials : true
}));

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());


// Routes
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import transactionRoutes from './Routes/transactionRoutes.js';

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/transaction',transactionRoutes);
app.use('/api/v1/user',userRoutes);



// Cron Jobs
import {removeUnverifiedOTP} from './Services/removeUnverifiedOTP.js';
import {removeUnverifiedTokens} from './Services/removeUnverifiedResetToken.js';
import {updateTokenAttempt} from './Services/updateTokenAttempt.js';
import {updateOtpAttempt} from './Services/updateOtpAttempt.js';

removeUnverifiedOTP();
removeUnverifiedTokens();
updateTokenAttempt();
updateOtpAttempt();