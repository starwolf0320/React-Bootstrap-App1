import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected.'))
  .catch((error) => console.log(error.reason));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.get('/', (req, res) => res.send('Server is ready.'));
app.listen(config.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT || 5000}`);
});
