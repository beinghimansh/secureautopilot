
// This is a client-side API route for invoking the Supabase Edge Function
export async function POST(request: Request) {
  const { text, voiceId, model } = await request.json();
  
  try {
    const response = await fetch(
      'https://kqccayfzcxuadkzohgzs.supabase.co/functions/v1/text-to-speech',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ text, voiceId, model }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({ success: false, error: errorData.error || 'Failed to generate speech' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calling text-to-speech function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
