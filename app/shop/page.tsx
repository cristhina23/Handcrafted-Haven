
import BreadCrumb from '@/components/BreadCrump'
import Container from '@/components/Container'
import Meta from '@/components/Meta'
import Sidebar from '@/components/Sidebar/Sidebar'
import ProductsSection from '@/components/Products/ProductsSection'

function shopPage

() {
  return (
    <>
      <Meta title="Products" />
      <BreadCrumb title="Products" />
      <Container class1="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 bg-slate-100">
      
        <div className="w-full  p-6 md:p-10">
          <div className="flex gap-6">
            
            <aside className="hidden lg:block w-64">
              <Sidebar />
            </aside>

            
            <section className="flex-1">
              <ProductsSection />
            </section>
          </div>
        </div>

      </Container>
    </>
  )
}

export default shopPage
