// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// export const dynamic = "force-dynamic";

// export async function GET(request: NextRequest) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");

//   if (code) {
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
//     const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//     const supabase = createClient(supabaseUrl, supabaseKey);

//     const { data, error } = await supabase.auth.exchangeCodeForSession(code);

//     if (error || !data.session) {
//       return NextResponse.redirect(
//         new URL("/auth/login?error=true", request.url)
//       );
//     }

//     const { user, access_token } = data.session;

//     // ✅ Create a Supabase client *with the user's token* for RLS to work
//     const supabaseWithAuth = createClient(supabaseUrl, supabaseKey, {
//       global: {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       },
//     });

//     // ✅ Now RLS policies will apply correctly
//     await supabaseWithAuth.from("profiles").upsert({
//       id: user.id,
//       full_name: user.user_metadata.full_name || "",
//       avatar_url: user.user_metadata.avatar_url || "",
//     });
//   }

//   return NextResponse.redirect(new URL("/dashboard", request.url));
// }

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      return NextResponse.redirect(
        new URL("/auth/login?error=true", request.url)
      );
    }

    const user = data.session.user;

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingProfile) {
      await supabase.from("profiles").insert({
        id: user.id,
        full_name: user.user_metadata.full_name || "",
        avatar_url: user.user_metadata.avatar_url || "",
      });
    }
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
