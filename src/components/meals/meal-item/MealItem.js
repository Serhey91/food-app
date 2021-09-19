import './MealItem.css';
import MealItemForm from "./meal-item-form/MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";
const MealItem = ({ title, description, price, id }) => {
  const { addItem } = useContext(CartContext);
  const mealPrice = `$${price.toFixed(2)}`;
  const addItemHandler = (amount) => {
    addItem({
      amount,
      title,
      description,
      price,
      id,
    })
  }
  return (
    <li className="meal-item">
      <div className="meal-item__content">
        <h3 className="meal-item__title">{title}</h3>
        <p className="meal-item__description">{description}</p>
        <p className="meal-item__price">{mealPrice}</p>
      </div>
      <div className="meal-item__form">
        <MealItemForm id={id} addItem={addItemHandler}/>
      </div>
    </li>
  );
}

export default MealItem;
