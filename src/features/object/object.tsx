import type { CustomObject, Object } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Image from 'next/image'
// import '@/types/prisma-extensions'

export default function ObjectPage({ object }: { object: CustomObject }) {
  return (
    <div className='h-screen w-screen'>
      <div className='absolute left-5 top-5 bg-white rounded-full p-0.5 shadow-xl'>
        <ArrowLeft size={42} strokeWidth={1} />
      </div>
      <div>
        {/* <div className='border border-black mx-auto'> */}
        <Image
          className='mx-auto'
          src={object.image || ''}
          alt={object.title || 'Image not found'}
          width={260}
          height={480}
          style={{ objectFit: "fill" }}
        />
        {/* </div> */}
      </div>
      <div className='flex flex-col justify-center items-center py-5'>
        <h1 className='font-semibold text-2xl'>{object.title}</h1>
        <h2 className='text-gray-500'>{object.subtitle}</h2>
      </div>
      <hr className='mx-auto w-10/12 bg-gray-200 h-0.5'></hr>
      <div>
        <p className='p-7 text-base'>
          {object.description}
        </p>
      </div>
      <hr className='mx-auto w-10/12 bg-gray-200 h-0.5'></hr>
      <div>
        <h3 className='p-7 font-semibold text-xl'>Detalles</h3>
        {object.details.map((detail) => (
          <div key={detail.id} className='flex px-8 py-2 text-sm '>
            <p className='font-semibold w-24'>{detail.key}</p>
            <p className=''>{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}