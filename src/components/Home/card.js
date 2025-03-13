import React from "react";
import { motion } from "framer-motion";
import "./card.css"; // Import the CSS for styling

const Card = ({ title, icon, bgColor, description }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 80 }, // Subtle entry point
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8, // Slower for smoothness
        ease: "easeInOut", // Smooth in & out
      },
    },
  };

  return (
    <motion.div
      className="animated-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Re-animates when 30% visible
      style={{ background: bgColor }}
    >
      <div className="card-content">
        <div className="icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desription">{description}</p>
      </div>
    </motion.div>
  );
};

export default Card;
