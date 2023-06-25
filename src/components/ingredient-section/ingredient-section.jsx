import styles from './ingredient-section.module.css';
import React from 'react';
import Ingredient from '../ingredient/ingredient';


function IngredientSection(props) {
  // Возможно этот стейт нужно будет убрать, так как сброс не работает как надо
  const [count, setCount] = React.useState(0);
  const clearCount = () => {
    if (props.type === 'bun') setCount(0);
  }
  return (
    <div>
      <h2 className='text text_type_main-medium'>{props.heading}</h2>
      <div className={styles.grid}>
        {props.data.map((ingredient) => {
          if (ingredient.type === props.type) {
            return <Ingredient ingredient={ingredient} callBack={clearCount} counting={count} key={ingredient._id} />
          }
        })}
      </div>
    </div>
  )
}

export default IngredientSection;