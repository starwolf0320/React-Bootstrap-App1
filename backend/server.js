import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

const app = express();
app.use(bodyParser.json());
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected.'))
  .catch((error) => console.log(error.reason));

app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});
app.get('/', (req, res) => res.send('Server is ready.'));
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(config.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT || 5000}`);
});
