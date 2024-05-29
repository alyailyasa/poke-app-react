const LoadingSpinner = () => (
  <div className="flex flex-col gap-2 items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <p>Loading...</p>
  </div>
)

export default LoadingSpinner
