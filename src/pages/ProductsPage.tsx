import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    selectAllProducts,
    selectProductsLoading,
    selectProductsError
} from "@/features/products/product.selectors";
import { fetchProductsRequest } from "@/features/products/product.slice";
import ProductTable from "@/components/ProductTable";
import ProductSearch from "@/components/ProductSearch";
import Aurora from "@/components/Aurora";
import Modal from "@/components/Modal";
import CreateProductForm from "@/components/CreateProductForm";

const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectAllProducts);
    const loading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false); // ✅ FIX

    const filteredProducts = useMemo(() => {
        if (!query) return products;
        const lower = query.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(lower)
        );
    }, [products, query]);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);

    return (
        <div className="relative bg-black">
            {/* 🌌 Aurora background */}
            <div className="fixed inset-0 z-0">
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={0.6}
                    amplitude={1.2}
                    speed={0.5}
                />
            </div>

            {/* 🖤 Dark overlay */}
            <div className="pointer-events-none fixed inset-0 z-[1] bg-black/40 backdrop-blur-xl" />

            {/* 🌟 Foreground content */}
            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Products
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Manage your inventory and stock levels
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end md:w-auto">
                        <div className="w-full sm:w-64">
                            <ProductSearch value={query} onChange={setQuery} />
                        </div>

                        <button
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition whitespace-nowrap cursor-pointer"
                        >
                            + Create Product
                        </button>
                    </div>
                </div>

                {/* Status */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <p className="text-indigo-300 animate-pulse font-medium">
                            Fetching latest products...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <div className="shadow-2xl shadow-black/50">
                        <ProductTable products={filteredProducts} />
                    </div>
                )}
            </main>

            {/* Modal will go here */}
            {/* */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <CreateProductForm
                    onSuccess={() => {
                        setOpen(false);
                        dispatch(fetchProductsRequest());
                    }}
                    onCancel={() => setOpen(false)}
                />
            </Modal>

        </div>
    );
};

export default ProductsPage;
