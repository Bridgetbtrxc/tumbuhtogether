import { Link, Head } from "@inertiajs/react";
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Solusi from '../Components/Solusi'
import ProjekTerbaru from '../Components/ProjekTerbaru'
import Data from '../Components/Data'
import Footer from '../Components/Footer'


export default function Home({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
        <Navbar className="z-50"/>
        <Hero className="" />
        <div className="my-16">
          <Solusi />
        </div>
        <div className="my-16">
          <ProjekTerbaru />
        </div>
        <div className="my-16">
            <Data></Data>
        </div>
        <div className="my-16">
            <Footer></Footer>
        </div>
      </>
    );
}
