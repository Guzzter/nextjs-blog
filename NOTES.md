# Todo

- [ ] Deploy Vercel, Public access
- [ ] Open graph improvements (Twitter)
- [ ] Bio page with socials
- [ ] Move feature flag from config to Vercel Flag

# Resources

- https://nextjs.org/learn
- https://vercel.com/academy/nextjs-foundations
- https://github.com/vercel/nextjs-foundations-starter
- https://www.notion.so/vercel/Vercel-Solution-Partner-Certification-FAQ-278e06b059c480af87dcfeaed80c0f21
- https://vercel.notion.site/Vercel-Solution-Partner-Certification-Q1-CY-2026-Cohort-Onboarding-Brief-30be06b059c480219913d8dc6bca4149

# Eval

- Caching Strategy - Appropriate use of "use cache", cacheLife, and cacheTag. Knowing what to cache vs. what to keep dynamic.
- Component Architecture - Correct Server/Client Component boundaries. Minimal and intentional use of "use client".
- Suspense & Streaming - Proper use of <Suspense> boundaries, loading states, and fallback UI for dynamic content.
- Server Actions & Forms - Mutations handled via Server Actions. Proper form handling patterns.
- Metadata & SEO - Root and page-level metadata. Dynamic metadata via generateMetadata. Open Graph implementation.
- Data Fetching Patterns - Parallel fetching, dynamic routing, generateStaticParams, and proper 404 handling.
- Code Quality & Polish - Clean code, responsive design, error boundaries, and a functional end-to-end experience.
- 1:1 Validation Session - A validation session may be scheduled after submission to walk through your code and discuss your architectural decisions.

### Knowing What to Cache vs. What to Keep Dynamic

To nail the certification, you need to show you understand the boundary between shared global data and user-specific request data.

#### ✅ What to CACHE (Static/Shared)
*   **Marketing Pages & Blog Articles:** Content that looks exactly the same regardless of who is logged in.
*   **Navigation Menus & Footers:** Global UI elements.
*   **Aggregated Data:** "Top 10 Most Read Articles of the Week" (expensive to calculate, safe to cache for an hour).
*   **Product Catalogs:** E-commerce listings.

#### ⚡ What to KEEP DYNAMIC (Request-Time)
Dynamic rendering happens automatically when you read request-specific information (like `cookies()`, `headers()`, or `searchParams`). **Do not use `"use cache"` here.**
*   **User Sessions & Auth:** Checking if a user has a premium subscription to read a paywalled article.
*   **Shopping Carts & Checkouts:** Highly personalized state.
*   **Search Results:** If the user is passing `?q=nextjs`, the results are specific to that query.
*   **A/B Tests based on Headers:** If you are checking `headers().get('user-agent')` to serve different layouts.

### Pro-Tip for the Validation Session
During your 1:1, if they ask about your architecture, mention the **"Partial Prerendering" (PPR)** mindset: 
*Wrap your dynamic, user-specific pieces (like a "Log In / Avatar" button or a "Paywall Check") in a `<Suspense>` boundary. Cache the outer shell of the page heavily with `"use cache"`, and let the dynamic components resolve at request time.*