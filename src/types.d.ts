export interface SearchFormData {
  query: string
}

export interface ProductFormData {
  title: string
  description: string
}

export interface ProductResponse {
  data: Product[]
}

export interface ProductType {
  asin?: string | undefined
  title: string
  ccScore?: number | undefined
  description?: string | undefined
  message?: string | undefined
}
