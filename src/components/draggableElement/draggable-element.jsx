import styles from './draggable-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/actions/burger-constructor';
import { useRef } from 'react';
import {useDrag, useDrop} from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

function DraggableElement({ingredient, index, moveIngredient}) {
  const dispatch = useDispatch();
  const dragRef = useRef();
  const [{isDrag}, drag] = useDrag({
    type: 'change',
    item: {ingredient, index},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const [, drop] = useDrop({
    accept: 'change',
    hover(item, monitor) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const deleteElement = (e, ingredient) => {
    e.preventDefault();
    dispatch(removeIngredient(ingredient))
  }
  const opacity = isDrag ? 0 : 1;
  drag(drop(dragRef));

  return (
    <>
      <li ref={dragRef} className={styles.drag} style={{opacity: opacity}} ><DragIcon /><ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} key={ingredient.key} handleClose={e=> deleteElement(e,  ingredient)} /></li>
    </>
  )
}

DraggableElement.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func
}

export default DraggableElement;