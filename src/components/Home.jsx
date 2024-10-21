import { useProducts } from "../lib/state";
import ProjectCard from "./ProjectCard";
import PageLoading from "./PageLoading";

const Home = () => {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <section className="p-16 grid grid-cols-3 gap-4 cursor-pointer">
      {products?.map((product) => (
        <ProjectCard product={product} key={product.asin} />
      ))}
    </section>
  );
};

export default Home;
