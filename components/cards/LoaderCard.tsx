interface ILoaderCard {
  length: number
}
const LoaderCard: React.FC<ILoaderCard> = ({ length }) => {
  let content = []
  for (let i = 0; i < length; i++) {
    content.push(
      <div className="w-full animate-pulse rounded-sm bg-neutral-200 p-2 shadow-sm">
        <div className="relative mb-2 h-52 w-full rounded-md bg-neutral-300" />
        <div className="space-y-1">
          <div className="h-5 bg-neutral-300" />
          <div className="h-3 w-1/2 bg-neutral-300" />
          <div className="h-2 w-1/3 bg-neutral-300" />
          <div className="ml-auto h-8 w-1/2 bg-neutral-300" />
        </div>
      </div>
    )
  }
  return <>{content}</>
}

export default LoaderCard
