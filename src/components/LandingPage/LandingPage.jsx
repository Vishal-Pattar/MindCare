import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import gif from "../../assets/MindCare2.gif";
import { triggerFetchCredits } from "../../hooks/useCredits";
import people from "../../assets/watching-people.png";
import servicesData from "./servicesData.js";
import Footer from "../Footer/Footer.jsx";

const LandingPage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and apply the theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme);
    }

    // Trigger credits fetch if authToken is in sessionStorage
    if (sessionStorage.getItem("authToken")) {
      triggerFetchCredits();
    }

    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure the canvas element exists
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Ensure the context exists

    const img = new Image();

    // Fetch the current theme's border color from the computed styles
    const themeContainer = document.querySelector(".landingpage__boardborder");
    if (!themeContainer) return; // Ensure themeContainer exists
    const computedStyle = getComputedStyle(themeContainer);
    const borderColor = computedStyle
      .getPropertyValue("--color-bg-body")
      .trim();

    // Handle image loading
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Apply border color from theme
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over"; // Reset to default
    };

    img.onerror = () => {
      console.error("Failed to load the image.");
    };

    img.src = people; // Start loading the image

    return () => {
      if (storedTheme) {
        document.documentElement.classList.remove(storedTheme);
      }
    };
  }, []);

  return (
    <div className="landingpage__container">
      <div className="landingpage__boardborder">
        <div className="landingpage__boardcontent">
          <img src={gif} alt="MindCare" className="landingpage__gif" />
        </div>
      </div>
      <canvas ref={canvasRef} className="landingpage__people" />
      <div className="landingpage__service">
        <div className="landingpage__services__grid">
          {servicesData.map((service, index) => (
            <div key={index} className="landingpage__service__card">
              <span className="landingpage__service__icon">{service.icon}</span>
              <div className="landingpage__service__title">{service.title}</div>
              <div className="landingpage__service__description">
                <span>{service.description}</span>
              </div>
              <button
                className="landingpage__service__button"
                onClick={() => navigate(service.link)}
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
