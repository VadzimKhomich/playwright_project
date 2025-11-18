export enum NOTIFICATIONS {
  PRODUCT_CREATED = "Product was successfully created",
  PRODUCT_DELETED = "Product was successfully deleted",
}

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Not authorized",
  EXISTS_PRODUCT: (productName: string) => `Product with name '${productName}' already exists`,
  INCORRECT_BODY: "Incorrect request body",
  NOT_FOUND_PRODUCT_ID: (id: string) => `Product with id '${id}' wasn't found`,
};
