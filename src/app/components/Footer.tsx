import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full py-4 flex justify-center items-center border-t border-gray-700 animate-fadeIn">
            <div className="flex gap-6 text-sm animate-slideUp">
                <a href="/Privacy" className="hover:text-gray-400 transition-colors duration-300">Privacy Policy</a>
                <a href="/terms" className="hover:text-gray-400 transition-colors duration-300">Terms & Conditions</a>
                <a href="/About" className="hover:text-gray-400 transition-colors duration-300">About</a>
            </div>
        </footer>
    )
}

export default Footer
