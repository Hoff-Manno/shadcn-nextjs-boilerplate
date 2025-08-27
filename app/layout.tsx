import SupabaseProvider from './supabase-provider';
import { PropsWithChildren } from 'react';
import '@/styles/globals.css';
import '@/styles/racing-theme.css';
import { ThemeProvider } from './theme-provider';

export const dynamic = 'force-dynamic';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>
          ASD Motorsports - Sponsorship Analytics Dashboard | Real-time ROI Tracking & Performance Insights
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!--  Social tags   --> */}
        <meta
          name="keywords"
          content="motorsports, racing, sponsorship analytics, ROI tracking, computer vision, social media sentiment, ASD motorsports, late model racing"
        />
        <meta name="description" content="Advanced sponsorship analytics dashboard for ASD Motorsports featuring real-time ROI tracking, computer vision logo detection, social media sentiment analysis, and comprehensive performance insights." />
        {/* <!-- Schema.org markup for Google+ --> */}
        <meta itemProp="name" content="ASD Motorsports - Sponsorship Analytics Dashboard" />
        <meta
          itemProp="description"
          content="Advanced sponsorship analytics dashboard for ASD Motorsports featuring real-time ROI tracking, computer vision logo detection, social media sentiment analysis, and comprehensive performance insights."
        />
        <meta
          itemProp="image"
          content="Add here the link for your website SEO image"
        />
        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="product" />
        <meta
          name="twitter:title"
          content="ASD Motorsports - Sponsorship Analytics Dashboard"
        />
        <meta
          name="twitter:description"
          content="Advanced sponsorship analytics dashboard featuring real-time ROI tracking, computer vision, and social media sentiment analysis for motorsports."
        />
        <meta
          name="twitter:image"
          content="Add here the link for your website SEO image"
        />
        {/* <!-- Open Graph data --> */}
        <meta
          property="og:title"
          content="ASD Motorsports - Sponsorship Analytics Dashboard"
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://your-website.com" />
        <meta
          property="og:image"
          content="Add here the link for your website SEO image"
        />
        <meta
          property="og:description"
          content="Advanced sponsorship analytics dashboard for ASD Motorsports featuring real-time ROI tracking, computer vision logo detection, social media sentiment analysis, and comprehensive performance insights."
        />
        <meta
          property="og:site_name"
          content="ASD Motorsports Analytics"
        />
        <link rel="canonical" href="https://your-website.com" />
        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body id={'root'} className="loading bg-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseProvider>
            <main id="skip">{children}</main>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
