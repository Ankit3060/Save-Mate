import express, {urlencoded} from 'express';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import cors from 'cors';

export const app = express();

config({path: "./Config/config.env"});

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","DELETE", "PATCH"],
    credentials : true
}));

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
