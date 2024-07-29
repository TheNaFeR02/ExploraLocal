import Link from 'next/link'
import Image from 'next/image'

const pasorobao="/images/paso_robao.jpg"

export default function Home() {


  return (
    <div>
      <h1>Home</h1>
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