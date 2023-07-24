import { initialBurger } from "../../components/app/app";

// Этот редьюсер сортирует элементы в зависимости от action.type. Работают 2 функции: Добавление элементов и удаление элементов из бургера. Все элементы с increment - добавляют в бургер новый ингредиенты. Все элементы с decrement - удаляют элементы из бургера. Dispatch для удаления пока что прописан не будет, но это заготовка на будущее. (Удаляться ингредиенты не будут пока что)
function burgerReducer(burger, action) {
  switch (action.type) {
    case 'ADD-BUN': {
      return {
        ...burger,
        bun: action.elem
      };
    }
    case 'REMOVE_BUN': {
      return {
        ...burger,
        bun: initialBurger.bun
      };
    }
    case 'ADD-INGREDIENT': {
      return {
        ...burger,
        ingredients: [...burger.ingredients, action.elem]
      };
    }
    case 'REMOVE-INGREDIENT': {
      return {
        ...burger,
        ingredients: burger.ingredients.filter(ingredient => ingredient._id !== action.elem._id)
      };
    }
    default: throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export {burgerReducer}