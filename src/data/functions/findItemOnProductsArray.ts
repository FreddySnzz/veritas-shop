import { initialData } from '../constants/products';

type CategoryKey = keyof typeof initialData;

export const findItem = (item: CategoryKey, ref?: string) => {
  const categoryArray = initialData[item];

  if (!categoryArray) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const foundProduct = categoryArray.find((product: any) => product.ref === ref);

  return foundProduct;
};