import Hero from "./components/Hero";
import ImageComparisonSpring from "./components/ImageComparisonSpring";

import ImageGrid from "./components/ImageGrid";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ImageComparisonSpring />
      <ImageGrid />
    </>
  )
}
