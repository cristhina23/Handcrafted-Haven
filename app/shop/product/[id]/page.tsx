import BreadCrumb from "@/components/BreadCrump";
import Meta from "@/components/Meta";
import ProductPageContainer from "@/components/ProductPage/ProductPageContainer";

interface Props {
  params: Promise<{ id: string }>; 
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params; 
  return (
    <>
      <Meta title="Products" />
      <BreadCrumb title="Products" />
      <ProductPageContainer productId={resolvedParams.id} />
    </>
    );
}