import { timeAgo } from "@/app/layout";
import { Rating } from "@/components/Rating";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/prisma"
import ReactTimeAgo from 'react-time-ago'
import { Rating as ReactRating } from '@smastrom/react-rating'


export default async function RentReviews({ rentId }: { rentId: number }) {

  return await prisma.review.findMany({
    where: {
      reviewableId: rentId,
      reviewableType: "Rent"
    },
    include: {
      user: {
        select: {
          // ~TODO: Maybe a picture eventually.
          name: true,
        }
      }
    }
  }).then(reviews => {
    const totalReviews = reviews.length;

    const ratingCounts = reviews.reduce((counts, review) => {
      counts[review.rating - 1] += 1;
      return counts;
    }, [0, 0, 0, 0, 0]);

    const ratingPercentages = ratingCounts.map(count => (count / totalReviews) * 100);

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return (
      <>
        <div className="flex h-20 mb-5">
          <div className="w-3/12 flex flex-col justify-center items-center">
            <p className="text-5xl m-auto">{averageRating.toFixed(1)}</p>
            <ReactRating style={{ maxWidth: 100 }} value={averageRating} readOnly />
            <p className="text-[11px] pt-1">{totalReviews} Cal.</p>
          </div>
          <div className="h-full w-1/12 text-xs text-right mr-2">
            <p>5</p>
            <p>4</p>
            <p>3</p>
            <p>2</p>
            <p>1</p>
          </div>
          <div className="flex flex-col gap-2 pt-1 w-8/12">
            <Progress className="h-3" value={ratingPercentages[4]} />
            <Progress className="h-3" value={ratingPercentages[3]} />
            <Progress className="h-3" value={ratingPercentages[2]} />
            <Progress className="h-3" value={ratingPercentages[1]} />
            <Progress className="h-3" value={ratingPercentages[0]} />
          </div>
        </div>

        <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

        <h3 className='text-2xl font-semibold py-5'>Opiniones</h3>
        <div className="p-y-5">
          {reviews.map((review, index) => (
            <div key={index}>
              <p className='font-semibold'>{review.user.name}</p>
              <p className='text-sm font-light'>{timeAgo.format(review.createdAt)}</p>
              <ReactRating style={{ maxWidth: 100 }} value={review.rating} readOnly />
              <p className='py-1'>{review.comment}</p>
            </div>
            // <>
            // </>
          ))}
        </div>
      </>
    )
  }).catch(e => {
    return <p>There was a problem loading the Reviews.</p>
  })


}