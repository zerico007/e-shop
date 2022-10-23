import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = `${import.meta.env?.VITE_API}/api`;

const shopAPI = axios.create({
  baseURL: BASE_URL,
});

shopAPI.interceptors.response.use(
  (response) => {
    let newAccessToken;
    const authHeader = shopAPI.defaults.headers.common[
      "Authorization"
    ] as string;
    const currentToken = authHeader?.split(" ")[1];
    if (currentToken) {
      const currentDecodedToken: any = jwt_decode(currentToken);
      const { exp } = currentDecodedToken;
      if (exp * 1000 < Date.now()) {
        console.log("token expired");
        if (response.headers["shop-refreshed-access-token"]) {
          newAccessToken = response.headers["shop-refreshed-access-token"];
          setBearerToken(newAccessToken);
          console.info("access token renewed");
        }
      } else {
        console.info("token still good");
      }
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const setBearerToken = (token: string) => {
  shopAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(`Set bearer token`);
};

export { shopAPI, setBearerToken };
