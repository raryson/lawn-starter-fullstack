interface Character {
  uid: string
  name: string
}

interface MovieCharactersSectionProps {
  characters: Character[]
  onCharacterClick: (uid: string) => void
}

export function MovieCharactersSection({
  characters,
  onCharacterClick,
}: MovieCharactersSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Characters</h2>
      {characters.length > 0 ? (
        <div className="space-y-2">
          {characters.map((character) => (
            <button
              key={character.uid}
              onClick={() => onCharacterClick(character.uid)}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer block text-left w-full"
            >
              {character.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No characters found</p>
      )}
    </div>
  )
}

