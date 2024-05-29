const typeColors = {
  fire: 'bg-orange-500',
  grass: 'bg-green-500',
  dark: 'bg-yellow-900',
  water: 'bg-blue-500',
  bug: 'bg-yellow-600',
  flying: 'bg-red-500',
  poison: 'bg-purple-600',
  normal: 'bg-yellow-300',
  fairy: 'bg-pink-400',
  ground: 'bg-neutral-600',
  electric: 'bg-red-400',
  fighting: 'bg-red-800'
}
  
const PokemonSearch = ({ searchInput, setSearchInput, selectedType, setSelectedType }) => {
  const sortedOption = Object.keys(typeColors).sort()

  return (
    <div className="lg:mt-24 mt-10 flex lg:flex-row flex-col-reverse gap-3 justify-end lg:items-center items-end lg:text-[14px] text-[12px]">
      <div className="relative">
        <select
          className="rounded-lg px-3 lg:py-2 py-1.5 lg:w-[130px] w-auto border border-[#d67eff] text-gray-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option className="text-purple-600" value="">All Types</option>
          {sortedOption.map(type => (
            <option className="text-purple-600" key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <input
          className="rounded-lg px-3 lg:py-2 py-1 lg:w-[300px] w-auto border border-[#d67eff] pr-10"
          placeholder="Search pokemon"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="lg:w-5 w-3 lg:h-5 h-3 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  )
}

export default PokemonSearch
  