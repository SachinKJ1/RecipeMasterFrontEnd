export class Recipe {
  ingredients?: {
    quantity?: string | null;
    unit?: string;
    description?: string;
  }[];

  source_url?: string;
  image_url?: string;
  title?: string;
  servings?: string;
  cooking_time?: string;
  createdBy?: string;
  createdAt?: Date;
}
