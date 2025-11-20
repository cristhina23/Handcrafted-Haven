import Hero from "./(componentes)/Hero";
import ProductDashboard from "./(componentes)/ProductDashboard";
import { connectDB } from "@/lib/db/db";
import {Product} from "@/lib/models/Product";

export default async function Home() {
    await connectDB();
const products = JSON.parse(JSON.stringify(await Product.find()));

  return (
    <main className="font-sans">
      <Hero />
      <section className="mt-10">
        <ProductDashboard products={products} />
      </section>
    </main>
  );
}
