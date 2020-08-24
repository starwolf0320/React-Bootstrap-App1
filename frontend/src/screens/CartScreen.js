import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div>
      Cart Screen: <span>{cartItems.length} Items</span>
    </div>
  );
}
