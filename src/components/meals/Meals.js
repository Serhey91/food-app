import './Meals.css';
import MealsSummary from "./summary/MealsSummary";
import MealsAvailable from "./available/MealsAvailable";
const Meals = () => {
  return (
    <div className="meals">
      <MealsSummary />
      <MealsAvailable />
    </div>
  )
}

export default Meals;
