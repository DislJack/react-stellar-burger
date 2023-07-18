import styles from './ingredient-section.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import Ingredient from '../ingredient/ingredient';
import { useContext } from 'react';
import { StateContext } from '../../services/stateContext';


function IngredientSection({type, heading}) {
  const {data} = useContext(StateContext);
  return (
    <div>
      <h2 className='text text_type_main-medium'>{heading}</h2>
      <div className={styles.grid}>
        {data.map((ingredient) => {
          return ingredient.type === type ? <Ingredient ingredient={ingredient} key={ingredient._id} /> : '';
        })}
      </div>
    </div>
  )
}

IngredientSection.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired
}

export default IngredientSection;