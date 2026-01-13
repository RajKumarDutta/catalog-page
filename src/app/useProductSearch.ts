import { useMemo } from "react";
import type { ProductResponse } from "@/features/products/product.types";
import { Trie } from "@/utils/trie";

export const useProductSearch = (products: ProductResponse[]) => {
  const trie = useMemo(() => {
    const t = new Trie();
    products.forEach((p, index) => {
      t.insert(p.name, index);
    });
    return t;
  }, [products]);

  const search = (query: string) => {
    if (!query) return products;

    const indexes = trie.search(query);
    return indexes.map(i => products[i]);
  };

  return search;
};
