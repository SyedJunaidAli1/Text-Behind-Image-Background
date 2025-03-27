import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Nav />
      <div>
        <section className="min-h-[85vh] w-full mx-auto max-w-[600px] px-4 sm:px-6 py-16">
          <main className="flex flex-col items-start justify-center gap-8">
            <header className="flex sm:flex-row justify-between items-center w-full gap-4 sm:gap-0"></header>
            <div>
              <h2 className="text-lg text-white font-medium">
                Text Behind Image
              </h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed">
                An text behind photo is a seamless way to add text behind your
                pictures, featuring a user-friendly interface and robust
                functionality for personal or educational use.
              </p>
            </div>
            <div>
              <h2 className="text-lg text-white font-medium">About</h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed">
                This Text behind Image is crafted for personal use with a
                minimalist design, offering essential features. It loads
                quickly, is optimized for mobile devices, and provides smooth
                animations for an enjoyable experience.
              </p>
            </div>
            <div>
              <h2 className="text-lg text-white font-medium">Support</h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed">
                The product is free to use and currently in beta. While no new
                features or bug fixes are guaranteed immediately, we plan to
                introduce new features in the future. Support will be available
                as needed.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-medium">Contact Us</h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed">
                For any inquiries or support, there is a highlighted tag below
                'Junaid' or Syedjunaidali790@gmail.com you can use to reach out to us directly.
              </p>
            </div>
            <div className="w-full h-[1px] bg-neutral-50/15"></div>
            <footer className="flex justify-between items-center w-full">
              <p className="mt-2 text-sm font-medium text-neutral-100 italic">
                V0.50
              </p>
              <a
                href="https://github.com/SyedJunaidAli1"
                target="_blank"
                className="opacity-none hover:text-[#bb79f1] transition"
              >
                Junaid
              </a>
            </footer>
          </main>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
