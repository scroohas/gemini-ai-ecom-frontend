import { IP } from "./constant";

const api = {};

api.products = {
  list: async () => {
    const response = await fetch(`${IP}/products`, {
      method: "GET",
    });

    const responseBody = await response.json();

    if (response.status !== 200) {
      throw new Error(responseBody);
    }

    return responseBody;
  },

  getById: async (id) => {
    const response = await fetch(`${IP}/products/${id}`, {
      method: "GET",
    });

    const responseBody = await response.json();

    if (response.status !== 200) {
      throw new Error(responseBody);
    }

    return responseBody;
  },

  generateAIAnalytics: async (id) => {
    const response = await fetch(`${IP}/products/${id}/generateAIAnalytics`, {
      method: "GET",
    });

    const responseBody = await response.json();

    if (response.status !== 200) {
      throw new Error(responseBody);
    }

    return responseBody;
  },
};

export default api;
