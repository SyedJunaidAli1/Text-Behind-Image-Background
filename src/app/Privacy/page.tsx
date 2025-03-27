import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Privacy = () => {
    return (
        <>
            <Nav />
            <div className="max-w-3xl mx-auto p-6 min-h-[84vh]">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p>📅 Last Updated: March 27, 2025</p>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">1. Introduction</h2>
                    <p>
                        Welcome to <strong>Text Behind Image</strong>. Your privacy is
                        important to us. This Privacy Policy outlines how we handle your data
                        when you use our application.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">2. Information We Collect</h2>
                    <p>
                        We do <strong>not</strong> collect, store, or share any personal data,
                        images, or any other user-related information.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">3. How We Handle User Data</h2>
                    <p>
                        - All processing occurs locally in your browser or on your device.
                        <br />- We do not store or transmit any images, text, or personal
                        information to external servers.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">4. Third-Party Services</h2>
                    <p>
                        Our application does not integrate with any third-party services that
                        collect or track user data.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">5. Security</h2>
                    <p>
                        Since we do not store any user data, there is no risk of data breaches
                        related to our service.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">6. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. If changes occur,
                        we will notify users by updating this page.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us
                        at <strong>[Syedjunaidali790@gmai.com]</strong>.
                    </p>
                </section>
            </div>
            <Footer/>
        </>
    );
};

export default Privacy;
