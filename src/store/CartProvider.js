import CartContext from "./cart-context";
import React, {useReducer} from "react";
import {CART_ACTION_TYPE, cartReducer, defaultCartState} from "./cart-reducer";

const CartProvider = ({children}) => {
  const [state, dispatchAction] = useReducer(cartReducer, defaultCartState());

  const addItem = (item) => dispatchAction({type: CART_ACTION_TYPE.ADD_ITEM, payload: {value: item}});
  const removeItem = (itemId) => dispatchAction({type: CART_ACTION_TYPE.REMOVE_ITEM, payload: {value: itemId}});
  const toggleCart = (isVisible) => dispatchAction({type: CART_ACTION_TYPE.TOGGLE_CART, payload: {value: isVisible}})
  const resetCart = () => dispatchAction({type: CART_ACTION_TYPE.RESET_CART})

  const toggleCheckout = (isVisible) => dispatchAction({
    type: CART_ACTION_TYPE.TOGGLE_CHECKOUT,
    payload: {value: isVisible}
  })
  const cartContext = {
    ...state,
    addItem,
    removeItem,
    toggleCart,
    toggleCheckout,
    resetCart,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;
