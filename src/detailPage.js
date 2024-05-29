import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import LoadingSpinner from './components/loadingSpinner'

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
const DetailPage = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details')
        }
        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        console.error('Error fetching Pokémon details:', error)
      }
    }

    fetchPokemonDetail()
  }, [id])

  if (!pokemon) {
    return <LoadingSpinner />
  }

  const nextPokemonId = parseInt(id) + 1
  const prevPokemonId = parseInt(id) - 1

  const handleNavigation = (newId) => {
    navigate(`/detail/${newId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="flex flex-row items-center gap-1 bg-purple-400 w-[150px] px-2 py-1 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
          <path strokelinecap="round" strokelinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <p  className="text-white">Back to Home</p>
      </Link>
      <div className="flex justify-center items-center">
        <div className="bg-gradient-to-r from-purple-200 via-purple-300 to-pink-100 lg:w-[800px] w-screen lg:h-[500px] h-screen lg:p-5 p-0 rounded-xl flex lg:flex-row flex-col lg:gap-0 gap-6 items-center justify-center mt-8">
          <div className="lg:w-1/3 w-full lg:px-auto px-8 flex flex-col items-center">
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-40 h-40" />
          </div>
          <div className="lg:w-2/3 w-full lg:p-auto p-8 flex flex-col items-center justify-center">
            <div className="bg-purple-400 w-full p-1 flex flex-row justify-between items-center rounded-lg">
              <div className="flex gap-2 items-center justify-center">
               <button onClick={() => handleNavigation(prevPokemonId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokelinecap="round" strokelinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-5 h-5" />
                <p className="text-lg font-bold capitalize text-center">No. {pokemon.id}</p>
              </div>
              <p className="text-lg font-bold capitalize text-center">{pokemon.name}</p>
              <button onClick={() => handleNavigation(nextPokemonId)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            <div className="lg:mt-4 mt-2 bg-purple-400 w-full p-1 flex flex-row justify-center items-center">
              <p className="text-lg font-bold capitalize text-center">Pokemon Detail</p>
            </div>
            <div className="mt-[2px] bg-purple-400 w-full p-1 flex flex-row gap-5 justify-center items-center">
              <div className="flex flex-col gap-1 text-md">
                <p>Type</p>
                <p>Height</p>
                <p>Weight</p>
                <p>Number Battled</p>
              </div>
              <div className="flex flex-col gap-1 text-md">
                <div className="flex flex-row gap-2">
                  {pokemon.types.map(({ type }) => (
                    <p key={type.name} className={`text-neutral-200 text-sm px-3 py-1 rounded-xl ${typeColors[type.name]}`}>
                      {type.name}
                    </p>
                  ))}
                </div>
                <p>{pokemon.height}</p>
                <p>{pokemon.weight}</p>
                <p>{pokemon.base_experience}</p>
              </div>
            </div>
            <div className="mt-[2px] bg-purple-400 w-full p-1 flex flex-col gap-2 justify-center items-center">
              <h2 className="text-lg font-semibold mb-2">Abilities</h2>
              <ul>
                {pokemon.abilities.map(({ ability }) => (
                  <li key={ability.name} className="capitalize text-md">•{ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
