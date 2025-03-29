
import React, { useState } from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  HelpCircle, 
  Book, 
  FileText,
  Send
} from 'lucide-react';
import Button from '@/components/common/Button';

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend
    alert('Support request submitted successfully!');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password.'
    },
    {
      question: 'Can I use ComplyAI for multiple compliance frameworks?',
      answer: 'Yes, ComplyAI supports multiple compliance frameworks including ISO 27001, SOC 2, GDPR, HIPAA, and PCI DSS. The number of frameworks you can access depends on your subscription plan.'
    },
    {
      question: 'How do I invite team members to my account?',
      answer: 'You can invite team members by going to the "Team" section in your dashboard, then clicking "Invite Members" and entering their email addresses and assigned roles.'
    },
    {
      question: 'What are the system requirements for using ComplyAI?',
      answer: 'ComplyAI is a cloud-based solution that works in modern web browsers including Chrome, Firefox, Safari, and Edge. There are no specific hardware requirements or software installations needed.'
    },
    {
      question: 'How often is ComplyAI updated?',
      answer: 'We continuously improve our platform with regular updates. Major updates are typically released monthly, while minor improvements and bug fixes are deployed weekly. All updates are performed without service interruption.'
    }
  ];
  
  return (
    <PublicPageLayout>
      <div className="pt-14 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
              Support & Help Center
            </h1>
            <p className="text-xl text-gray-400">
              We're here to help you get the most out of ComplyAI.
            </p>
          </div>
          
          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <SupportChannelCard
              icon={MessageSquare}
              title="Live Chat"
              description="Chat with our support team during business hours for immediate assistance."
              action="Start Chat"
              onClick={() => alert('Live chat would launch here')}
            />
            
            <SupportChannelCard
              icon={Mail}
              title="Email Support"
              description="Send us an email and we'll respond within 24 hours on business days."
              action="support@complyai.com"
              isEmail={true}
            />
            
            <SupportChannelCard
              icon={Phone}
              title="Phone Support"
              description="Available for Enterprise customers with priority support plans."
              action="+1 (888) 555-0123"
              isPhone={true}
            />
          </div>
          
          {/* Resources Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-10">Self-Help Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard
                icon={Book}
                title="Documentation"
                description="Comprehensive guides for all ComplyAI features and workflows."
                link="/documentation"
                linkText="Browse Documentation"
              />
              
              <ResourceCard
                icon={FileText}
                title="Knowledge Base"
                description="Searchable articles covering common questions and troubleshooting."
                link="/blog"
                linkText="Search Articles"
              />
              
              <ResourceCard
                icon={HelpCircle}
                title="Video Tutorials"
                description="Step-by-step video guides for getting started and advanced features."
                link="/documentation"
                linkText="Watch Tutorials"
              />
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl overflow-hidden">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className={`p-6 ${index !== faqItems.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <h3 className="text-xl font-medium text-white mb-2">{item.question}</h3>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-400 mb-6">
                Have a question or need assistance? Fill out the form and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1d1d1f] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1d1d1f] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1d1d1f] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-[#1d1d1f] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Support Promise</h2>
              
              <div className="space-y-6">
                <p className="text-gray-400">
                  At ComplyAI, we're committed to providing exceptional customer support. Our team of compliance and technical experts is here to assist you every step of the way.
                </p>
                
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <p className="text-gray-400 italic">
                    "We aim to respond to all support inquiries within 24 hours, and for our Enterprise customers, we offer guaranteed response times as fast as 2 hours."
                  </p>
                </div>
                
                <p className="text-gray-400">
                  Our support team is available Monday through Friday, 9am to 6pm Eastern Time (ET). For urgent issues outside these hours, Enterprise customers can access our emergency support line.
                </p>
                
                <div className="bg-blue-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Enterprise Support</h3>
                  <p className="text-gray-400">
                    Enterprise plans include dedicated account managers, priority support, and guaranteed response times. Contact our sales team to learn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

const SupportChannelCard = ({ icon: Icon, title, description, action, onClick, isEmail, isPhone }) => {
  return (
    <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      {isEmail ? (
        <a href={`mailto:${action}`} className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
          {action}
        </a>
      ) : isPhone ? (
        <a href={`tel:${action.replace(/\D/g, '')}`} className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
          {action}
        </a>
      ) : (
        <Button
          variant="outline"
          onClick={onClick}
          className="w-full"
        >
          {action}
        </Button>
      )}
    </div>
  );
};

const ResourceCard = ({ icon: Icon, title, description, link, linkText }) => {
  return (
    <div className="bg-[#1d1d1f] border border-gray-800 rounded-xl p-6 flex flex-col h-full">
      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      <a 
        href={link}
        className="text-blue-400 font-medium hover:text-blue-300 transition-colors flex items-center"
      >
        {linkText}
        <Send className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default Support;
