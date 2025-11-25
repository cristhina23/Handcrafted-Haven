import BreadCrumb from '@/components/BreadCrump'
import Container from '@/components/Container'
import Meta from '@/components/Meta'
import ProductsSection from '@/components/Products/ProductsSection'

function ShopPage() {
  return (
    <>
      <Meta title="Products" />
      <BreadCrumb title="Products" />

      <Container class1="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 bg-slate-100">
        <div className="w-full p-6 md:p-8">
          
          
          <ProductsSection />
        
        </div>
      </Container>
    </>
  )
}

export default ShopPage
