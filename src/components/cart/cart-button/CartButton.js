import Button from "../../base/button/Button";
import CartIcon from "../cart-icon/CartIcon";
import './CartButton.css';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../../store/cart-context";

const CartButton = ({ number = 3, title, click }) => {
  const [isBtnAnimated, setAnimation] = useState(false);
  const { totalItems } = useContext(CartContext);
  useEffect(() => {
    if (!totalItems) {
      return;
    }
    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [totalItems]);
  return (
    <Button className={`cart-button ${isBtnAnimated ? 'cart-button--bump' : ''}`} click={click}>
      <span className="cart-button__icon">
        <CartIcon />
      </span>
      <span className="cart-button__title">{title}</span>
      <span className="cart-button__number">{number}</span>
    </Button>
  )
}

export default CartButton;
