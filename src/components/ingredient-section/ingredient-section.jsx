import styles from './ingredient-section.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import Ingredient from '../ingredient/ingredient';

function IngredientSection({heading, ingredients, handleModal}) {
  return (
    <div>
      <h2 className='text text_type_main-medium'>{heading}</h2>
      <div className={styles.grid}>
        {ingredients.map((ingredient) => <Ingredient ingredient={ingredient} handleModal={handleModal} key={ingredient._id} />)}
      </div>
    </div>
  )
}

IngredientSection.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  heading: PropTypes.string.isRequired,
  handleModal: PropTypes.func
}

export default IngredientSection;