import React from "react"
import { useForm } from "react-hook-form"
import { SearchFormData } from "../types"

function SearchForm({
  onSubmit,
}: {
  onSubmit: (data: SearchFormData) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>()

  return (
    <form id="search-form" role="search" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="search"
        id="q"
        aria-label="search product"
        placeholder="Search products"
        {...register("query")}
      />
      {errors.query && <span>this field is required</span>}
      <div id="search-spinner" aria-hidden hidden={true} />
      <div className="sr-only" aria-live="polite"></div>
    </form>
  )
}

export default SearchForm
