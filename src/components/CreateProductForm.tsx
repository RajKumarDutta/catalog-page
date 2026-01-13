import { useState } from "react";
import { generateIdempotencyKey } from "@/utils/idempotency";
import { api } from "@/utils/axios";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateProductForm = ({ onSuccess, onCancel }: Props) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    categoryId: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const idempotency = generateIdempotencyKey();

    try {
      await api.post(
        "",
        {
          idempotency,
          productDto: {
            name: form.name,
            description: form.description,
            stock: Number(form.stock),
            price: Number(form.price),
            categoryId: Number(form.categoryId)
          }
        },
        {
          headers: {
            "Idempotency-Key": idempotency
          }
        }
      );

      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Create Product
      </h2>

      <input
        name="name"
        placeholder="Product name"
        required
        onChange={handleChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          required
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          required
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <input
        name="categoryId"
        type="number"
        placeholder="Category ID"
        required
        onChange={handleChange}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
