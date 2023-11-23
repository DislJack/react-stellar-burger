import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import {useParams} from 'react-router-dom';
import { selectIngredientList } from '../../services/selectors';

function IngredientDetails() {
  const {ingredientId} = useParams();
  const data = useSelector(selectIngredientList);
  const ingredients = data.buns.concat(data.sauces, data.main);
  const ingredient = ingredients.find(ing => ing._id === ingredientId);
  
  return (
    <>
      {ingredient === undefined? <div></div> : 
      <>
        <h2 className='text text_type_main-large'>Детали ингредиента</h2>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className='text text_type_main-medium mt-4'>{ingredient.name}</p>
        <ul className={styles.grid}>
          <li className={styles.numbers}>
            <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
            <p className='text text_type_main-default text_color_inactive'>{ingredient.calories}</p>
          </li>
          <li className={styles.numbers}>
            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
            <p className='text text_type_main-default text_color_inactive'>{ingredient.proteins}</p>
          </li>
          <li className={styles.numbers}>
            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
            <p className='text text_type_main-default text_color_inactive'>{ingredient.fat}</p>
          </li>
          <li className={styles.numbers}>
            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
            <p className='text text_type_main-default text_color_inactive'>{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </>}
    </>
  )
}

export default IngredientDetails;