import { Link } from 'react-router-dom'

const typeColors = {
  fire: 'bg-orange-500',
  grass: 'bg-green-500',
  dark: 'bg-yellow-900',
  water: 'bg-blue-500',
  bug: 'bg-yellow-600',
  flying: 'bg-red-500',
  poison: 'bg-purple-600',
  normal: 'bg-yellow-400',
  fairy: 'bg-pink-400',
  ground: 'bg-neutral-600',
  electric: 'bg-red-400',
  fighting: 'bg-red-800'
}

const PokemonCard = ({ pokemon }) => (
  <Link to={`/detail/${pokemon.id}`}>
    <div className="border border-[#d67eff] shadow-md hover:shadow-lg transition flex flex-col">
      <div className="flex justify-center items-center mb-4">
        <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20" />
      </div>
      <h3 className="text-lg font-semibold capitalize p-4">{pokemon.name}</h3>
      <div className="bg-[#d67eff] flex flex-row gap-2 justify-center p-1">
        {pokemon.types.map((type) => (
          <span key={type} className={`text-neutral-200 text-sm px-3 py-0 rounded-xl ${typeColors[type]}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  </Link>
)

export default PokemonCard
