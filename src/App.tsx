import { useRef, useState } from "react"
import "./App.css"
import SearchForm from "./components/SearchForm"
import axios from "axios"
import {
  ProductType,
  ProductResponse,
  ProductFormData,
  SearchFormData,
} from "./types"
import ProductForm from "./components/ProductForm"
import Product from "./components/Product"

function App() {
  const [productList, setProductList] = useState<ProductType[]>([
    {
      asin: "B00ICB6NB4",
      title: "Illinois Private Security Contractor License Exam Prep Kit",
      ccScore: 4.4720715835141,
    },
  ])
  const productFormDialogRef = useRef<HTMLDialogElement>(null)

  const onSearch = (data: SearchFormData) => {
    axios
      .get(`https://sarwas.azurewebsites.net/api/product?search=${data.query}`)
      .then((response) => {
        //handle the response here
        const data: ProductResponse = JSON.parse(response.data)
        data?.data && setProductList(data.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const onAddProduct = (data: ProductFormData) => {
    axios
      .post(`https://sarwas.azurewebsites.net/api/add-product`, data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <main>
        <div id="search">
          <h1>Products</h1>
          <div>
            <SearchForm onSubmit={onSearch} />
            <button
              type="button"
              onClick={() => {
                productFormDialogRef.current?.showModal()
              }}
            >
              New
            </button>
          </div>
        </div>
        <dialog ref={productFormDialogRef}>
          <ProductForm
            onSubmit={onAddProduct}
            onClose={() => productFormDialogRef.current?.close()}
          />
        </dialog>
        <div id="product-list">
          {productList?.map((product) => (
            <Product product={product} key={product.asin} />
          ))}
        </div>
      </main>
      <div id="footer">
        made with
        <img src="https://img.icons8.com/retro/32/null/filled-like.png" />
        by Chaitali
      </div>
    </>
  )
}

export default App
