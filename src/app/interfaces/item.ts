import { ItemCategory } from '../enums/item-category';

export default interface Item {
  id: string | number;
  name: string;
  price: number;
  counter?: number;
  active: boolean;
  catgegory: ItemCategory.DRINK | ItemCategory.FOOD;
  image: string;
  description: string;
  selected: boolean;
  index?: number;

  image_url?: string;
}
