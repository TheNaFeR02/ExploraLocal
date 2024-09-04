import Image from 'next/image'


export default function RentPhoto({ image }: { image: string }) {
  console.log(image)
  return (
    <div className="relative w-full h-full">
      <Image src={image}
        alt={"image"}
        fill
        // TODO: sizes={'(max-width: 768px) 100vw'} // sizes should be implemented when using fill for optimization: https://nextjs.org/docs/app/api-reference/components/image#sizes
      />
    </div>
  )
}