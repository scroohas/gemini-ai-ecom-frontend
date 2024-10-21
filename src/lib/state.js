import { useQuery } from "@tanstack/react-query";
import api from "./api";

const STATE_TYPES = {
  PRODUCTS: "products",
  PRODUCT_AI_ANALYSIS: "product-ai-analysis",
};

export function useProducts() {
  const products = useQuery({
    queryKey: [STATE_TYPES.PRODUCTS],
    queryFn: api.products.list,
  });

  return {
    products: products.data,
    isLoading: products.isLoading,
  };
}

export function useProduct(id) {
  const product = useQuery({
    queryKey: [STATE_TYPES.PRODUCTS, id],
    queryFn: () => api.products.getById(id),
    staleTime: Infinity,
    refetchInterval: Infinity,
  });

  return {
    product: product.data,
    isLoading: product.isLoading,
  };
}

export function useProductAnalysis(id) {
  const analysis = useQuery({
    queryKey: [STATE_TYPES.PRODUCTS, id, STATE_TYPES.PRODUCT_AI_ANALYSIS],
    queryFn: () => api.products.generateAIAnalytics(id),
    staleTime: Infinity,
    refetchInterval: Infinity,
  });

  return {
    analysis: analysis.data,
    isLoading: analysis.isLoading,
  };
}
