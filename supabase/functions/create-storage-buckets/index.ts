
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    // Create voice-summaries bucket (public)
    await supabase.storage.createBucket('voice-summaries', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    
    // Create voice-training bucket (public)
    await supabase.storage.createBucket('voice-training', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Storage buckets created successfully" 
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error creating storage buckets:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
