import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    { id: 1, title: "Bienvenido a nuestro supermercado", image: "/Carrousel1.png" },
    { id: 2, title: "Ofertas especiales de esta semana", image: "/Carrousel2.png" },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide.id} sx={{ position: "relative" }}>
            <img
              src={slide.image}
              alt={slide.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              {slide.title}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Carousel;
