import { useState, useEffect } from 'react'
import PokemonCard from './components/pokemonCard'
import PokemonSearch from './components/pokemonSearch'
import LoadingSpinner from './components/loadingSpinner'

const HomePage = () => {
  const [pokemons, setPokemons] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60&offset=0")
        if (!res.ok) throw new Error('Failed to fetch data')

        const data = await res.json()

        const detailedPokemons = await Promise.all(data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          if (!res.ok) throw new Error('Failed to fetch data')

          const details = await res.json()
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            id: details.id,
            types: details.types.map(typeInfo => typeInfo.type.name),
          }
        }))

        setPokemons(detailedPokemons)
      } catch (error) {
        console.error('Error fetching Pokémon details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
    const matchesType = selectedType === '' || pokemon.types.includes(selectedType)
    return matchesName && matchesType
  })

  return (
    <div className="container mx-auto lg:p-[60px] md:p-[40px] sm:p-[30px] p-[20px]">
      <h1 className="lg:text-4xl text-xl font-bold mb-8 text-center">Pokemon App</h1>
      <PokemonSearch 
        searchInput={searchInput} 
        setSearchInput={setSearchInput} 
        selectedType={selectedType} 
        setSelectedType={setSelectedType} 
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage