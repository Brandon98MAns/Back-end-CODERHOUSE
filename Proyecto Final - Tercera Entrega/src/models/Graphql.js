import ProductsApi from "../services/productsApi.js";
import { buildSchema } from "graphql";

export const graphqlSchema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Int!
    stock: Int!
  }

  type Query {
    productCount: Int!
    products: [Product]!
    findProduct(id: Int!): Product
  }

  type Mutation {
    addProduct(
      id: ID!
      name: String!
      price: Int!
      stock: Int!
    ): Product
    updateProduct(
      id: ID!
      name: String!
      price: Int!
      stock: Int!
    ): Product
    deleteProduct(id: ID!): Product
  }
`);

const api = ProductsApi.getInstance();

export const root = {
	productCount: async () => await api.getCount(),
	products: async () => await api.getAll(),
	findProduct: async ({ id }) => await api.get(id),
	addProduct: async ({ id, name, price, stock }) =>
		await api.addProduct({ id, name, price, stock }),
	updateProduct: async ({ id, name, price, stock }) => {
		const newProduct = { id, name, price, stock };
		return await api.update(id, newProduct);
	},
	deleteProduct: async ({ id }) => await api.delete(id),
};
