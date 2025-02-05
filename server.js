
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import roomRoutes from './routes/room.routes.js';
import sessionRoutes from './routes/session.routes.js';
import commentRoutes from './routes/comment.routes.js';
import { User } from './models/userModel.js'
import * as bcrypt from 'bcrypt'
import path from 'path';

dotenv.config();
connectDB();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
const createAdminIfNeeded = async () => {
  const userAdmin = await User.findOne({ role: 'admin' });

  if (!userAdmin) {
    const plainPassword = "adminpassword"; 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword, 
      role: 'admin',
    });

    await admin.save();
    console.log(`Admin created: ${admin}`);
  } else {
    console.log(`Admin already created`);
  }
};

createAdminIfNeeded();
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
