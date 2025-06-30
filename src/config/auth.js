import dotenv from 'dotenv';
dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'equipmanagersecret',
  expiresIn: '1d',
};
