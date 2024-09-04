// import prisma from '@/lib/prisma'
import { connect } from 'http2';
import prisma from '../src/client';

export async function seedReviews() {
  const reviews = await prisma.review.create({
    data:
    {
      rating: 5,
      comment: 'Great Product! I really enjoyed using this product. Highly recommend!',
      user: {
        connect: {
          id: 1
        }
      },
      rent: {
        connect: {
          id: 1
        }
      },
      reviewableId: 1,
      reviewableType: 'Rent'
    },

  })


  console.log('New entry created:', reviews);
}