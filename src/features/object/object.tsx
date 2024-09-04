import type { CustomObject } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'



export default function ObjectPage({ object }: { object: CustomObject }) {
  return (
    <div className='h-screen w-screen'>
      <div className='absolute left-5 top-5 bg-white rounded-full p-0.5 shadow-xl'>
        <ArrowLeft size={42} strokeWidth={1} />
      </div>
      <div className='h-'>
        <Image
          className='mx-auto '
          src={object.image || ''}
          alt={object.title || 'Image not found'}
          width={360}
          height={600}
          style={{ objectFit: "fill", width: '100vh' }}
        />
      </div>
      <div className='flex flex-col justify-center items-center py-5'>
        <h1 className='font-semibold text-2xl'>{object.title}</h1>
        <h2 className='text-gray-500'>{object.subtitle}</h2>
      </div>
      <hr className='mx-auto w-10/12 bg-gray-200 h-0.5'></hr>
      <div>
        <p className='p-7 text-base '>
          {object.description}
        </p>
      </div>
      <hr className='mx-auto w-10/12 bg-gray-200 h-0.5'></hr>
      <div className='pb-5'>
        <h3 title='details' className='p-7 font-semibold text-xl'>Detalles</h3>
        {object.details?.map((detail) => (
          <div key={detail.key} className='grid grid-cols-3 px-8 text-sm py-1 gap-5'>
            <p className='font-semibold w-24 text-pretty'>{detail.key}</p><p className='w-full col-span-2'>{detail.value}</p>
          </div>
        ))}
      </div>
      <hr className='mx-auto w-10/12 bg-gray-200 h-0.5'></hr>
      <div className='p-8'>
        <h3 className='font-semibold text-xl mb-4'>Frequent Questions</h3>
        <Accordion type='single' collapsible>
          {object.frequentQuestions?.map(({id, question, answer}, index) => (
           <AccordionItem key={id}
           value={`item-${id}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                {answer}
              </AccordionContent>
           </AccordionItem> 
          ))}
        </Accordion>
      </div>
    </div>
  )
}