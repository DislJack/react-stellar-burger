import styles from './ingredient-section.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import Ingredient from '../ingredient/ingredient';
import { forwardRef } from 'react';
import {Link, useLocation} from 'react-router-dom';

const IngredientSection = forwardRef(function IngredientSection({heading, ingredients}, ref) {
  const location = useLocation();

  return (
    <div>
      <h2 className='text text_type_main-medium' ref={ref}>{heading}</h2>
      <div className={styles.grid}>
        {ingredients.map((ingredient) => <Link key={ingredient._id} to={{pathname: `/ingredients/${ingredient._id}`, state: {background: location}}} className={styles.link} ><Ingredient ingredient={ingredient} key={ingredient._id} /></Link>)}
      </div>
    </div>
  )
})

IngredientSection.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  heading: PropTypes.string.isRequired
}

export default IngredientSection;