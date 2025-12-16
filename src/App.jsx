import Layout from "./components/layout/Layout";
import Navigation from "./components/navigation/Navigation";
import Hero from "./components/sections/Hero";
import Gallery from "./components/sections/Gallery";
import Bio from "./components/sections/Bio";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <Layout>
      <Navigation />
      <Hero />
      <Gallery />
      <Bio />
      <Contact />
      <Footer />
    </Layout>
  );
}
