import styles from './ingredient-section.module.css';
import Ingredient from '../ingredient/ingredient';


function IngredientSection(props) {
  return (
    <div>
      <h2 className='text text_type_main-medium'>{props.heading}</h2>
      <div className={styles.grid}>
        {props.data.map((ingredient) => {
          if (ingredient.type === props.type) {
            return <Ingredient {...ingredient} key={ingredient._id} />
          }
        })}
      </div>
    </div>
  )
}

export default IngredientSection;