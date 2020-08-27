import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import users from '../users.js';
import products from '../products.js';
import Product from '../models/productModel.js';

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
export default userRouter;
