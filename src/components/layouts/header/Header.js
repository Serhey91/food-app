import './Header.css';
import meals from '../../../assets/imgs/meals.jpeg';
import CartButton from "../../cart/cart-button/CartButton";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const Header = ({showCart}) => {
  const { totalItems } = useContext(CartContext);
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">Meals app</h1>
        <CartButton number={totalItems} title="Your cart" click={showCart}/>
      </div>
      <div className="header__image-wrapper">
        <img src={meals} alt="meals" className="header__image"/>
      </div>
    </div>
  )
}

export default Header;
