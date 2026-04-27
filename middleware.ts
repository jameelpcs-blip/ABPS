import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env, hasPublicSupabaseConfig } from "@/lib/env";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_PAGES = ["/login"];
type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  if (!hasPublicSupabaseConfig()) {
    return response;
  }

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const needsAuth = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (needsAuth && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
};
