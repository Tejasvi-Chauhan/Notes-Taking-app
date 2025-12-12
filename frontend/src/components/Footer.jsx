import React from "react";

const Footer = () => {
  return (
<footer className="fixed left-4 bottom-4 text-gray-400 text-xs flex items-center gap-2">
  © {new Date().getFullYear()}
  <span className="text-yellow-400">⚡</span>
  <span className="font-medium">Tejasvi Singh Chohan</span>
</footer>

  );
};

export default Footer;
