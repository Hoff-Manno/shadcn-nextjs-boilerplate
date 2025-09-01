import { NextRequest, NextResponse } from 'next/server';

// Demo webhook endpoint for development - bypasses Stripe/Supabase
export async function POST(req: NextRequest) {
  // Check if we're in demo mode (missing Supabase environment variables)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Demo mode: Webhook endpoint called but no processing performed');
    return NextResponse.json({ 
      received: true,
      demo: true,
      message: 'Demo webhook endpoint - no actual processing' 
    });
  }

  // If we had real Stripe/Supabase setup, this would handle the webhook
  return NextResponse.json({ 
    received: true,
    message: 'Webhook processed' 
  });
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Webhook endpoint active',
    demo: !process.env.NEXT_PUBLIC_SUPABASE_URL,
    timestamp: new Date().toISOString()
  });
}
