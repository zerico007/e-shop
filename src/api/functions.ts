import { AxiosRequestConfig } from "axios";
import { shopAPI } from "./setup";

export const getCart = async () => {
  const { data } = await shopAPI.get("/cart");
  return data;
};

export const getOrders = async (role: "administrator" | "customer") => {
  const url = role === "administrator" ? "/orders/admin" : "/orders";
  const { data } = await shopAPI.get(url);
  if (data.orders) {
    return data.orders.map(({ order }: any) => ({ ...order })).reverse();
  }
  return [];
};

export const getProducts = async () => {
  const { data } = await shopAPI.get("/products");
  return data.products.reverse();
};

export const login = async (params: { email: string; password: string }) => {
  const { data } = await shopAPI.post("/users/signin", params);
  return data;
};

export const register = async (params: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data } = await shopAPI.post("/users/signup", params);
  return data;
};

export const createProduct = async (
  productData: FormData,
  config?: AxiosRequestConfig
) => {
  const { data } = await shopAPI.post("/products", productData, config);
  return data;
};

export const updateProduct = async (
  id: string,
  productData: FormData,
  config?: AxiosRequestConfig
) => {
  const { data } = await shopAPI.put(`/products/${id}`, productData, config);
  return data;
};

export const deleteProduct = async (id: string) => {
  const deleteParams = { productId: id };
  const response = await shopAPI.delete("/orders/delete", {
    data: deleteParams,
  });
  if (response.status === 200) {
    const productDeleteResponse = await shopAPI.delete(`/products/${id}`);
    return productDeleteResponse;
  }
};

export const updateProductAvailability = async (
  id: string,
  available: boolean
) => {
  const path = available
    ? `/products/${id}/unavailable`
    : `/products/${id}/available`;

  const { data } = await shopAPI.put(path);
  return data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const params = { product: productId, quantity };
  console.log(params);
  const { data } = await shopAPI.post("/cart", params);
  return data;
};

export const updateCart = async (productId: string, quantity: number) => {
  const params = { product: productId, quantity };
  const { data } = await shopAPI.put("/cart/update", params);
  return data;
};

export const deleteFromCart = async (productId: string) => {
  const params = { product: productId };
  const { data } = await shopAPI.put("/cart/remove", params);
  return data;
};

export const placeOrder = async () => {
  const { data } = await shopAPI.post("/orders");
  return data;
};

export const updatePassword = async (
  userId: string,
  newPassword: string,
  currentPassword: string
) => {
  const params = { newPassword, currentPassword };
  const { data } = await shopAPI.put(`/users/${userId}`, params);
  return data;
};
