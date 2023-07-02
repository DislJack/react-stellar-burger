import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';


function IngredientDetails({ingredient}) {
  return (
    <>
      <h2 className='text text_type_main-large ml-10 mr-10' style={{marginTop: 52, alignSelf: 'flex-start'}}>Детали ингредиента</h2>
      <img className='ml-25 mr-25' src={ingredient.image_large} alt={ingredient.name} />
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
    </>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object
}

export default IngredientDetails;