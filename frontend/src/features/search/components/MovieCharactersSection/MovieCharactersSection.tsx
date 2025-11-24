import './MovieCharactersSection.css'

interface Character {
  uid: string
  name: string
}

interface MovieCharactersSectionProps {
  characters: Character[] | undefined
  isLoading?: boolean
  onCharacterClick: (uid: string) => void
}

export function MovieCharactersSection({
  characters,
  isLoading = false,
  onCharacterClick,
}: MovieCharactersSectionProps) {
  return (
    <div className="movie-characters-section">
      <h2 className="movie-characters-heading font-semibold text-gray-900">Characters</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading characters...</p>
      ) : characters && characters.length > 0 ? (
        <div className="characters-list">
          {characters.map((character, index) => (
            <span key={character.uid}>
              <button
                onClick={() => onCharacterClick(character.uid)}
                className="character-link"
              >
                {character.name}
              </button>
              {index < characters.length - 1 && <span className="character-separator">, </span>}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No characters found</p>
      )}
    </div>
  )
}

