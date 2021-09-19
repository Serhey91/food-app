import './MealItemForm.css';
import Input from "../../../base/input/Input";
import Button from "../../../base/button/Button";
import {useRef, useState} from "react";
const MealItemForm = ({ id, addItem }) => {
  const [isFormValid, setValidity] = useState(true);
  const DEFAULT_ITEM_AMOUNT = 1;
  const MAX_AMOUNT = 10;
  const MIN_AMOUNT = 1;
  const inputRef = useRef();
  const onAddItem = () => {
    const value = +inputRef.current.value;
    if (value < MIN_AMOUNT || value > MAX_AMOUNT) {
      return setValidity(false);
    }
    addItem(value);
    setValidity(true);
    inputRef.current.value = DEFAULT_ITEM_AMOUNT;
  }
  return (
    <div className="meal-item-form">
      <Input
        ref={inputRef}
        label="Amount"
        id={`amount-${id}`}
        type="number"
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        defaultValue={DEFAULT_ITEM_AMOUNT}
      />
      <Button click={onAddItem}> + Add </Button>
      {!isFormValid && <p className="meal-item-form__error">Form is invalid</p>}
    </div>
  )
}

export default MealItemForm;
