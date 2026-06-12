export interface CartItem {
  journalId: string
  title: string
  price: number          // the active price (sale price if onSale, else regular)
  regularPrice: number
  salePrice?: number
  onSale: boolean
  quantity: number
  featuredImage: string
  format: string          // e.g. "Digital PDF" / "Physical" — from journal data
}

export interface CartState {
  items: CartItem[]
  subtotal: number
  total: number
}
