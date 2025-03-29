import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { PageTransition } from '@/components/common/Transitions';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import Footer from '@/components/home/Footer';
import Button from '@/components/common/Button';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Beginner's Guide to ISO 27001 Compliance",
      excerpt: "Learn the fundamentals of ISO 27001 and how to start your information security management journey.",
      date: "May 15, 2023",
      author: "Alex Johnson",
      category: "Compliance Basics",
      image: "/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png"
    },
    {
      id: 2,
      title: "Top 5 Common SOC 2 Audit Failures and How to Avoid Them",
      excerpt: "Discover the most frequent pitfalls organizations face during SOC 2 audits and strategies to overcome them.",
      date: "June 8, 2023",
      author: "Sarah Chen",
      category: "Audit Preparation",
      image: "/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png"
    },
    {
      id: 3,
      title: "GDPR Compliance in 2023: What's Changed?",
      excerpt: "Stay up to date with the latest developments and interpretations of GDPR requirements.",
      date: "July 21, 2023",
      author: "Michael Rodriguez",
      category: "Regulatory Updates",
      image: "/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png"
    },
    {
      id: 4,
      title: "AI in Compliance: Opportunities and Challenges",
      excerpt: "Explore how artificial intelligence is transforming compliance management and what it means for your organization.",
      date: "August 3, 2023",
      author: "Emily Wong",
      category: "Technology Trends",
      image: "/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png"
    },
    {
      id: 5,
      title: "Building a Culture of Compliance: Beyond Checkbox Exercises",
      excerpt: "Learn strategies for embedding compliance into your organizational culture for sustainable security practices.",
      date: "September 12, 2023",
      author: "David Richards",
      category: "Best Practices",
      image: "/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png"
    }
  ];

  const categories = [
    "Compliance Basics",
    "Audit Preparation",
    "Regulatory Updates",
    "Technology Trends",
    "Best Practices",
    "Case Studies"
  ];

  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <PageTransition skipAnimation={true}>
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Compliance Blog</h1>
              <p className="text-xl text-gray-400">
                Insights, updates, and best practices for modern compliance management
              </p>
            </div>

            {/* Featured Post */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden mb-16">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Featured</span>
                    <span className="text-gray-400 text-sm">October 5, 2023</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-white">ISO 42001: The New AI Management Standard</h2>
                  <p className="text-gray-400 mb-6">
                    A comprehensive guide to the new ISO 42001 standard for artificial intelligence management systems.
                    Learn how this framework helps organizations manage AI risks and ensure responsible AI deployment.
                  </p>
                  <div className="flex flex-wrap items-center mb-6">
                    <div className="flex items-center mr-4">
                      <User className="h-4 w-4 text-blue-400 mr-1" />
                      <span className="text-sm text-gray-400">Dr. James Wilson</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-blue-400 mr-1" />
                      <span className="text-sm text-gray-400">AI Compliance</span>
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="h-64 md:h-auto bg-gray-800 relative">
                  <img 
                    src="/lovable-uploads/49b99d24-0168-4ba5-bcfa-00f6358ae80a.png" 
                    alt="AI Management" 
                    className="object-cover h-full w-full opacity-80"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-white">Latest Articles</h2>
                <div className="space-y-8">
                  {blogPosts.map(post => (
                    <div 
                      key={post.id}
                      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="h-48 sm:h-full bg-gray-800 relative">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="object-cover h-full w-full opacity-70"
                          />
                        </div>
                        <div className="sm:col-span-2 p-6">
                          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-3">
                            <div className="flex items-center mr-4">
                              <Calendar className="h-4 w-4 text-blue-400 mr-1" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center mr-4">
                              <User className="h-4 w-4 text-blue-400 mr-1" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 text-blue-400 mr-1" />
                              <span>{post.category}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                          <p className="text-gray-400 mb-4">{post.excerpt}</p>
                          <a href="#" className="text-blue-400 flex items-center text-sm hover:text-blue-300 transition-colors">
                            Continue Reading
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="outline"
                    className="text-white border-gray-700 hover:bg-gray-800"
                  >
                    Load More Articles
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category}>
                        <a 
                          href="#" 
                          className="flex items-center justify-between text-gray-400 hover:text-blue-400 transition-colors py-2"
                        >
                          <span>{category}</span>
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-4 text-white">Subscribe</h3>
                  <p className="text-gray-400 mb-4">
                    Get the latest compliance insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

const ChevronRight = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Blog;
