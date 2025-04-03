import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Terms = () => {
    return (
        <>
            <Nav />
            <div className="max-w-3xl min-h-[85vh] mx-auto p-6 text-gray-900 dark:text-gray-100">
                <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: March 27, 2025</p>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By using <strong>Text Behind Image</strong>, you agree to these Terms and Conditions. If you do not
                        agree, please do not use this application.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">2. Use of the Application</h2>
                    <ul className="list-disc pl-6">
                        <li>The app is provided <strong>as-is</strong> for personal and non-commercial use.</li>
                        <li>You must not use it for illegal activities or content.</li>
                    </ul>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
                    <p>
                        All content, design, and code of <strong>Text Behind Image</strong> are owned by us. You may not copy,
                        modify, or redistribute it without permission.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
                    <p>
                        We are not responsible for any damages, losses, or misuse of the app. Use it at your own risk.
                    </p>
                </section>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
                    <p>
                        We may update these Terms at any time. Continued use of the app means you accept the new Terms.
                    </p>
                </section>

                <section className="mt-6 border-t pt-4">
                    <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                    <p>
                        If you have any questions, reach out to us at <strong>[Your Email]</strong>.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Terms;
