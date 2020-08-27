import bcrypt from 'bcryptjs';

export default [
  {
    name: 'John',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234', 8),
    isAdmin: true,
    isSeller: true,
    seller: {
      name: 'Top Shoes',
      logo: '/images/logo1.png',
      description: 'best shoes seller',
      rating: 4.5,
      numRevies: 120,
    },
  },
  {
    name: 'Joe',
    email: 'seller@example.com',
    password: bcrypt.hashSync('1234', 8),
    isAdmin: false,
    isSeller: true,
    seller: {
      name: 'Niki Shoes',
      logo: '/images/logo2.png',
      description: 'top shoes seller',
      rating: 4.7,
      numRevies: 110,
    },
  },
  {
    name: 'Sara',
    email: 'user@example.com',
    password: bcrypt.hashSync('1234', 8),
  },
];
