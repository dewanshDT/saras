import { useForm } from "react-hook-form"
import { ProductFormData } from "../types"

function ProductForm({
  onSubmit,
  onClose,
  itemAdding,
}: {
  onSubmit: (data: ProductFormData) => void
  onClose: () => void
  itemAdding: boolean
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>()

  return (
    <form id="product-form" role="search" onSubmit={handleSubmit(onSubmit)}>
      <h4>Add Product</h4>
      <input
        type="text"
        id="product-title-input"
        aria-label="Product Title"
        placeholder="Product Title"
        disabled={itemAdding}
        {...register("title")}
      />
      {errors.title && <span>this field is required</span>}
      <textarea
        id="product-description-input"
        aria-label="product description"
        placeholder="Product Description"
        rows={5}
        cols={40}
        {...register("description")}
        disabled={itemAdding}
      />
      {errors.description && <span>this field is required</span>}
      <div>
        <button disabled={itemAdding} type="submit">
          Save
        </button>
        <button disabled={itemAdding} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProductForm
