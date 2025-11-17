import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CTASectionProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage: string
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage,
}: CTASectionProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={backgroundImage || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/95" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <Heart className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8 opacity-90 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButtonLink}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {primaryButtonText}
            </Button>
          </Link>
          <Link href={secondaryButtonLink}>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {secondaryButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
