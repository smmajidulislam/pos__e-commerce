import CategoryMenu from "./components/global/e__commerce/CategoryMenu";
import CollectionList from "./components/global/e__commerce/CollectionList";
import Footer from "./components/global/e__commerce/Footer";
import Header from "./components/global/e__commerce/Header";
import Hero from "./components/global/e__commerce/Hero";
import ProductList from "./components/global/e__commerce/ProductList";

export default function Home() {
  return (
    <main>
      <main className="min-h-screen">
        <Header />
        <CategoryMenu />
        <Hero />
        <ProductList />
        <CollectionList />
        <Footer />
      </main>
    </main>
  );
}
