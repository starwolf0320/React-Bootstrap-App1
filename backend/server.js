/* eslint-disable no-underscore-dangle */
import express from 'express';
import products from './products';

const app = express();

app.get('/api/products/:id', (req, res) => {
  const product = products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/products', (req, res) => {
  // res.status(500).send({ message: 'Can not get products' });
  res.send(products);
});
app.get('/', (req, res) => res.send('Server is ready.'));
app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at http://localhost:${process.env.PORT || 5000}`);
});
