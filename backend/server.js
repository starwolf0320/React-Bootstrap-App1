import express from 'express';
import products from './products';

const app = express();
app.get('/api/products', (req, res) => {
  // res.status(500).send({ message: 'Can not get products' });
  res.send(products);
});
app.get('/', (req, res) => res.send('Server is ready.'));
app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at http://localhost:${process.env.PORT || 5000}`);
});
