import { Rating } from "@smastrom/react-rating";

const floatValues = [4.52, 3.48, 2.31, 1.44, 0.29];

export default function FullRating() {
  return (
    <div className="mx-auto flex gap-5">
      <div style={{ maxWidth: 180, width: '100%' }}>
        {floatValues.map((value) => (
          <Rating readOnly value={value} key={value} />
        ))}
      </div>
      <Rating
        style={{ maxWidth: 30 }}
        
        orientation="vertical"
        value={4.52}
      />
    </div>
  )
}


