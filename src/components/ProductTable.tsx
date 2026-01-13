import type { FC } from "react";
import { TableVirtuoso, type TableComponents } from "react-virtuoso";
import type { ProductResponse } from "../features/products/product.types";
import { useNavigate } from "react-router-dom";

interface Props {
  products: ProductResponse[];
}

// Define the table structure to ensure Tailwind classes apply correctly to the internal elements
const VirtuosoTableComponents: TableComponents<ProductResponse> = {
  Table: (props) => (
    <table {...props} className="w-full border-collapse text-sm" />
  ),
  TableRow: (props) => (
    <tr {...props} className="hover:bg-gray-50 transition-colors" />
  ),
};

const ProductTable: FC<Props> = ({ products }) => {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-32 text-gray-500 border rounded-lg">
        No products found
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
      <TableVirtuoso
        style={{ height: 700 }}
        data={products}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => (
          <tr className="bg-gray-50">
            {/* Added explicit widths to ensure header and body stay aligned */}
            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[40%] bg-gray-50">Product</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[20%] bg-gray-50">Category</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[15%] bg-gray-50">Price</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[15%] bg-gray-50">Stock</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 w-[10%] bg-gray-50">Action</th>
          </tr>
        )}
        itemContent={(_index, p) => (
          <>
            <td className="px-4 py-3 text-left border-b border-gray-100 align-middle">
              <div className="leading-tight">
                <p className="font-medium text-gray-900">{p.name}</p>
                {p.description && (
                  <p className="text-xs text-gray-500 line-clamp-1">{p.description}</p>
                )}
              </div>
            </td>
            <td className="px-4 py-3 text-left border-b border-gray-100 align-middle">
              <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                {p.categoryName}
              </span>
            </td>
            <td className="px-4 py-3 text-left border-b border-gray-100 align-middle font-medium text-indigo-600">
              ₹{p.price}
            </td>
            <td className="px-4 py-3 text-left border-b border-gray-100 align-middle">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${p.stock > 10 ? "bg-green-100 text-green-700" : 
                    p.stock > 0 ? "bg-yellow-100 text-yellow-700" : 
                    "bg-red-100 text-red-700"}`}>
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </span>
            </td>
            <td className="px-4 py-3 text-right border-b border-gray-100 align-middle">
              <button
                onClick={() => navigate(`/products/${p.productId}`)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer p-1"
              >
                View
              </button>
            </td>
          </>
        )}
      />
    </div>
  );
};

export default ProductTable;