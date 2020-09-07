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

export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    // Bearer XXXXX
    const token = auth.slice(7, auth.length);
    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
