
import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

type PublicPageLayoutProps = {
  children: React.ReactNode;
};

const PublicPageLayout: React.FC<PublicPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111]">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicPageLayout;
