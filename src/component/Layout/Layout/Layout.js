import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster position="top-right" />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce - Welcome to Shop",
  description: "Modern MERN Stack Ecommerce Platform",
  keywords: "mern,react,node,mongodb,express,ecommerce",
  author: "Aman Khare",
};

export default Layout;