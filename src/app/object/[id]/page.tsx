import Link from 'next/link'
import Image from 'next/image'

const pasorobao="/images/paso_robao.jpg"

export async function generateStaticParams() {
  // fetch here. (Remember the try catch block for the fetch and .json())
  // const object = await fetch(...)

  // return...
}

// This component will retrieve the object details.
export default function Object() {
  return (
    <div>
      <h1>Object</h1>
      <Link href="/about">About</Link>
      <Image
        src={pasorobao}
        alt="Object Image"
        width={800}
        height={540}
      />
    </div>
  )
}