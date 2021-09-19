import './MealsSummary.css';

const MealsSummary = () => {
  return (
    <div className="meals-summary">
      <h2 className="meals-summary__title">Delicious food</h2>
      <p className="meals-summary__content meals-summary__content--main">Choose your favorite meal from our broad
        selection of available meals
        and enjoy a delicious lunch or dinner at home.</p>
      <p className="meals-summary__content meals-summary__content--secondary">
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </div>
  );
}

export default MealsSummary;
