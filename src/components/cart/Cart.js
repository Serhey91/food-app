import './Cart.css';
import Button from "../base/button/Button";
import Modal from "../base/modal/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./cart-item/CartItem";
import CartCheckout from "./cart-checkout/CartCheckout";

const Cart = ({hideCart, makeOrder}) => {
  const {
    items,
    totalPrice,
    removeItem,
    addItem,
    toggleCheckout,
    checkoutIsOpen,
  } = useContext(CartContext);
  const totalPrice$ = `$${totalPrice.toFixed(2)}`;
  const addItemHandler = (item) => {
    addItem(item);
  }

  const onConfirmOrder = (orderDetails) => {
    console.log(orderDetails)
  }

  const removeItemHandler = (id) => {
    removeItem(id);
  }
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
  return (
    <Modal close={hideCart}>
      <div className="cart">
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
          { !checkoutIsOpen && Boolean(items.length) && <Button className="cart__action" click={makeOrder}>Order</Button> }
        </div>
      </div>
    </Modal>
  )
}

export default Cart;
