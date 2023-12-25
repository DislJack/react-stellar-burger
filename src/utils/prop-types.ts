export type TIngredientPropType = {
  _id?: string;
  name?: string;
  type?: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  key?: string;
};

export type TOrder = {
  ingredients: string[];
  _id?: string;
  status?: string;
  name?: string;
  number?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type TZeroLocation = {
  hash: string;
  pahtname: string;
  search: string;
  state: undefined;
}

export type TEvent = {
  target: {
    value: string;
  }
}