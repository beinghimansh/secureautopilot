
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    id: 'understanding-iso-27001',
    title: 'Understanding ISO 27001: A Comprehensive Guide',
    excerpt: 'Learn everything you need to know about ISO 27001 certification and how to prepare your organization for compliance.',
    image: 'public/lovable-uploads/acd5cdb0-70b8-4a38-97f8-b1d2e76c786d.png',
    date: 'May 15, 2023',
    author: 'Sarah Johnson',
    category: 'Compliance Basics'
  };
  
  const blogPosts = [
    {
      id: 'gdpr-compliance-checklist',
      title: 'GDPR Compliance Checklist: 10 Essential Steps',
      excerpt: 'Follow these 10 essential steps to ensure your organization is fully compliant with GDPR regulations.',
      date: 'April 28, 2023',
      author: 'Michael Chen',
      category: 'Data Privacy'
    },
    {
      id: 'ai-in-compliance',
      title: 'The Rise of AI in Compliance Management',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way organizations approach regulatory compliance.',
      date: 'April 15, 2023',
      author: 'Emily Roberts',
      category: 'Technology'
    },
    {
      id: 'soc2-vs-iso27001',
      title: 'SOC 2 vs. ISO 27001: Which is Right for Your Business?',
      excerpt: 'A detailed comparison of two major security frameworks to help you determine the best fit for your organization.',
      date: 'March 22, 2023',
      author: 'David Wong',
      category: 'Frameworks'
    },
    {
      id: 'compliance-culture',
      title: 'Building a Culture of Compliance: Beyond Checklists',
      excerpt: 'Learn strategies for fostering a compliance-focused culture that goes beyond simply checking boxes.',
      date: 'March 10, 2023',
      author: 'Jessica Miller',
      category: 'Best Practices'
    },
    {
      id: 'vendor-risk-management',
      title: 'Effective Vendor Risk Management Strategies',
      excerpt: 'Protect your organization by implementing these proven strategies for managing third-party vendor risks.',
      date: 'February 28, 2023',
      author: 'Robert Taylor',
      category: 'Risk Management'
    },
    {
      id: 'hipaa-compliance-guide',
      title: 'HIPAA Compliance Guide for Healthcare Startups',
      excerpt: 'A simplified roadmap for healthcare startups navigating the complex requirements of HIPAA compliance.',
      date: 'February 15, 2023',
      author: 'Laura Martinez',
      category: 'Healthcare'
    }
  ];
  
  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              ComplyAI Blog
            </h1>
            <p className="text-xl text-gray-400">
              Insights, guides, and expert perspectives on compliance and security.
            </p>
          </div>
          
          {/* Featured Post */}
          <div className="mb-16">
            <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-blue-400 text-sm font-medium mb-2">{featuredPost.category}</div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${featuredPost.id}`} className="text-blue-400 font-medium flex items-center hover:text-blue-300 transition-colors">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

const BlogPostCard = ({ post }) => {
  return (
    <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20">
      <div className="p-6 flex-grow">
        <div className="text-blue-400 text-sm font-medium mb-2">{post.category}</div>
        <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
        <p className="text-gray-400 mb-6">{post.excerpt}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author}</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <Link to={`/blog/${post.id}`} className="text-blue-400 font-medium flex items-center hover:text-blue-300 transition-colors">
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Blog;
