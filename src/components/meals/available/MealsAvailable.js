import './MealsAvailable.css';
import Card from "../../base/card/Card";
import './MealsAvailable.css';
import MealItem from "../meal-item/MealItem";
import {fetchMeals} from "../../../services/api";
import {useEffect, useState} from "react";

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setError] = useState(null);

  useEffect(() => {
    const initMealsList = async () => {
      try {
        setMeals(await fetchMeals());
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    initMealsList();
  }, []);
  const mealsList = meals.map(({
    id,
    name,
    description,
    price,
   }) => {
    return (
      <MealItem
        id={id}
        key={id}
        price={price}
        title={name}
        description={description}
      />
    )
  })

  if (httpError) {
    return (
      <div className="meals-available--error">{httpError.message || 'Something went wrong'}</div>
    )
  }
  if (isLoading) {
    return (
      <div className="meals-available--loading">Loading...</div>
    )
  }
  return (
    <div className="meals-available">
      <Card>
        <ul className="meals-available__list">
          {mealsList}
        </ul>
      </Card>
    </div>
  );
}

export default MealsAvailable;
