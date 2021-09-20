import Header from "components/layouts/header/Header";
import React, {useContext} from "react";
import Meals from "components/meals/Meals";
import Cart from "components/cart/Cart";
import CartContext from "store/cart-context";

function App() {
  const { cartIsOpen, toggleCart, toggleCheckout } = useContext(CartContext);

  const showCart = () => {
    toggleCart(true);
  }

  const hideCart = () => {
    toggleCart(false);
  }

  const makeOrder = () => {
    toggleCheckout(true);
  }
  return (
    <div className="app">
      {cartIsOpen && <Cart hideCart={hideCart} makeOrder={makeOrder}/>}
      <Header showCart={showCart}/>
      <main className="app__content">
        <Meals/>
      </main>
    </div>
  );
}

export default App;
