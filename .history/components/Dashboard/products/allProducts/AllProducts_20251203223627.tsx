
import ProductTable from "./ProductTable"

export default function AllProducts() {
  return (
    <div>
      <h1 className="text-2xl font-bold">All Your Products</h1>
      <div className="border-red-600 bg-pink-400">
       <ProductTable />
      </div>
    </div>
  )
}
