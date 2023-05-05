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
  asin: string
  title: string
  ccScore: number
}
