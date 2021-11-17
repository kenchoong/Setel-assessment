import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import NavBar from "../components/layout/NavBar";
import ProductList from "../components/product/ProductList";

const Home: NextPage = () => {
  return (
    <Layout>
      <NavBar />

      <ProductList />
    </Layout>
  );
};

export default Home;
