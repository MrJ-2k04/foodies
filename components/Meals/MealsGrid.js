import MealItem from "./MealItem";
import classes from "./MealsGrid.module.css";

function MealsGrid({meals}) {
    return (<ul className={classes.meals}>
        {meals.map(meal=>{
            return <li key={meal.id}>
                <MealItem {...meal} />
            </li>
        })}
    </ul>);
}

export default MealsGrid;