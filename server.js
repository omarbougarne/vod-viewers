// server.js
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import roomRoutes from './routes/room.routes.js';
import sessionRoutes from './routes/session.routes.js';
import commentRoutes from './routes/comment.routes.js';
import path from 'path';

dotenv.config();
connectDB();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
