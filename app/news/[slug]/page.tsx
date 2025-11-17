'use client'

import { getArticle } from '@/lib/articles'
import { ArticleAQIDisplay } from '@/components/article-aqi-display'
import { PollutantsDisplay } from '@/components/pollutants-display'
import { CommentsSection } from '@/components/comments-section'
import { RecentArticlesWidget } from '@/components/recent-articles-widget'
import { RelatedArticlesWidget } from '@/components/related-articles-widget'
import { HeaderNav } from '@/components/header-nav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNav />
        <div className="max-w-6xl mx-auto px-6 py-32">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">{article.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight">{article.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground text-sm">
            <span>By {article.author}</span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date(article.date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AQI Display */}
            <ArticleAQIDisplay
              score={article.aqiScore}
              category={article.aqiCategory}
              location={article.location}
              date={article.date}
            />

            {/* Article content */}
            <div className="prose prose-invert dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {article.content}
              </div>
            </div>

            {/* Pollutants */}
            <PollutantsDisplay pollutants={article.keyPollutants} />

            {/* Comments section */}
            <div className="py-8 border-t border-border">
              <CommentsSection />
            </div>
          </div>

          {/* Right column - Sidebar */}
          <aside className="space-y-6">
            {/* Related articles */}
            <RelatedArticlesWidget tags={article.tags} excludeSlug={article.slug} />

            {/* Recent articles */}
            <RecentArticlesWidget excludeSlug={article.slug} />
          </aside>
        </div>
      </main>
    </div>
  )
}
