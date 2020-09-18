import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import users from '../users.js';
import products from '../products.js';
import Product from '../models/productModel.js';
import { generateToken, isAuth, isAdmin } from '../utils.js';

const userRouter = express.Router();
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userList = await User.find({});
    res.send(userList);
  })
);
userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const userList = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);

    res.send(userList);
  })
);
userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const deletedUser = await user.remove();
      res.send({ message: 'User Deleted', user: deletedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

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

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.seller.name;
        user.seller.logo = req.body.seller.logo;
        user.seller.description = req.body.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.get(
  '/:id',

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.isAdmin = req.body.isAdmin;
      user.isSeller = req.body.isSeller;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
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
