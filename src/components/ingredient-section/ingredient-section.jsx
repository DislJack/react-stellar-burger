import styles from './ingredient-section.module.css';
import React from 'react';
import Ingredient from '../ingredient/ingredient';


function IngredientSection({data, type, heading, selectIngredient}) {
  return (
    <div>
      <h2 className='text text_type_main-medium'>{heading}</h2>
      <div className={styles.grid}>
        {data.map((ingredient) => {
          if (ingredient.type === type) {
            return <Ingredient ingredient={ingredient} selectIngredient={selectIngredient} key={ingredient._id} />
          }
        })}
      </div>
    </div>
  )
}

export default IngredientSection;