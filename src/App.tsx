import { useRef, useState } from "react"
import { BsSearchHeart } from "react-icons/bs"
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
import Spinner from "./components/Spinner"
import { useForm } from "react-hook-form"

// const BASE_API_URL = "http://localhost:8000"
const BASE_API_URL = "https://sea-turtle-app-y5sxy.ondigitalocean.app"

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [itemAdding, setItemAdding] = useState<boolean>(false)
  const [productList, setProductList] = useState<ProductType[]>([])
  const { reset } = useForm()
  const productFormDialogRef = useRef<HTMLDialogElement>(null)

  const onSearch = (data: SearchFormData) => {
    setLoading(true)
    axios
      // .get(`${BASE_API_URL}/products?q=${data.query}`) // for node
      .get(`${BASE_API_URL}/api/product?search=${data.query}`)
      .then((response) => {
        //handle the response here
        const data: ProductResponse = response.data
        data?.data && setProductList(data.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onAddProduct = (data: ProductFormData) => {
    setItemAdding(true)
    axios
      .post(`${BASE_API_URL}/api/add-product/`, data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setItemAdding(false)
        productFormDialogRef.current?.close()
        reset()
      })
  }
  return (
    <>
      <dialog ref={productFormDialogRef}>
        <ProductForm
          itemAdding={itemAdding}
          onSubmit={onAddProduct}
          onClose={() => productFormDialogRef.current?.close()}
        />
      </dialog>
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

        <div id="product-list">
          {loading ? (
            <Spinner />
          ) : productList.length !== 0 ? (
            productList?.map((product) => (
              <Product product={product} key={product.asin} />
            ))
          ) : (
            <h2>
              <BsSearchHeart />
            </h2>
          )}
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
