import { ItemCategory } from '../enums/item-category';

export default interface Item {
  name: string;
  price: number;
  active: boolean;
  catgegory: ItemCategory.DRINK | ItemCategory.FOOD;
  image: string;
  description: string;
  selected: boolean;
  index?: number;
}
