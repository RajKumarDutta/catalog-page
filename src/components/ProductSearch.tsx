// src/components/ProductSearch.tsx
import type { FC } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProductSearch: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search product name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full max-w-sm
        rounded-md
        border border-gray-300
        bg-white
        px-3 py-2
        text-sm
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500
      "
    />
  );
};

export default ProductSearch;
