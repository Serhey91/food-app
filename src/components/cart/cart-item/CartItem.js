import './CartItem.css';
import Button from "../../base/button/Button";

const CartItem = ({
  price,
  title,
  amount,
  remove,
  add,
}) => {
  const itemPrice = `$${price.toFixed(2)}`;

  return (
    <li className="cart-item">
      <div className="cart-item__content">
        <h2 className="cart-item__title">{title}</h2>
        <div className="cart-item__summary">
          <span className="cart-item__price">{itemPrice}</span>
          <span className="cart-item__amount">x {amount}</span>
        </div>
      </div>
      <div className="cart-item__actions">
        <Button className="cart-item__action"
                click={remove}
        >−</Button>
        <Button
          className="cart-item__action"
          click={add}
        >+</Button>
      </div>
    </li>
  );
};

export default CartItem;
