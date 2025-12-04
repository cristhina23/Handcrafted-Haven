
import ProductTable from "./ProductTable"

export default function AllProducts() {
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">All Your Products</h1>
      <div className="max-w-4xl ">
       <ProductTable />
      </div>
    </div>
  )
}
