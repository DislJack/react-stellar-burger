import styles from './ingredient-section.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import Ingredient from '../ingredient/ingredient';


function IngredientSection({data, burger, type, heading, selectIngredient, handleModal}) {
  return (
    <div>
      <h2 className='text text_type_main-medium'>{heading}</h2>
      <div className={styles.grid}>
        {data.map((ingredient) => {
          return ingredient.type === type ? <Ingredient ingredient={ingredient} burger={burger} selectIngredient={selectIngredient} handleModal={handleModal} key={ingredient._id} /> : '';
        })}
      </div>
    </div>
  )
}

IngredientSection.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  burger: PropTypes.shape({
    bun: PropTypes.object,
    ingredients: PropTypes.arrayOf(ingredientPropType)
  }),
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  selectIngredient: PropTypes.func,
  handleModal: PropTypes.func
}

export default IngredientSection;