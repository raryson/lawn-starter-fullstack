interface OpeningCrawlSectionProps {
  openingCrawl: string
}

export function OpeningCrawlSection({ openingCrawl }: OpeningCrawlSectionProps) {
  // Split opening crawl into paragraphs (usually separated by double newlines)
  const paragraphs = openingCrawl
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0)

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Opening Crawl</h2>
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

