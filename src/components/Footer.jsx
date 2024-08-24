import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileDownload } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-xl mb-4">Connect with Me</h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/shafquatulbari"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/shafquatulbari/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="mailto:shafquat.bari11@gmail.com"
            className="hover:text-blue-400"
          >
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
          <a
            href="/shafquat.pdf" // Corrected path to the PDF
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 flex items-center"
          >
            <FontAwesomeIcon icon={faFileDownload} size="2x" />
            <span className="ml-2 text-lg">My Resume</span> {/* Added text */}
          </a>
        </div>
        <p className="mt-6 text-sm">
          &copy; 2024 Shafquat Ul Bari. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
