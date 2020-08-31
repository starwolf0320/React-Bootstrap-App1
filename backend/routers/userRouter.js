import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import users from '../users.js';
import products from '../products.js';
import Product from '../models/productModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    // await Product.remove({});
    const createdUsers = await User.insertMany(users);
    const seller1 = createdUsers[0]._id;
    const seller2 = createdUsers[1]._id;
    const sampleProducts = products.map((product, index) =>
      index < 3
        ? { ...product, seller: seller1 }
        : { ...product, seller: seller2 }
    );
    const createdProducts = await Product.insertMany(sampleProducts);
    res.send({ users: createdUsers, products: createdProducts });
  })
);
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const signedinUser = await User.findOne({ email: req.body.email });
    if (
      signedinUser &&
      bcrypt.compareSync(req.body.password, signedinUser.password)
    ) {
      res.send({
        _id: signedinUser._id,
        name: signedinUser.name,
        email: signedinUser.email,
        isAdmin: signedinUser.isAdmin,
        isSeller: signedinUser.isSeller,
        token: generateToken(signedinUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  })
);
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const createdUser = await user.save();
    if (createdUser) {
      res.status(201).send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        token: generateToken(createdUser),
      });
    } else {
      res.status(400).send({ message: 'Invalid User Data' });
    }
  })
);
export default userRouter;
