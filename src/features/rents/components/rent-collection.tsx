import RentPhoto from "./rent-photo";


export default async function RentCollection({ collection }: { collection: string[] }) {
  return (
    <div className='flex'>
      {collection.map((url, index) => (
        <div key={index} className='w-1/3 aspect-square border relative'>
          <RentPhoto image={url} />
        </div>
      ))}
    </div>
  )
}