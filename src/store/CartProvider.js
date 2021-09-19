import CartContext from "./cart-context";
import React, {useReducer} from "react";

const CART_ACTION_TYPE = Object.freeze({
  TOGGLE_CART: 'TOGGLE_CART',
  TOGGLE_CHECKOUT: 'TOGGLE_CHECKOUT',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
});

const cartReducer = (state, {type, payload}) => {
  if (type === CART_ACTION_TYPE.TOGGLE_CART) {
    return {
      ...state,
      cartIsOpen: payload.value,
    }
  }

  if (type === CART_ACTION_TYPE.TOGGLE_CHECKOUT) {
    return {
      ...state,
      checkoutIsOpen: payload.value,
    }
  }

  if (type === CART_ACTION_TYPE.REMOVE_ITEM) {
    let items;
    let itemToRemove = state.items.find(({id}) => id === payload.value);
    if (itemToRemove.amount > 1) {
      itemToRemove.amount = itemToRemove.amount - 1;
      items = state.items
    } else {
      items = state.items.filter(({id}) => id !== payload.value);
    }

    const totalPrice = Number.parseFloat((state.totalPrice - itemToRemove.price).toFixed(2))
    return {
      ...state,
      items,
      totalPrice,
      totalItems: state.totalItems - 1,
    }
  }

  if (type === CART_ACTION_TYPE.ADD_ITEM) {
    let items;
    const existingItem = state.items.find(({id}) => id === payload.value.id);
    if (!existingItem) {
      items = [...state.items, payload.value];
    } else {
      existingItem.amount += payload.value.amount;
      items = state.items;
    }

    const totalPrice = state.totalPrice + Number.parseFloat((payload.value.price * payload.value.amount).toFixed(2))

    return {
      ...state,
      items,
      totalPrice: Number.parseFloat((totalPrice).toFixed(2)),
      totalItems: state.totalItems + payload.value.amount,
    }
  }

  return state;
};

export const defaultCartState = (overrides = {}) => ({
  items: [],
  totalPrice: 0,
  totalItems: 0,
  cartIsOpen: false,
  checkoutIsOpen: false,
  ...overrides,
});

const CartProvider = ({children}) => {
  const [state, dispatchAction] = useReducer(cartReducer, defaultCartState());

  const addItem = (item) => {
    dispatchAction({type: CART_ACTION_TYPE.ADD_ITEM, payload: {value: item}})
  };
  const removeItem = (itemId) => {
    dispatchAction({type: CART_ACTION_TYPE.REMOVE_ITEM, payload: {value: itemId}})
  };
  const toggleCart = (isVisible) => {
    dispatchAction({type: CART_ACTION_TYPE.TOGGLE_CART, payload: {value: isVisible}})
  }

  const toggleCheckout = (isVisible) => {
    dispatchAction({type: CART_ACTION_TYPE.TOGGLE_CHECKOUT, payload: {value: isVisible}})
  }
  const cartContext = {
    ...state,
    addItem,
    removeItem,
    toggleCart,
    toggleCheckout,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;
