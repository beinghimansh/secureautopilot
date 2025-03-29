
import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

const MessageCarousel = () => {
  const messages = [
    {
      id: 1,
      title: "60% of SMBs and Startups Struggle with Compliance—Don't Be One of Them!",
      content: "Compliance is tough. But not anymore. Meet ComplyAI—the first AI-powered compliance platform built for startups. Focus on growing your business while we handle your Compliance. Stay Complaint, stay Trusted!",
      color: "from-blue-600 to-violet-600",
      icon: <MessageSquareQuote className="h-8 w-8 text-blue-300" />
    },
    {
      id: 2,
      title: "AI-Powered Compliance for Startups – Because Security & Trust Matter!",
      content: "90% of businesses face compliance roadblocks that slow them down. We fix that. With ComplyAI, automate policy generation, control mapping, and audits effortlessly—so you stay compliant and YOU keep focusing on what you do best.",
      color: "from-purple-600 to-pink-600",
      icon: <MessageSquareQuote className="h-8 w-8 text-purple-300" />
    },
    {
      id: 3,
      title: "Who Doesn't Love Being Certified & Earning Customer Trust? 🎯",
      content: "Most startups struggle with security & compliance, losing deals and trust. Not anymore! With ComplyAI, get audit-ready in days, not months. Automate policies, map controls, and meet regulatory standards effortlessly—so you can win more customers and stay secure without the hassle.",
      color: "from-green-600 to-teal-600",
      icon: <MessageSquareQuote className="h-8 w-8 text-green-300" />
    },
    {
      id: 4,
      title: "Compliance is Hard. We Make it Effortless with AI & Automation! 🤖⚡",
      content: "Startups & SMBs often fail compliance audits—not because they don't care, but because it's complex and time-consuming. ComplyAI simplifies it all with AI-driven policy automation, real-time risk tracking, and seamless certification readiness. Stay compliant, gain trust, and scale faster!",
      color: "from-orange-500 to-red-600",
      icon: <MessageSquareQuote className="h-8 w-8 text-orange-300" />
    }
  ];
  
  return (
    <section className="py-10 bg-gradient-to-br from-[#111] to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Startups Choose ComplyAI</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join hundreds of innovative companies streamlining their compliance journey
          </p>
        </motion.div>
        
        <div className="relative mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message) => (
                <CarouselItem key={message.id}>
                  <motion.div 
                    className={`bg-gradient-to-r ${message.color} p-8 rounded-2xl shadow-xl`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start mb-4">
                      {message.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{message.title}</h3>
                    <p className="text-white/90 text-lg">{message.content}</p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-none">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-none">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full bg-white/50 transition-all duration-300 ${
                  index === 0 ? "w-6 bg-white" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageCarousel;
