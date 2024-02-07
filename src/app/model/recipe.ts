export interface Recipe {
  id?: number;
  title: string;
  description: string;
  image: string;
  vegetarian: boolean | string;
  likes?: number[];
  createdAt?: Date;
  user?: any;
}
