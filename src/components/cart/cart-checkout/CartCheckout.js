import Input from "../../base/input/Input";
import {useRef} from "react";
import Button from "../../base/button/Button";
import Card from "../../base/card/Card";
import './CartCheckout.css';

const CartCheckout = ({confirm, close}) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();

  const onConfirm = () => {
    // TODO: validate
    confirm({
      name: nameRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
    })
  }
  return (
    <form autoComplete="off" className="cart-checkout">
      <Card>
        <Input
          className="cart-checkout__group"
          label="Your name"
          id="name"
          type="text"
          ref={nameRef}
        />
        <Input
          className="cart-checkout__group"
          label="Street"
          id="street"
          type="text"
          ref={streetRef}
        />
        <Input
          className="cart-checkout__group"
          label="City"
          id="city"
          type="text"
          ref={cityRef}
        />
        <div className="cart-checkout__actions">
          <Button
            click={close}
            className="cart-checkout__action cart-checkout__action--alt"
          >Close</Button>
          <Button
            click={onConfirm}
            className="cart-checkout__action"
          >Confirm</Button>
        </div>
      </Card>
    </form>
  )
};

export default CartCheckout;
