const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 z-[1000] grid place-items-center bg-black/30">
      <p className="animate-pulse text-3xl font-bold">Loading...</p>
    </div>
  )
}

export default Loader
