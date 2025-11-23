// components/HeaderBottom.tsx
import AllCategoriesBtn from './AllCategoriesBtn'
import AllCategoriesButton from './AllCategoriesBtn'
import CategoryMenu from './CategoryMenu'
import UserActions from '../header-middle/UserActions'

export default function HeaderBottom() {
  return (
    <div className=" w-full  bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-0 sm:px-6 lg:px-8  flex items-center justify-between gap-6 h-12">
        <AllCategoriesBtn />
        <div className="ml-auto">
          <CategoryMenu />
        </div>

        <div className="md:hidden">
          <UserActions />
        </div>
      </div>
    </div>
  )
}
