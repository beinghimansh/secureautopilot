
import React from 'react';

const SocialProof = () => {
  const companies = ["ACME Inc", "TechCorp", "FinanceEX", "HealthPlus", "RetailGo"];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Companies Worldwide</h2>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
          {companies.map((company, index) => (
            <div key={index} className="text-xl font-bold text-gray-400">{company}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
