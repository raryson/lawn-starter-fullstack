import './OpeningCrawlSection.css'

interface OpeningCrawlSectionProps {
  openingCrawl: string
}

export function OpeningCrawlSection({ openingCrawl }: OpeningCrawlSectionProps) {
  const paragraphs = openingCrawl
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0)

  return (
    <div>
      <h2 className="opening-crawl-heading font-semibold text-gray-900">Opening Crawl</h2>
      <div className="space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No opening crawl available</p>
        )}
      </div>
    </div>
  )
}

