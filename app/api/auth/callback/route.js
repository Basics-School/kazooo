import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    requestUrl.pathname = '/dashboard'
    requestUrl.searchParams.delete('code')
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${process.env.NEXT_URL}/dashboard`)
}