import React from "react";
const CartContext = React.createContext({
  items: [],
  cartIsOpen: false,
  totalPrice: 0,
  totalItems: 0,
});

export default CartContext;


