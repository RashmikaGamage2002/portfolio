const Footer = () => {
  return (
    <footer className="py-10 bg-primary border-t border-white/10">
      <div className="container mx-auto px-6 text-center text-dimText">
        <p>© {new Date().getFullYear()} Rashmika Gamage. Built with React, Vite, and Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
