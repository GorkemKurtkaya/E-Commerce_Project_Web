import express from 'express';
import dotenv from 'dotenv';
import conn from './db';





dotenv.config();


conn();

const app = express();
const PORT = process.env.PORT || 3000;