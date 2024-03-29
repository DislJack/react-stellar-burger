import styles from './draggable-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient } from '../../services/actions/burger-constructor';
import { useRef, FunctionComponent } from 'react';
import {XYCoord, useDrag, useDrop} from 'react-dnd';
import { TIngredientPropType } from '../../utils/prop-types';
import { useDispatch } from '../../services/hooks';

type TDraggableElement = {
  ingredient: TIngredientPropType;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

type TDragItem = {
  ingredient: TIngredientPropType;
  index: number;
  type: string;
}

const DraggableElement: FunctionComponent<TDraggableElement> = ({ingredient, index, moveIngredient}) => {
  const dispatch = useDispatch();
  const dragRef = useRef<HTMLLIElement>(null);
  const [{isDrag}, drag] = useDrag({
    type: 'change',
    item: {ingredient, index},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const [, drop] = useDrop<TDragItem, void, unknown>({
    accept: 'change',
    hover(item: TDragItem, monitor) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dragRef?.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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

  const deleteElement = (ingredient: TIngredientPropType) => {
    dispatch(removeIngredient(ingredient))
  }
  const opacity = isDrag ? 0 : 1;
  drag(drop(dragRef));

  return (
    <>
      <li ref={dragRef} className={styles.drag} style={{opacity: opacity}} ><DragIcon type='primary' /><ConstructorElement text={`${ingredient.name}`} price={ingredient.price} thumbnail={`${ingredient.image}`} key={ingredient.key} handleClose={()=> deleteElement(ingredient)} /></li>
    </>
  )
}

export default DraggableElement;