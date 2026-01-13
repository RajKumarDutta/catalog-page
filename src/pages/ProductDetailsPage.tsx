import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectProductDetails,
  selectProductsLoading,
  selectProductsError
} from "@/features/products/product.selectors";
import {
  fetchProductByIdRequest,
  clearSelectedProduct
} from "@/features/products/product.slice";
import Aurora from "@/components/Aurora";
import { ArrowLeft, Package, Tag, Layers } from "lucide-react"; // Optional: npm install lucide-react

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectProductDetails);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (productId) {
      const id = Number(productId);
      if (!Number.isNaN(id)) {
        dispatch(fetchProductByIdRequest(id));
      }
    }
    return () => { dispatch(clearSelectedProduct()); };
  }, [dispatch, productId]);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 🌌 Aurora background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.5}
        />
      </div>

      {/* 🖤 Dark + blur overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/40 backdrop-blur-2xl" />

      {/* 🌟 Foreground content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-20">
        
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </button>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-400 animate-pulse">Loading product details...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Product Card */}
        {!loading && !error && product && (
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    {product.categoryName}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {product.name}
                  </h1>
                </div>
                
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-400 mb-1">Price</p>
                  <p className="text-4xl font-black text-white flex items-center md:justify-end">
                    <span className="text-indigo-400 mr-1 text-2xl">₹</span>
                    {product.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Description</h3>
                <p className="text-xl text-gray-300 leading-relaxed font-light">
                  {product.description || "No description available for this product."}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <Package className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-medium uppercase">Stock Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                    <p className="text-lg font-medium text-white">
                      {product.stock > 0 ? `${product.stock} Units Available` : 'Out of Stock'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <Tag className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-medium uppercase">Category</span>
                  </div>
                  <p className="text-lg font-medium text-white">{product.categoryName}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-medium uppercase">Product ID</span>
                  </div>
                  <p className="text-lg font-medium text-white">#{product.productId}</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetailsPage;