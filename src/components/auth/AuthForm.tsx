
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../common/Button';
import { FadeIn } from '../common/Transitions';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  initialMode?: AuthMode;
}

export default function AuthForm({ initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'register') {
        // Parse name into first and last name
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Create metadata object combining user profile data and additional metadata
        const userData = {
          first_name: firstName,
          last_name: lastName,
          email,
          company_name: companyName // Include company_name in the metadata
        };
        
        await signUp(email, password, userData);
        toast.success("Account created successfully!");
      } else {
        await signIn(email, password);
        toast.success("Login successful!");
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FadeIn className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'register' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#1e1e1e]/80 border-gray-800 text-white focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-300">
                Company Name
              </Label>
              <Input
                id="company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-[#1e1e1e]/80 border-gray-800 text-white focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Acme Inc"
                required
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1e1e1e]/80 border-gray-800 text-white focus:border-blue-500 focus:ring-blue-500/20"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#1e1e1e]/80 border-gray-800 text-white focus:border-blue-500 focus:ring-blue-500/20"
            placeholder="••••••••••••"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
          size="lg"
          isLoading={isLoading}
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-1 text-blue-400 hover:text-blue-300 font-medium focus:outline-none"
              type="button"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </form>
    </FadeIn>
  );
}
