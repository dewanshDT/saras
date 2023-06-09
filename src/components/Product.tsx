import { ProductType } from "../types"

function Product({ product }: { product: ProductType }) {
  return (
    <div className="product">
      <h4>{product.title}</h4>
      {product.description ? (
        <>
          <div>
            <code>{product.message}</code>
          </div>
          <div>
            <b>description:</b>
            <code>{product.description}</code>
          </div>
        </>
      ) : (
        <>
          <div>
            <code>{product.asin}</code>
          </div>
          <div>
            <b>CC Score:</b>
            <code>{product.ccScore}</code>
          </div>
        </>
      )}
    </div>
  )
}

export default Product
