import Input from "../../base/input/Input";
import {useEffect, useRef, useState} from "react";
import Button from "../../base/button/Button";
import Card from "../../base/card/Card";
import './CartCheckout.css';

const isFilled = (value) => !!value.trim();

const CartCheckout = ({confirm, close}) => {
  const [formValidity, setFormValidation] = useState({
    name: true,
    street: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();

  const onConfirm = () => {
    const nameInput = nameRef.current.value;
    const streetInput = streetRef.current.value;
    const cityInput = cityRef.current.value;
    setFormValidation({
      name: isFilled(nameInput),
      street: isFilled(streetInput),
      city: isFilled(cityInput),
    });

    const formIsValid = isFilled(nameInput) && isFilled(streetInput) && isFilled(cityInput);
    if (!formIsValid) {
      return;
    }

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
          className={`cart-checkout__group ${!formValidity.name && 'input--invalid'}`}
          label="Your name"
          id="name"
          type="text"
          ref={nameRef}
        >
          {!formValidity.name && <p className="cart-checkout__group-message--error">Name is required</p>}
        </Input>
        <Input
          className={`cart-checkout__group ${!formValidity.street && 'input--invalid'}`}
          label="Street"
          id="street"
          type="text"
          ref={streetRef}
        >
          {!formValidity.street && <p className="cart-checkout__group-message--error">Street is required</p>}
        </Input>
        <Input
          className={`cart-checkout__group ${!formValidity.city && 'input--invalid'}`}
          label="City"
          id="city"
          type="text"
          ref={cityRef}
        >
          {!formValidity.city && <p className="cart-checkout__group-message--error">City is required</p>}
        </Input>
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
