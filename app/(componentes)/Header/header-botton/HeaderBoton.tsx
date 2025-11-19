// components/HeaderBottom.tsx
import AllCategoriesBtn from './AllCategoriesBtn'
import AllCategoriesButton from './AllCategoriesBtn'
import CategoryMenu from './CategoryMenu'

export default function HeaderBottom() {
  return (
    <div className=" w-full bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 h-16">
        <AllCategoriesBtn />
        <CategoryMenu />
      </div>
    </div>
  )
}
