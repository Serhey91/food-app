const CART_ACTION_TYPE = Object.freeze({
  TOGGLE_CART: 'TOGGLE_CART',
  TOGGLE_CHECKOUT: 'TOGGLE_CHECKOUT',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  RESET_CART: 'RESET_CART',
});

const defaultCartState = (overrides = {}) => ({
  items: [],
  totalPrice: 0,
  totalItems: 0,
  cartIsOpen: false,
  checkoutIsOpen: false,
  ...overrides,
});

const cartReducer = (state, {type, payload}) => {
  switch (type) {
    case CART_ACTION_TYPE.RESET_CART: {
      return {
        ...defaultCartState(),
        cartIsOpen: true,
        checkoutIsOpen: false,
      }
    }
    case CART_ACTION_TYPE.TOGGLE_CART: {
      return {
        ...state,
        cartIsOpen: payload.value,
      }
    }
    case CART_ACTION_TYPE.TOGGLE_CHECKOUT: {
      return {
        ...state,
        checkoutIsOpen: payload.value,
      }
    }
    case CART_ACTION_TYPE.REMOVE_ITEM: {
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
    case CART_ACTION_TYPE.ADD_ITEM: {
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
    default: {
      return state
    }
  }
}

export {
  cartReducer,
  CART_ACTION_TYPE,
  defaultCartState,
}
