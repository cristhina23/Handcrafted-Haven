
import ProductTable from "./ProductTable"

export default function AllProducts() {
  return (
    <div>
      <h1 className="text-2xl font-bold">All Your Products</h1>
      <div className="max-w-4xl flex items-center ">
       <ProductTable />
      </div>
    </div>
  )
}
