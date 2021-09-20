import './Cart.css';
import Modal from "../base/modal/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./cart-item/CartItem";
import CartCheckout from "./cart-checkout/CartCheckout";
import Button from "../base/button/Button";
import {addOrder} from "../../services/api";

const Cart = ({hideCart, makeOrder}) => {
  const {
    items,
    totalPrice,
    removeItem,
    addItem,
    toggleCheckout,
    checkoutIsOpen,
    resetCart,
  } = useContext(CartContext);
  const totalPrice$ = `$${totalPrice.toFixed(2)}`;
  const [isSubmitting, setSubmitting] = useState(false);
  const [orderAdded, setOrderAdded] = useState(false);
  const addItemHandler = (item) => addItem(item);

  const onConfirmOrder = async (orderDetails) => {
    setSubmitting(true);
    try {
      await addOrder({
        userDetails: orderDetails,
        orderItems: items,
      });

      setOrderAdded(true);
      resetCart();
    } finally {
      setSubmitting(false);
    }
  }

  const removeItemHandler = (id) => removeItem(id);

  const mappedItems = items.map(({
                                   id,
                                   title,
                                   amount,
                                   description,
                                   price,
                                 }) => (<CartItem
    key={id}
    id={id}
    title={title}
    amount={amount}
    description={description}
    price={price}
    add={addItemHandler.bind(null, {
      id,
      title,
      amount: 1,
      description,
      price,
    })}
    remove={removeItemHandler.bind(null, id)}
  />));

  const cartModalContent = (<div className="cart">
    <ul className="cart__items">{mappedItems}</ul>
    <div className="cart__total">
      <span className="cart__total-label">Total amount</span>
      <span className="cart__total-amount">{totalPrice$}</span>
    </div>
    {checkoutIsOpen && <CartCheckout
      close={() => toggleCheckout(false)}
      confirm={onConfirmOrder}
    />}
    <div className="cart__actions">
      {!checkoutIsOpen && <Button className="cart__action cart__action--alt" click={hideCart}>Close</Button>}
      {!checkoutIsOpen && Boolean(items.length) && <Button className="cart__action" click={makeOrder}>Order</Button>}
    </div>
  </div>)
  return (
    <Modal close={hideCart}>
      {!isSubmitting && !orderAdded && cartModalContent}
      {orderAdded && <div className="cart--order-added">
        <p>Your order was added</p>
        <div className="cart__actions">
          <Button className="cart__action cart__action--alt" click={hideCart}>Close</Button>
        </div>
      </div>}
      {isSubmitting && <p className="cart--order-loading">Sending order data....</p>}
    </Modal>
  );
}

export default Cart;
