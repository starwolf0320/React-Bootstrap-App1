/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import config from './config.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      nam: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    config.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
