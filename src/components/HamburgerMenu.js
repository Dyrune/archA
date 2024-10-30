import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  handleCityReturn,
  handleCity,
  staggerRevealClose
} from "./Animations";

import dallas from "../webpimages/dallas.webp";
import austin from "../webpimages/austin.webp";
import newyork from "../webpimages/newyork.webp";
import sanfrancisco from "../webpimages/sanfrancisco.webp";
import beijing from "../webpimages/beijing.webp";

const cities = [
  { name: "Dallas", image: dallas },
  { name: "Austin", image: austin },
  { name: "New York", image: newyork },
  { name: "San Francisco", image: sanfrancisco },
  { name: "Beijing", image: beijing }
];

const Hamburger = ({ state, swiperRef }) => {
  const navigate = useNavigate();
  const menuLayer = useRef(null);
  const reveal1 = useRef(null);
  const reveal2 = useRef(null);
  const cityBackground = useRef(null);
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      // Smooth closing animation
      gsap.to([reveal1.current, reveal2.current], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        onComplete: () => {
          // Hide the menu after the animation completes
          gsap.to(menuLayer.current, { css: { display: "none" } });
        }
      });
      staggerRevealClose(reveal2, reveal1);
    } else if (state.clicked === true || (state.clicked === true && state.initial === null)) {
      // Smooth opening animation
      gsap.to(menuLayer.current, { css: { display: "block" } });
      gsap.to([reveal1.current, reveal2.current], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1.current, reveal2.current);
      fadeInUp(info.current);
      staggerText(line1.current, line2.current, line3.current);
    }
  }, [state]);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
        navigate(path);
    gsap.to([reveal1.current, reveal2.current], {
      duration: 0.8,
      height: 0,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.to(menuLayer.current, { css: { display: "none" } });
      }
    });
  };
  
  const goToContactSlide = (e) => {
    e.preventDefault();
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(3);
    }
  };

  return (
    <div ref={menuLayer} className="hamburger-menu">
      <div ref={reveal1} className="menu-secondary-background-color"></div>
      <div ref={reveal2} className="menu-layer">
        <div ref={cityBackground} className="menu-city-background"></div>
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li>
                    <a
                      href="/about"
                      onMouseEnter={handleHover}
                      onMouseOut={handleHoverExit}
                      ref={line1}
                      onClick={(e) => handleLinkClick(e, "/about")}
                    >
                      About Info
                    </a>
                  </li>
                  <li>
                    <a
                      href="/project"
                      onMouseEnter={handleHover}
                      onMouseOut={handleHoverExit}
                      ref={line2}
                      onClick={(e) => handleLinkClick(e, "/projects")}
                    >
                      Project
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      onMouseEnter={handleHover}
                      onMouseOut={handleHoverExit}
                      ref={line3}
                    >
                      Contact Me
                    </a>
                  </li>
                </ul>
              </nav>
              <div ref={info} className="info">
                <h3>My Promise</h3>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as Architecture publishers bundled the text with
                  their software.
                </p>
              </div>
              <div className="locations">
               Locations:
                {cities.map((city) => (
                  <span
                    key={city.name}
                    onMouseEnter={() => handleCity(city.image, cityBackground.current)}
                    onMouseOut={() => handleCityReturn(cityBackground.current)}
                  >
                    {city.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
