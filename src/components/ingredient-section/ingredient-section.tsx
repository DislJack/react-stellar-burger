import styles from './ingredient-section.module.css';
import { TIngredientPropType } from '../../utils/prop-types';
import Ingredient from '../ingredient/ingredient';
import { forwardRef, Ref } from 'react';
import {Link, useLocation} from 'react-router-dom';

type TIngredientSection = {
  heading: string;
  ingredients: Array<TIngredientPropType>;
}

const IngredientSection = forwardRef(function IngredientSection({heading, ingredients}: TIngredientSection, ref: Ref<HTMLHeadingElement>) {
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

export default IngredientSection;