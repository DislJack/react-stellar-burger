import styles from './ingredient-section.module.css';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';


function IngredientSection({data, burger, type, heading, selectIngredient}) {
  return (
    <div>
      <h2 className='text text_type_main-medium'>{heading}</h2>
      <div className={styles.grid}>
        {data.map((ingredient) => {
          if (ingredient.type === type) {
            return <Ingredient ingredient={ingredient} burger={burger} selectIngredient={selectIngredient} key={ingredient._id} />
          }
        })}
      </div>
    </div>
  )
}

IngredientSection.propTypes = {
  data: PropTypes.array.isRequired,
  burger: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  selectIngredient: PropTypes.func
}

export default IngredientSection;