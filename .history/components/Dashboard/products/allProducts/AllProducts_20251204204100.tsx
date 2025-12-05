
import ProductTable from "./ProductTable"

export default function AllProducts() {
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">All Your Products</h1>
      <div className="w-full mx-auto p-8">
       <ProductTable />
      </div>
    </div>
  )
}
