import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ObjectScalarFieldEnumSchema = z.enum(['id','slug','image','title','subtitle','description','createdAt']);

export const FrequentQuestionScalarFieldEnumSchema = z.enum(['id','question','answer','objectId']);

export const DetailScalarFieldEnumSchema = z.enum(['id','key','value','objectId']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','createdAt','updatedAt']);

export const RentScalarFieldEnumSchema = z.enum(['id','name','price','profile_photo','slug','department','city','hostId','description','collection','rules','type','capacity','createdAt','updatedAt']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','icon','name']);

export const RoomScalarFieldEnumSchema = z.enum(['id','rentId','name','single_bed','queen_bed','king_bed','capacity','price','description','photos','rules','createdAt','updatedAt']);

export const ReviewScalarFieldEnumSchema = z.enum(['id','rating','comment','userId','reviewableId','reviewableType','createdAt','updatedAt','objectId','rentId']);

export const RentBookingScalarFieldEnumSchema = z.enum(['id','from','to','userId','rentId','roomId','status','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RentTypeSchema = z.enum(['HOTEL','APARTMENT','PENSION']);

export type RentTypeType = `${z.infer<typeof RentTypeSchema>}`

export const BookingStatusSchema = z.enum(['PENDING','CONFIRMED','CANCELLED']);

export type BookingStatusType = `${z.infer<typeof BookingStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// OBJECT SCHEMA
/////////////////////////////////////////

export const ObjectSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  image: z.string().nullable(),
  title: z.string(),
  subtitle: z.string().nullable(),
  description: z.string(),
  createdAt: z.coerce.date(),
})

export type Object = z.infer<typeof ObjectSchema>

/////////////////////////////////////////
// FREQUENT QUESTION SCHEMA
/////////////////////////////////////////

export const FrequentQuestionSchema = z.object({
  id: z.number().int(),
  question: z.string(),
  answer: z.string(),
  objectId: z.number().int(),
})

export type FrequentQuestion = z.infer<typeof FrequentQuestionSchema>

/////////////////////////////////////////
// DETAIL SCHEMA
/////////////////////////////////////////

export const DetailSchema = z.object({
  id: z.number().int(),
  key: z.string(),
  value: z.string(),
  objectId: z.number().int(),
})

export type Detail = z.infer<typeof DetailSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// RENT SCHEMA
/////////////////////////////////////////

export const RentSchema = z.object({
  type: RentTypeSchema,
  id: z.number().int(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string(),
  city: z.string(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.string().array(),
  rules: z.string().array(),
  capacity: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Rent = z.infer<typeof RentSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.number().int(),
  icon: z.string().nullable(),
  name: z.string(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// ROOM SCHEMA
/////////////////////////////////////////

export const RoomSchema = z.object({
  id: z.number().int(),
  rentId: z.number().int(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().nullable(),
  photos: z.string().array(),
  rules: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Room = z.infer<typeof RoomSchema>

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
  id: z.number().int(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  objectId: z.number().int().nullable(),
  rentId: z.number().int().nullable(),
})

export type Review = z.infer<typeof ReviewSchema>

/////////////////////////////////////////
// RENT BOOKING SCHEMA
/////////////////////////////////////////

export const RentBookingSchema = z.object({
  status: BookingStatusSchema,
  id: z.number().int(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().nullable(),
  rentId: z.number().int(),
  roomId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RentBooking = z.infer<typeof RentBookingSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// OBJECT
//------------------------------------------------------

export const ObjectIncludeSchema: z.ZodType<Prisma.ObjectInclude> = z.object({
  details: z.union([z.boolean(),z.lazy(() => DetailFindManyArgsSchema)]).optional(),
  frequentQuestions: z.union([z.boolean(),z.lazy(() => FrequentQuestionFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ObjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ObjectArgsSchema: z.ZodType<Prisma.ObjectDefaultArgs> = z.object({
  select: z.lazy(() => ObjectSelectSchema).optional(),
  include: z.lazy(() => ObjectIncludeSchema).optional(),
}).strict();

export const ObjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ObjectCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ObjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ObjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ObjectCountOutputTypeSelect> = z.object({
  details: z.boolean().optional(),
  frequentQuestions: z.boolean().optional(),
  reviews: z.boolean().optional(),
}).strict();

export const ObjectSelectSchema: z.ZodType<Prisma.ObjectSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  image: z.boolean().optional(),
  title: z.boolean().optional(),
  subtitle: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  details: z.union([z.boolean(),z.lazy(() => DetailFindManyArgsSchema)]).optional(),
  frequentQuestions: z.union([z.boolean(),z.lazy(() => FrequentQuestionFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ObjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FREQUENT QUESTION
//------------------------------------------------------

export const FrequentQuestionIncludeSchema: z.ZodType<Prisma.FrequentQuestionInclude> = z.object({
  object: z.union([z.boolean(),z.lazy(() => ObjectArgsSchema)]).optional(),
}).strict()

export const FrequentQuestionArgsSchema: z.ZodType<Prisma.FrequentQuestionDefaultArgs> = z.object({
  select: z.lazy(() => FrequentQuestionSelectSchema).optional(),
  include: z.lazy(() => FrequentQuestionIncludeSchema).optional(),
}).strict();

export const FrequentQuestionSelectSchema: z.ZodType<Prisma.FrequentQuestionSelect> = z.object({
  id: z.boolean().optional(),
  question: z.boolean().optional(),
  answer: z.boolean().optional(),
  objectId: z.boolean().optional(),
  object: z.union([z.boolean(),z.lazy(() => ObjectArgsSchema)]).optional(),
}).strict()

// DETAIL
//------------------------------------------------------

export const DetailIncludeSchema: z.ZodType<Prisma.DetailInclude> = z.object({
  object: z.union([z.boolean(),z.lazy(() => ObjectArgsSchema)]).optional(),
}).strict()

export const DetailArgsSchema: z.ZodType<Prisma.DetailDefaultArgs> = z.object({
  select: z.lazy(() => DetailSelectSchema).optional(),
  include: z.lazy(() => DetailIncludeSchema).optional(),
}).strict();

export const DetailSelectSchema: z.ZodType<Prisma.DetailSelect> = z.object({
  id: z.boolean().optional(),
  key: z.boolean().optional(),
  value: z.boolean().optional(),
  objectId: z.boolean().optional(),
  object: z.union([z.boolean(),z.lazy(() => ObjectArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  rents: z.union([z.boolean(),z.lazy(() => RentFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  rentsBookings: z.union([z.boolean(),z.lazy(() => RentBookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  rents: z.boolean().optional(),
  reviews: z.boolean().optional(),
  rentsBookings: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  rents: z.union([z.boolean(),z.lazy(() => RentFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  rentsBookings: z.union([z.boolean(),z.lazy(() => RentBookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RENT
//------------------------------------------------------

export const RentIncludeSchema: z.ZodType<Prisma.RentInclude> = z.object({
  host: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  services: z.union([z.boolean(),z.lazy(() => ServiceFindManyArgsSchema)]).optional(),
  bookings: z.union([z.boolean(),z.lazy(() => RentBookingFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RentArgsSchema: z.ZodType<Prisma.RentDefaultArgs> = z.object({
  select: z.lazy(() => RentSelectSchema).optional(),
  include: z.lazy(() => RentIncludeSchema).optional(),
}).strict();

export const RentCountOutputTypeArgsSchema: z.ZodType<Prisma.RentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RentCountOutputTypeSelectSchema: z.ZodType<Prisma.RentCountOutputTypeSelect> = z.object({
  reviews: z.boolean().optional(),
  services: z.boolean().optional(),
  bookings: z.boolean().optional(),
  rooms: z.boolean().optional(),
}).strict();

export const RentSelectSchema: z.ZodType<Prisma.RentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  profile_photo: z.boolean().optional(),
  slug: z.boolean().optional(),
  department: z.boolean().optional(),
  city: z.boolean().optional(),
  hostId: z.boolean().optional(),
  description: z.boolean().optional(),
  collection: z.boolean().optional(),
  rules: z.boolean().optional(),
  type: z.boolean().optional(),
  capacity: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  host: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  services: z.union([z.boolean(),z.lazy(() => ServiceFindManyArgsSchema)]).optional(),
  bookings: z.union([z.boolean(),z.lazy(() => RentBookingFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceIncludeSchema: z.ZodType<Prisma.ServiceInclude> = z.object({
  rents: z.union([z.boolean(),z.lazy(() => RentFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ServiceArgsSchema: z.ZodType<Prisma.ServiceDefaultArgs> = z.object({
  select: z.lazy(() => ServiceSelectSchema).optional(),
  include: z.lazy(() => ServiceIncludeSchema).optional(),
}).strict();

export const ServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ServiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ServiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ServiceCountOutputTypeSelect> = z.object({
  rents: z.boolean().optional(),
  rooms: z.boolean().optional(),
}).strict();

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  icon: z.boolean().optional(),
  name: z.boolean().optional(),
  rents: z.union([z.boolean(),z.lazy(() => RentFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROOM
//------------------------------------------------------

export const RoomIncludeSchema: z.ZodType<Prisma.RoomInclude> = z.object({
  rent: z.union([z.boolean(),z.lazy(() => RentArgsSchema)]).optional(),
  amenities: z.union([z.boolean(),z.lazy(() => ServiceFindManyArgsSchema)]).optional(),
  bookings: z.union([z.boolean(),z.lazy(() => RentBookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoomArgsSchema: z.ZodType<Prisma.RoomDefaultArgs> = z.object({
  select: z.lazy(() => RoomSelectSchema).optional(),
  include: z.lazy(() => RoomIncludeSchema).optional(),
}).strict();

export const RoomCountOutputTypeArgsSchema: z.ZodType<Prisma.RoomCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoomCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoomCountOutputTypeSelectSchema: z.ZodType<Prisma.RoomCountOutputTypeSelect> = z.object({
  amenities: z.boolean().optional(),
  bookings: z.boolean().optional(),
}).strict();

export const RoomSelectSchema: z.ZodType<Prisma.RoomSelect> = z.object({
  id: z.boolean().optional(),
  rentId: z.boolean().optional(),
  name: z.boolean().optional(),
  single_bed: z.boolean().optional(),
  queen_bed: z.boolean().optional(),
  king_bed: z.boolean().optional(),
  capacity: z.boolean().optional(),
  price: z.boolean().optional(),
  description: z.boolean().optional(),
  photos: z.boolean().optional(),
  rules: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  rent: z.union([z.boolean(),z.lazy(() => RentArgsSchema)]).optional(),
  amenities: z.union([z.boolean(),z.lazy(() => ServiceFindManyArgsSchema)]).optional(),
  bookings: z.union([z.boolean(),z.lazy(() => RentBookingFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REVIEW
//------------------------------------------------------

export const ReviewIncludeSchema: z.ZodType<Prisma.ReviewInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  object: z.union([z.boolean(),z.lazy(() => ObjectArgsSchema)]).optional(),
  rent: z.union([z.boolean(),z.lazy(() => RentArgsSchema)]).optional(),
}).strict()

export const ReviewArgsSchema: z.ZodType<Prisma.ReviewDefaultArgs> = z.object({
  select: z.lazy(() => ReviewSelectSchema).optional(),
  include: z.lazy(() => ReviewIncludeSchema).optional(),
}).strict();

export const ReviewSelectSchema: z.ZodType<Prisma.ReviewSelect> = z.object({
  id: z.boolean().optional(),
  rating: z.boolean().optional(),
  comment: z.boolean().optional(),
  userId: z.boolean().optional(),
  reviewableId: z.boolean().optional(),
  reviewableType: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  objectId: z.boolean().optional(),
  rentId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  object: z.union([z.boolean(),z.lazy(() => ObjectArgsSchema)]).optional(),
  rent: z.union([z.boolean(),z.lazy(() => RentArgsSchema)]).optional(),
}).strict()

// RENT BOOKING
//------------------------------------------------------

export const RentBookingIncludeSchema: z.ZodType<Prisma.RentBookingInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Rent: z.union([z.boolean(),z.lazy(() => RentArgsSchema)]).optional(),
  Room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
}).strict()

export const RentBookingArgsSchema: z.ZodType<Prisma.RentBookingDefaultArgs> = z.object({
  select: z.lazy(() => RentBookingSelectSchema).optional(),
  include: z.lazy(() => RentBookingIncludeSchema).optional(),
}).strict();

export const RentBookingSelectSchema: z.ZodType<Prisma.RentBookingSelect> = z.object({
  id: z.boolean().optional(),
  from: z.boolean().optional(),
  to: z.boolean().optional(),
  userId: z.boolean().optional(),
  rentId: z.boolean().optional(),
  roomId: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Rent: z.union([z.boolean(),z.lazy(() => RentArgsSchema)]).optional(),
  Room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ObjectWhereInputSchema: z.ZodType<Prisma.ObjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ObjectWhereInputSchema),z.lazy(() => ObjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ObjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ObjectWhereInputSchema),z.lazy(() => ObjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subtitle: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  details: z.lazy(() => DetailListRelationFilterSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const ObjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ObjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  subtitle: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => DetailOrderByRelationAggregateInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ObjectWhereUniqueInputSchema: z.ZodType<Prisma.ObjectWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ObjectWhereInputSchema),z.lazy(() => ObjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ObjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ObjectWhereInputSchema),z.lazy(() => ObjectWhereInputSchema).array() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subtitle: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  details: z.lazy(() => DetailListRelationFilterSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const ObjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ObjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  subtitle: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ObjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ObjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ObjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ObjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ObjectSumOrderByAggregateInputSchema).optional()
}).strict();

export const ObjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ObjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ObjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ObjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ObjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ObjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ObjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subtitle: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FrequentQuestionWhereInputSchema: z.ZodType<Prisma.FrequentQuestionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FrequentQuestionWhereInputSchema),z.lazy(() => FrequentQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FrequentQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FrequentQuestionWhereInputSchema),z.lazy(() => FrequentQuestionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  object: z.union([ z.lazy(() => ObjectRelationFilterSchema),z.lazy(() => ObjectWhereInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionOrderByWithRelationInputSchema: z.ZodType<Prisma.FrequentQuestionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  object: z.lazy(() => ObjectOrderByWithRelationInputSchema).optional()
}).strict();

export const FrequentQuestionWhereUniqueInputSchema: z.ZodType<Prisma.FrequentQuestionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FrequentQuestionWhereInputSchema),z.lazy(() => FrequentQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FrequentQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FrequentQuestionWhereInputSchema),z.lazy(() => FrequentQuestionWhereInputSchema).array() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  object: z.union([ z.lazy(() => ObjectRelationFilterSchema),z.lazy(() => ObjectWhereInputSchema) ]).optional(),
}).strict());

export const FrequentQuestionOrderByWithAggregationInputSchema: z.ZodType<Prisma.FrequentQuestionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FrequentQuestionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FrequentQuestionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FrequentQuestionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FrequentQuestionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FrequentQuestionSumOrderByAggregateInputSchema).optional()
}).strict();

export const FrequentQuestionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FrequentQuestionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FrequentQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => FrequentQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FrequentQuestionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FrequentQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => FrequentQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  question: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const DetailWhereInputSchema: z.ZodType<Prisma.DetailWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DetailWhereInputSchema),z.lazy(() => DetailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DetailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DetailWhereInputSchema),z.lazy(() => DetailWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  object: z.union([ z.lazy(() => ObjectRelationFilterSchema),z.lazy(() => ObjectWhereInputSchema) ]).optional(),
}).strict();

export const DetailOrderByWithRelationInputSchema: z.ZodType<Prisma.DetailOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  object: z.lazy(() => ObjectOrderByWithRelationInputSchema).optional()
}).strict();

export const DetailWhereUniqueInputSchema: z.ZodType<Prisma.DetailWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => DetailWhereInputSchema),z.lazy(() => DetailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DetailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DetailWhereInputSchema),z.lazy(() => DetailWhereInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  object: z.union([ z.lazy(() => ObjectRelationFilterSchema),z.lazy(() => ObjectWhereInputSchema) ]).optional(),
}).strict());

export const DetailOrderByWithAggregationInputSchema: z.ZodType<Prisma.DetailOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DetailCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DetailAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DetailMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DetailMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DetailSumOrderByAggregateInputSchema).optional()
}).strict();

export const DetailScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DetailScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DetailScalarWhereWithAggregatesInputSchema),z.lazy(() => DetailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DetailScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DetailScalarWhereWithAggregatesInputSchema),z.lazy(() => DetailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rents: z.lazy(() => RentListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rents: z.lazy(() => RentOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rents: z.lazy(() => RentListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RentWhereInputSchema: z.ZodType<Prisma.RentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RentWhereInputSchema),z.lazy(() => RentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentWhereInputSchema),z.lazy(() => RentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  profile_photo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  department: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  collection: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  type: z.union([ z.lazy(() => EnumRentTypeFilterSchema),z.lazy(() => RentTypeSchema) ]).optional(),
  capacity: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional(),
  services: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  bookings: z.lazy(() => RentBookingListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional()
}).strict();

export const RentOrderByWithRelationInputSchema: z.ZodType<Prisma.RentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  profile_photo: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional(),
  rules: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional(),
  services: z.lazy(() => ServiceOrderByRelationAggregateInputSchema).optional(),
  bookings: z.lazy(() => RentBookingOrderByRelationAggregateInputSchema).optional(),
  rooms: z.lazy(() => RoomOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RentWhereUniqueInputSchema: z.ZodType<Prisma.RentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RentWhereInputSchema),z.lazy(() => RentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentWhereInputSchema),z.lazy(() => RentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  profile_photo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  department: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  collection: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  type: z.union([ z.lazy(() => EnumRentTypeFilterSchema),z.lazy(() => RentTypeSchema) ]).optional(),
  capacity: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional(),
  services: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  bookings: z.lazy(() => RentBookingListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional()
}).strict());

export const RentOrderByWithAggregationInputSchema: z.ZodType<Prisma.RentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  profile_photo: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional(),
  rules: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RentSumOrderByAggregateInputSchema).optional()
}).strict();

export const RentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RentScalarWhereWithAggregatesInputSchema),z.lazy(() => RentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentScalarWhereWithAggregatesInputSchema),z.lazy(() => RentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  profile_photo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  department: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  collection: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  type: z.union([ z.lazy(() => EnumRentTypeWithAggregatesFilterSchema),z.lazy(() => RentTypeSchema) ]).optional(),
  capacity: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rents: z.lazy(() => RentListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional()
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  icon: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rents: z.lazy(() => RentOrderByRelationAggregateInputSchema).optional(),
  rooms: z.lazy(() => RoomOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rents: z.lazy(() => RentListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional()
}).strict());

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  icon: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RoomWhereInputSchema: z.ZodType<Prisma.RoomWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  single_bed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  queen_bed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  king_bed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  photos: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rent: z.union([ z.lazy(() => RentRelationFilterSchema),z.lazy(() => RentWhereInputSchema) ]).optional(),
  amenities: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  bookings: z.lazy(() => RentBookingListRelationFilterSchema).optional()
}).strict();

export const RoomOrderByWithRelationInputSchema: z.ZodType<Prisma.RoomOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  photos: z.lazy(() => SortOrderSchema).optional(),
  rules: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => RentOrderByWithRelationInputSchema).optional(),
  amenities: z.lazy(() => ServiceOrderByRelationAggregateInputSchema).optional(),
  bookings: z.lazy(() => RentBookingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoomWhereUniqueInputSchema: z.ZodType<Prisma.RoomWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  rentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  single_bed: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  queen_bed: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  king_bed: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  photos: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rent: z.union([ z.lazy(() => RentRelationFilterSchema),z.lazy(() => RentWhereInputSchema) ]).optional(),
  amenities: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  bookings: z.lazy(() => RentBookingListRelationFilterSchema).optional()
}).strict());

export const RoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoomOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  photos: z.lazy(() => SortOrderSchema).optional(),
  rules: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoomCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RoomAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoomMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoomMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RoomSumOrderByAggregateInputSchema).optional()
}).strict();

export const RoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoomScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  single_bed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  queen_bed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  king_bed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  capacity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  photos: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewWhereInputSchema: z.ZodType<Prisma.ReviewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reviewableId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reviewableType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  objectId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  object: z.union([ z.lazy(() => ObjectNullableRelationFilterSchema),z.lazy(() => ObjectWhereInputSchema) ]).optional().nullable(),
  rent: z.union([ z.lazy(() => RentNullableRelationFilterSchema),z.lazy(() => RentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  reviewableType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  object: z.lazy(() => ObjectOrderByWithRelationInputSchema).optional(),
  rent: z.lazy(() => RentOrderByWithRelationInputSchema).optional()
}).strict();

export const ReviewWhereUniqueInputSchema: z.ZodType<Prisma.ReviewWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reviewableId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reviewableType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  objectId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  object: z.union([ z.lazy(() => ObjectNullableRelationFilterSchema),z.lazy(() => ObjectWhereInputSchema) ]).optional().nullable(),
  rent: z.union([ z.lazy(() => RentNullableRelationFilterSchema),z.lazy(() => RentWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  reviewableType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ReviewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReviewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReviewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReviewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReviewSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reviewableId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reviewableType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  objectId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const RentBookingWhereInputSchema: z.ZodType<Prisma.RentBookingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RentBookingWhereInputSchema),z.lazy(() => RentBookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentBookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentBookingWhereInputSchema),z.lazy(() => RentBookingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roomId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookingStatusFilterSchema),z.lazy(() => BookingStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Rent: z.union([ z.lazy(() => RentRelationFilterSchema),z.lazy(() => RentWhereInputSchema) ]).optional(),
  Room: z.union([ z.lazy(() => RoomNullableRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
}).strict();

export const RentBookingOrderByWithRelationInputSchema: z.ZodType<Prisma.RentBookingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Rent: z.lazy(() => RentOrderByWithRelationInputSchema).optional(),
  Room: z.lazy(() => RoomOrderByWithRelationInputSchema).optional()
}).strict();

export const RentBookingWhereUniqueInputSchema: z.ZodType<Prisma.RentBookingWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RentBookingWhereInputSchema),z.lazy(() => RentBookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentBookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentBookingWhereInputSchema),z.lazy(() => RentBookingWhereInputSchema).array() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  roomId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookingStatusFilterSchema),z.lazy(() => BookingStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Rent: z.union([ z.lazy(() => RentRelationFilterSchema),z.lazy(() => RentWhereInputSchema) ]).optional(),
  Room: z.union([ z.lazy(() => RoomNullableRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
}).strict());

export const RentBookingOrderByWithAggregationInputSchema: z.ZodType<Prisma.RentBookingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RentBookingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RentBookingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RentBookingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RentBookingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RentBookingSumOrderByAggregateInputSchema).optional()
}).strict();

export const RentBookingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RentBookingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RentBookingScalarWhereWithAggregatesInputSchema),z.lazy(() => RentBookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentBookingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentBookingScalarWhereWithAggregatesInputSchema),z.lazy(() => RentBookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  roomId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookingStatusWithAggregatesFilterSchema),z.lazy(() => BookingStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ObjectCreateInputSchema: z.ZodType<Prisma.ObjectCreateInput> = z.object({
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  details: z.lazy(() => DetailCreateNestedManyWithoutObjectInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionCreateNestedManyWithoutObjectInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectUncheckedCreateInputSchema: z.ZodType<Prisma.ObjectUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  details: z.lazy(() => DetailUncheckedCreateNestedManyWithoutObjectInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUncheckedCreateNestedManyWithoutObjectInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectUpdateInputSchema: z.ZodType<Prisma.ObjectUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.lazy(() => DetailUpdateManyWithoutObjectNestedInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUpdateManyWithoutObjectNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const ObjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ObjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.lazy(() => DetailUncheckedUpdateManyWithoutObjectNestedInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUncheckedUpdateManyWithoutObjectNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const ObjectCreateManyInputSchema: z.ZodType<Prisma.ObjectCreateManyInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ObjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ObjectUpdateManyMutationInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ObjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ObjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionCreateInputSchema: z.ZodType<Prisma.FrequentQuestionCreateInput> = z.object({
  question: z.string(),
  answer: z.string(),
  object: z.lazy(() => ObjectCreateNestedOneWithoutFrequentQuestionsInputSchema)
}).strict();

export const FrequentQuestionUncheckedCreateInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  question: z.string(),
  answer: z.string(),
  objectId: z.number().int()
}).strict();

export const FrequentQuestionUpdateInputSchema: z.ZodType<Prisma.FrequentQuestionUpdateInput> = z.object({
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  object: z.lazy(() => ObjectUpdateOneRequiredWithoutFrequentQuestionsNestedInputSchema).optional()
}).strict();

export const FrequentQuestionUncheckedUpdateInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionCreateManyInputSchema: z.ZodType<Prisma.FrequentQuestionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  question: z.string(),
  answer: z.string(),
  objectId: z.number().int()
}).strict();

export const FrequentQuestionUpdateManyMutationInputSchema: z.ZodType<Prisma.FrequentQuestionUpdateManyMutationInput> = z.object({
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DetailCreateInputSchema: z.ZodType<Prisma.DetailCreateInput> = z.object({
  key: z.string(),
  value: z.string(),
  object: z.lazy(() => ObjectCreateNestedOneWithoutDetailsInputSchema)
}).strict();

export const DetailUncheckedCreateInputSchema: z.ZodType<Prisma.DetailUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string(),
  objectId: z.number().int()
}).strict();

export const DetailUpdateInputSchema: z.ZodType<Prisma.DetailUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  object: z.lazy(() => ObjectUpdateOneRequiredWithoutDetailsNestedInputSchema).optional()
}).strict();

export const DetailUncheckedUpdateInputSchema: z.ZodType<Prisma.DetailUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DetailCreateManyInputSchema: z.ZodType<Prisma.DetailCreateManyInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string(),
  objectId: z.number().int()
}).strict();

export const DetailUpdateManyMutationInputSchema: z.ZodType<Prisma.DetailUpdateManyMutationInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DetailUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DetailUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rents: z.lazy(() => RentCreateNestedManyWithoutHostInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rents: z.lazy(() => RentUncheckedCreateNestedManyWithoutHostInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUpdateManyWithoutHostNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUncheckedUpdateManyWithoutHostNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentCreateInputSchema: z.ZodType<Prisma.RentCreateInput> = z.object({
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  host: z.lazy(() => UserCreateNestedOneWithoutRentsInputSchema),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUncheckedCreateInputSchema: z.ZodType<Prisma.RentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUpdateInputSchema: z.ZodType<Prisma.RentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.lazy(() => UserUpdateOneRequiredWithoutRentsNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateInputSchema: z.ZodType<Prisma.RentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentCreateManyInputSchema: z.ZodType<Prisma.RentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentUpdateManyMutationInputSchema: z.ZodType<Prisma.RentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  icon: z.string().optional().nullable(),
  name: z.string(),
  rents: z.lazy(() => RentCreateNestedManyWithoutServicesInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutAmenitiesInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  icon: z.string().optional().nullable(),
  name: z.string(),
  rents: z.lazy(() => RentUncheckedCreateNestedManyWithoutServicesInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutAmenitiesInputSchema).optional()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUpdateManyWithoutServicesNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutAmenitiesNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUncheckedUpdateManyWithoutServicesNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutAmenitiesNestedInputSchema).optional()
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  icon: z.string().optional().nullable(),
  name: z.string()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z.object({
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rent: z.lazy(() => RentCreateNestedOneWithoutRoomsInputSchema),
  amenities: z.lazy(() => ServiceCreateNestedManyWithoutRoomsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  rentId: z.number().int(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  amenities: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRoomsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUpdateInputSchema: z.ZodType<Prisma.RoomUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.lazy(() => RentUpdateOneRequiredWithoutRoomsNestedInputSchema).optional(),
  amenities: z.lazy(() => ServiceUpdateManyWithoutRoomsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amenities: z.lazy(() => ServiceUncheckedUpdateManyWithoutRoomsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomCreateManyInputSchema: z.ZodType<Prisma.RoomCreateManyInput> = z.object({
  id: z.number().int().optional(),
  rentId: z.number().int(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoomUpdateManyMutationInputSchema: z.ZodType<Prisma.RoomUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z.object({
  rating: z.number(),
  comment: z.string(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  object: z.lazy(() => ObjectCreateNestedOneWithoutReviewsInputSchema).optional(),
  rent: z.lazy(() => RentCreateNestedOneWithoutReviewsInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  objectId: z.number().int().optional().nullable(),
  rentId: z.number().int().optional().nullable()
}).strict();

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  object: z.lazy(() => ObjectUpdateOneWithoutReviewsNestedInputSchema).optional(),
  rent: z.lazy(() => RentUpdateOneWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  objectId: z.number().int().optional().nullable(),
  rentId: z.number().int().optional().nullable()
}).strict();

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RentBookingCreateInputSchema: z.ZodType<Prisma.RentBookingCreateInput> = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutRentsBookingsInputSchema).optional(),
  Rent: z.lazy(() => RentCreateNestedOneWithoutBookingsInputSchema),
  Room: z.lazy(() => RoomCreateNestedOneWithoutBookingsInputSchema).optional()
}).strict();

export const RentBookingUncheckedCreateInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().optional().nullable(),
  rentId: z.number().int(),
  roomId: z.number().int().optional().nullable(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentBookingUpdateInputSchema: z.ZodType<Prisma.RentBookingUpdateInput> = z.object({
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutRentsBookingsNestedInputSchema).optional(),
  Rent: z.lazy(() => RentUpdateOneRequiredWithoutBookingsNestedInputSchema).optional(),
  Room: z.lazy(() => RoomUpdateOneWithoutBookingsNestedInputSchema).optional()
}).strict();

export const RentBookingUncheckedUpdateInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingCreateManyInputSchema: z.ZodType<Prisma.RentBookingCreateManyInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().optional().nullable(),
  rentId: z.number().int(),
  roomId: z.number().int().optional().nullable(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentBookingUpdateManyMutationInputSchema: z.ZodType<Prisma.RentBookingUpdateManyMutationInput> = z.object({
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DetailListRelationFilterSchema: z.ZodType<Prisma.DetailListRelationFilter> = z.object({
  every: z.lazy(() => DetailWhereInputSchema).optional(),
  some: z.lazy(() => DetailWhereInputSchema).optional(),
  none: z.lazy(() => DetailWhereInputSchema).optional()
}).strict();

export const FrequentQuestionListRelationFilterSchema: z.ZodType<Prisma.FrequentQuestionListRelationFilter> = z.object({
  every: z.lazy(() => FrequentQuestionWhereInputSchema).optional(),
  some: z.lazy(() => FrequentQuestionWhereInputSchema).optional(),
  none: z.lazy(() => FrequentQuestionWhereInputSchema).optional()
}).strict();

export const ReviewListRelationFilterSchema: z.ZodType<Prisma.ReviewListRelationFilter> = z.object({
  every: z.lazy(() => ReviewWhereInputSchema).optional(),
  some: z.lazy(() => ReviewWhereInputSchema).optional(),
  none: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DetailOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DetailOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FrequentQuestionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FrequentQuestionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ObjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ObjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  subtitle: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ObjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ObjectAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ObjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ObjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  subtitle: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ObjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ObjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  subtitle: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ObjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.ObjectSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const ObjectRelationFilterSchema: z.ZodType<Prisma.ObjectRelationFilter> = z.object({
  is: z.lazy(() => ObjectWhereInputSchema).optional(),
  isNot: z.lazy(() => ObjectWhereInputSchema).optional()
}).strict();

export const FrequentQuestionCountOrderByAggregateInputSchema: z.ZodType<Prisma.FrequentQuestionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FrequentQuestionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FrequentQuestionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FrequentQuestionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FrequentQuestionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FrequentQuestionMinOrderByAggregateInputSchema: z.ZodType<Prisma.FrequentQuestionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FrequentQuestionSumOrderByAggregateInputSchema: z.ZodType<Prisma.FrequentQuestionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DetailCountOrderByAggregateInputSchema: z.ZodType<Prisma.DetailCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DetailAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DetailAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DetailMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DetailMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DetailMinOrderByAggregateInputSchema: z.ZodType<Prisma.DetailMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DetailSumOrderByAggregateInputSchema: z.ZodType<Prisma.DetailSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentListRelationFilterSchema: z.ZodType<Prisma.RentListRelationFilter> = z.object({
  every: z.lazy(() => RentWhereInputSchema).optional(),
  some: z.lazy(() => RentWhereInputSchema).optional(),
  none: z.lazy(() => RentWhereInputSchema).optional()
}).strict();

export const RentBookingListRelationFilterSchema: z.ZodType<Prisma.RentBookingListRelationFilter> = z.object({
  every: z.lazy(() => RentBookingWhereInputSchema).optional(),
  some: z.lazy(() => RentBookingWhereInputSchema).optional(),
  none: z.lazy(() => RentBookingWhereInputSchema).optional()
}).strict();

export const RentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentBookingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RentBookingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const EnumRentTypeFilterSchema: z.ZodType<Prisma.EnumRentTypeFilter> = z.object({
  equals: z.lazy(() => RentTypeSchema).optional(),
  in: z.lazy(() => RentTypeSchema).array().optional(),
  notIn: z.lazy(() => RentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => NestedEnumRentTypeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ServiceListRelationFilterSchema: z.ZodType<Prisma.ServiceListRelationFilter> = z.object({
  every: z.lazy(() => ServiceWhereInputSchema).optional(),
  some: z.lazy(() => ServiceWhereInputSchema).optional(),
  none: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const RoomListRelationFilterSchema: z.ZodType<Prisma.RoomListRelationFilter> = z.object({
  every: z.lazy(() => RoomWhereInputSchema).optional(),
  some: z.lazy(() => RoomWhereInputSchema).optional(),
  none: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const ServiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ServiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoomOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentCountOrderByAggregateInputSchema: z.ZodType<Prisma.RentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  profile_photo: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional(),
  rules: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  profile_photo: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentMinOrderByAggregateInputSchema: z.ZodType<Prisma.RentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  profile_photo: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentSumOrderByAggregateInputSchema: z.ZodType<Prisma.RentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumRentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRentTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RentTypeSchema).optional(),
  in: z.lazy(() => RentTypeSchema).array().optional(),
  notIn: z.lazy(() => RentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => NestedEnumRentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRentTypeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentRelationFilterSchema: z.ZodType<Prisma.RentRelationFilter> = z.object({
  is: z.lazy(() => RentWhereInputSchema).optional(),
  isNot: z.lazy(() => RentWhereInputSchema).optional()
}).strict();

export const RoomCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoomCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  photos: z.lazy(() => SortOrderSchema).optional(),
  rules: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoomAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoomSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  single_bed: z.lazy(() => SortOrderSchema).optional(),
  queen_bed: z.lazy(() => SortOrderSchema).optional(),
  king_bed: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ObjectNullableRelationFilterSchema: z.ZodType<Prisma.ObjectNullableRelationFilter> = z.object({
  is: z.lazy(() => ObjectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ObjectWhereInputSchema).optional().nullable()
}).strict();

export const RentNullableRelationFilterSchema: z.ZodType<Prisma.RentNullableRelationFilter> = z.object({
  is: z.lazy(() => RentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RentWhereInputSchema).optional().nullable()
}).strict();

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  reviewableType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  reviewableType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  reviewableType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  reviewableId: z.lazy(() => SortOrderSchema).optional(),
  objectId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBookingStatusFilterSchema: z.ZodType<Prisma.EnumBookingStatusFilter> = z.object({
  equals: z.lazy(() => BookingStatusSchema).optional(),
  in: z.lazy(() => BookingStatusSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => NestedEnumBookingStatusFilterSchema) ]).optional(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const RoomNullableRelationFilterSchema: z.ZodType<Prisma.RoomNullableRelationFilter> = z.object({
  is: z.lazy(() => RoomWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RoomWhereInputSchema).optional().nullable()
}).strict();

export const RentBookingCountOrderByAggregateInputSchema: z.ZodType<Prisma.RentBookingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentBookingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RentBookingAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentBookingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RentBookingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentBookingMinOrderByAggregateInputSchema: z.ZodType<Prisma.RentBookingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RentBookingSumOrderByAggregateInputSchema: z.ZodType<Prisma.RentBookingSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rentId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBookingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBookingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookingStatusSchema).optional(),
  in: z.lazy(() => BookingStatusSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => NestedEnumBookingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookingStatusFilterSchema).optional()
}).strict();

export const DetailCreateNestedManyWithoutObjectInputSchema: z.ZodType<Prisma.DetailCreateNestedManyWithoutObjectInput> = z.object({
  create: z.union([ z.lazy(() => DetailCreateWithoutObjectInputSchema),z.lazy(() => DetailCreateWithoutObjectInputSchema).array(),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema),z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DetailCreateManyObjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FrequentQuestionCreateNestedManyWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionCreateNestedManyWithoutObjectInput> = z.object({
  create: z.union([ z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema).array(),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FrequentQuestionCreateManyObjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutObjectInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutObjectInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutObjectInputSchema),z.lazy(() => ReviewCreateWithoutObjectInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyObjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DetailUncheckedCreateNestedManyWithoutObjectInputSchema: z.ZodType<Prisma.DetailUncheckedCreateNestedManyWithoutObjectInput> = z.object({
  create: z.union([ z.lazy(() => DetailCreateWithoutObjectInputSchema),z.lazy(() => DetailCreateWithoutObjectInputSchema).array(),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema),z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DetailCreateManyObjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FrequentQuestionUncheckedCreateNestedManyWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedCreateNestedManyWithoutObjectInput> = z.object({
  create: z.union([ z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema).array(),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FrequentQuestionCreateManyObjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutObjectInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutObjectInputSchema),z.lazy(() => ReviewCreateWithoutObjectInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyObjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const DetailUpdateManyWithoutObjectNestedInputSchema: z.ZodType<Prisma.DetailUpdateManyWithoutObjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => DetailCreateWithoutObjectInputSchema),z.lazy(() => DetailCreateWithoutObjectInputSchema).array(),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema),z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DetailUpsertWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => DetailUpsertWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DetailCreateManyObjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DetailUpdateWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => DetailUpdateWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DetailUpdateManyWithWhereWithoutObjectInputSchema),z.lazy(() => DetailUpdateManyWithWhereWithoutObjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DetailScalarWhereInputSchema),z.lazy(() => DetailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FrequentQuestionUpdateManyWithoutObjectNestedInputSchema: z.ZodType<Prisma.FrequentQuestionUpdateManyWithoutObjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema).array(),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FrequentQuestionUpsertWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUpsertWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FrequentQuestionCreateManyObjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FrequentQuestionUpdateWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUpdateWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FrequentQuestionUpdateManyWithWhereWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUpdateManyWithWhereWithoutObjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FrequentQuestionScalarWhereInputSchema),z.lazy(() => FrequentQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutObjectNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutObjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutObjectInputSchema),z.lazy(() => ReviewCreateWithoutObjectInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyObjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutObjectInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutObjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DetailUncheckedUpdateManyWithoutObjectNestedInputSchema: z.ZodType<Prisma.DetailUncheckedUpdateManyWithoutObjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => DetailCreateWithoutObjectInputSchema),z.lazy(() => DetailCreateWithoutObjectInputSchema).array(),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema),z.lazy(() => DetailCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DetailUpsertWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => DetailUpsertWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DetailCreateManyObjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DetailWhereUniqueInputSchema),z.lazy(() => DetailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DetailUpdateWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => DetailUpdateWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DetailUpdateManyWithWhereWithoutObjectInputSchema),z.lazy(() => DetailUpdateManyWithWhereWithoutObjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DetailScalarWhereInputSchema),z.lazy(() => DetailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FrequentQuestionUncheckedUpdateManyWithoutObjectNestedInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedUpdateManyWithoutObjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema).array(),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema),z.lazy(() => FrequentQuestionCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FrequentQuestionUpsertWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUpsertWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FrequentQuestionCreateManyObjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FrequentQuestionWhereUniqueInputSchema),z.lazy(() => FrequentQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FrequentQuestionUpdateWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUpdateWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FrequentQuestionUpdateManyWithWhereWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUpdateManyWithWhereWithoutObjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FrequentQuestionScalarWhereInputSchema),z.lazy(() => FrequentQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutObjectNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutObjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutObjectInputSchema),z.lazy(() => ReviewCreateWithoutObjectInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutObjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyObjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutObjectInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutObjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutObjectInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutObjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ObjectCreateNestedOneWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectCreateNestedOneWithoutFrequentQuestionsInput> = z.object({
  create: z.union([ z.lazy(() => ObjectCreateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutFrequentQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ObjectCreateOrConnectWithoutFrequentQuestionsInputSchema).optional(),
  connect: z.lazy(() => ObjectWhereUniqueInputSchema).optional()
}).strict();

export const ObjectUpdateOneRequiredWithoutFrequentQuestionsNestedInputSchema: z.ZodType<Prisma.ObjectUpdateOneRequiredWithoutFrequentQuestionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ObjectCreateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutFrequentQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ObjectCreateOrConnectWithoutFrequentQuestionsInputSchema).optional(),
  upsert: z.lazy(() => ObjectUpsertWithoutFrequentQuestionsInputSchema).optional(),
  connect: z.lazy(() => ObjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ObjectUpdateToOneWithWhereWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUpdateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutFrequentQuestionsInputSchema) ]).optional(),
}).strict();

export const ObjectCreateNestedOneWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectCreateNestedOneWithoutDetailsInput> = z.object({
  create: z.union([ z.lazy(() => ObjectCreateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ObjectCreateOrConnectWithoutDetailsInputSchema).optional(),
  connect: z.lazy(() => ObjectWhereUniqueInputSchema).optional()
}).strict();

export const ObjectUpdateOneRequiredWithoutDetailsNestedInputSchema: z.ZodType<Prisma.ObjectUpdateOneRequiredWithoutDetailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ObjectCreateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ObjectCreateOrConnectWithoutDetailsInputSchema).optional(),
  upsert: z.lazy(() => ObjectUpsertWithoutDetailsInputSchema).optional(),
  connect: z.lazy(() => ObjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ObjectUpdateToOneWithWhereWithoutDetailsInputSchema),z.lazy(() => ObjectUpdateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutDetailsInputSchema) ]).optional(),
}).strict();

export const RentCreateNestedManyWithoutHostInputSchema: z.ZodType<Prisma.RentCreateNestedManyWithoutHostInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutHostInputSchema),z.lazy(() => RentCreateWithoutHostInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutHostInputSchema),z.lazy(() => RentCreateOrConnectWithoutHostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentCreateManyHostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentBookingCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RentBookingCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutUserInputSchema),z.lazy(() => RentBookingCreateWithoutUserInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentUncheckedCreateNestedManyWithoutHostInputSchema: z.ZodType<Prisma.RentUncheckedCreateNestedManyWithoutHostInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutHostInputSchema),z.lazy(() => RentCreateWithoutHostInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutHostInputSchema),z.lazy(() => RentCreateOrConnectWithoutHostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentCreateManyHostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutUserInputSchema),z.lazy(() => RentBookingCreateWithoutUserInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentUpdateManyWithoutHostNestedInputSchema: z.ZodType<Prisma.RentUpdateManyWithoutHostNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutHostInputSchema),z.lazy(() => RentCreateWithoutHostInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutHostInputSchema),z.lazy(() => RentCreateOrConnectWithoutHostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentUpsertWithWhereUniqueWithoutHostInputSchema),z.lazy(() => RentUpsertWithWhereUniqueWithoutHostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentCreateManyHostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentUpdateWithWhereUniqueWithoutHostInputSchema),z.lazy(() => RentUpdateWithWhereUniqueWithoutHostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentUpdateManyWithWhereWithoutHostInputSchema),z.lazy(() => RentUpdateManyWithWhereWithoutHostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentScalarWhereInputSchema),z.lazy(() => RentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RentBookingUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutUserInputSchema),z.lazy(() => RentBookingCreateWithoutUserInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentBookingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RentBookingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentUncheckedUpdateManyWithoutHostNestedInputSchema: z.ZodType<Prisma.RentUncheckedUpdateManyWithoutHostNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutHostInputSchema),z.lazy(() => RentCreateWithoutHostInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutHostInputSchema),z.lazy(() => RentCreateOrConnectWithoutHostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentUpsertWithWhereUniqueWithoutHostInputSchema),z.lazy(() => RentUpsertWithWhereUniqueWithoutHostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentCreateManyHostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentUpdateWithWhereUniqueWithoutHostInputSchema),z.lazy(() => RentUpdateWithWhereUniqueWithoutHostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentUpdateManyWithWhereWithoutHostInputSchema),z.lazy(() => RentUpdateManyWithWhereWithoutHostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentScalarWhereInputSchema),z.lazy(() => RentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutUserInputSchema),z.lazy(() => RentBookingCreateWithoutUserInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentBookingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RentBookingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentCreatecollectionInputSchema: z.ZodType<Prisma.RentCreatecollectionInput> = z.object({
  set: z.string().array()
}).strict();

export const RentCreaterulesInputSchema: z.ZodType<Prisma.RentCreaterulesInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutRentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ReviewCreateNestedManyWithoutRentInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutRentInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutRentInputSchema),z.lazy(() => ReviewCreateWithoutRentInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyRentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceCreateNestedManyWithoutRentsInputSchema: z.ZodType<Prisma.ServiceCreateNestedManyWithoutRentsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRentsInputSchema),z.lazy(() => ServiceCreateWithoutRentsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentBookingCreateNestedManyWithoutRentInputSchema: z.ZodType<Prisma.RentBookingCreateNestedManyWithoutRentInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRentInputSchema),z.lazy(() => RentBookingCreateWithoutRentInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomCreateNestedManyWithoutRentInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutRentInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutRentInputSchema),z.lazy(() => RoomCreateWithoutRentInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema),z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoomCreateManyRentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutRentInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutRentInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutRentInputSchema),z.lazy(() => ReviewCreateWithoutRentInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyRentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceUncheckedCreateNestedManyWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateNestedManyWithoutRentsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRentsInputSchema),z.lazy(() => ServiceCreateWithoutRentsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUncheckedCreateNestedManyWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateNestedManyWithoutRentInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRentInputSchema),z.lazy(() => RentBookingCreateWithoutRentInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedCreateNestedManyWithoutRentInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutRentInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutRentInputSchema),z.lazy(() => RoomCreateWithoutRentInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema),z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoomCreateManyRentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RentUpdatecollectionInputSchema: z.ZodType<Prisma.RentUpdatecollectionInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RentUpdaterulesInputSchema: z.ZodType<Prisma.RentUpdaterulesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const EnumRentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRentTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RentTypeSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutRentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRentsInputSchema),z.lazy(() => UserUpdateWithoutRentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRentsInputSchema) ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutRentNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutRentNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutRentInputSchema),z.lazy(() => ReviewCreateWithoutRentInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutRentInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyRentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutRentInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutRentInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutRentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceUpdateManyWithoutRentsNestedInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithoutRentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRentsInputSchema),z.lazy(() => ServiceCreateWithoutRentsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRentsInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRentsInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutRentsInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutRentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUpdateManyWithoutRentNestedInputSchema: z.ZodType<Prisma.RentBookingUpdateManyWithoutRentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRentInputSchema),z.lazy(() => RentBookingCreateWithoutRentInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentBookingUpdateManyWithWhereWithoutRentInputSchema),z.lazy(() => RentBookingUpdateManyWithWhereWithoutRentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomUpdateManyWithoutRentNestedInputSchema: z.ZodType<Prisma.RoomUpdateManyWithoutRentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutRentInputSchema),z.lazy(() => RoomCreateWithoutRentInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema),z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoomUpsertWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RoomUpsertWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoomCreateManyRentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoomUpdateWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RoomUpdateWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoomUpdateManyWithWhereWithoutRentInputSchema),z.lazy(() => RoomUpdateManyWithWhereWithoutRentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutRentNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutRentNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutRentInputSchema),z.lazy(() => ReviewCreateWithoutRentInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutRentInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyRentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutRentInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutRentInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutRentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyWithoutRentsNestedInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutRentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRentsInputSchema),z.lazy(() => ServiceCreateWithoutRentsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRentsInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRentsInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutRentsInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutRentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyWithoutRentNestedInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyWithoutRentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRentInputSchema),z.lazy(() => RentBookingCreateWithoutRentInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentBookingUpdateManyWithWhereWithoutRentInputSchema),z.lazy(() => RentBookingUpdateManyWithWhereWithoutRentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedUpdateManyWithoutRentNestedInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutRentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutRentInputSchema),z.lazy(() => RoomCreateWithoutRentInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema),z.lazy(() => RoomCreateOrConnectWithoutRentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoomUpsertWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RoomUpsertWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoomCreateManyRentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoomUpdateWithWhereUniqueWithoutRentInputSchema),z.lazy(() => RoomUpdateWithWhereUniqueWithoutRentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoomUpdateManyWithWhereWithoutRentInputSchema),z.lazy(() => RoomUpdateManyWithWhereWithoutRentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentCreateNestedManyWithoutServicesInputSchema: z.ZodType<Prisma.RentCreateNestedManyWithoutServicesInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutServicesInputSchema),z.lazy(() => RentCreateWithoutServicesInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema),z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomCreateNestedManyWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutAmenitiesInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateWithoutAmenitiesInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentUncheckedCreateNestedManyWithoutServicesInputSchema: z.ZodType<Prisma.RentUncheckedCreateNestedManyWithoutServicesInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutServicesInputSchema),z.lazy(() => RentCreateWithoutServicesInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema),z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedCreateNestedManyWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutAmenitiesInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateWithoutAmenitiesInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentUpdateManyWithoutServicesNestedInputSchema: z.ZodType<Prisma.RentUpdateManyWithoutServicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutServicesInputSchema),z.lazy(() => RentCreateWithoutServicesInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema),z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentUpsertWithWhereUniqueWithoutServicesInputSchema),z.lazy(() => RentUpsertWithWhereUniqueWithoutServicesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentUpdateWithWhereUniqueWithoutServicesInputSchema),z.lazy(() => RentUpdateWithWhereUniqueWithoutServicesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentUpdateManyWithWhereWithoutServicesInputSchema),z.lazy(() => RentUpdateManyWithWhereWithoutServicesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentScalarWhereInputSchema),z.lazy(() => RentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomUpdateManyWithoutAmenitiesNestedInputSchema: z.ZodType<Prisma.RoomUpdateManyWithoutAmenitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateWithoutAmenitiesInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoomUpsertWithWhereUniqueWithoutAmenitiesInputSchema),z.lazy(() => RoomUpsertWithWhereUniqueWithoutAmenitiesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoomUpdateWithWhereUniqueWithoutAmenitiesInputSchema),z.lazy(() => RoomUpdateWithWhereUniqueWithoutAmenitiesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoomUpdateManyWithWhereWithoutAmenitiesInputSchema),z.lazy(() => RoomUpdateManyWithWhereWithoutAmenitiesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentUncheckedUpdateManyWithoutServicesNestedInputSchema: z.ZodType<Prisma.RentUncheckedUpdateManyWithoutServicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutServicesInputSchema),z.lazy(() => RentCreateWithoutServicesInputSchema).array(),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema),z.lazy(() => RentCreateOrConnectWithoutServicesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentUpsertWithWhereUniqueWithoutServicesInputSchema),z.lazy(() => RentUpsertWithWhereUniqueWithoutServicesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentWhereUniqueInputSchema),z.lazy(() => RentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentUpdateWithWhereUniqueWithoutServicesInputSchema),z.lazy(() => RentUpdateWithWhereUniqueWithoutServicesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentUpdateManyWithWhereWithoutServicesInputSchema),z.lazy(() => RentUpdateManyWithWhereWithoutServicesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentScalarWhereInputSchema),z.lazy(() => RentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedUpdateManyWithoutAmenitiesNestedInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutAmenitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateWithoutAmenitiesInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema),z.lazy(() => RoomCreateOrConnectWithoutAmenitiesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoomUpsertWithWhereUniqueWithoutAmenitiesInputSchema),z.lazy(() => RoomUpsertWithWhereUniqueWithoutAmenitiesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoomUpdateWithWhereUniqueWithoutAmenitiesInputSchema),z.lazy(() => RoomUpdateWithWhereUniqueWithoutAmenitiesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoomUpdateManyWithWhereWithoutAmenitiesInputSchema),z.lazy(() => RoomUpdateManyWithWhereWithoutAmenitiesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomCreatephotosInputSchema: z.ZodType<Prisma.RoomCreatephotosInput> = z.object({
  set: z.string().array()
}).strict();

export const RoomCreaterulesInputSchema: z.ZodType<Prisma.RoomCreaterulesInput> = z.object({
  set: z.string().array()
}).strict();

export const RentCreateNestedOneWithoutRoomsInputSchema: z.ZodType<Prisma.RentCreateNestedOneWithoutRoomsInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedCreateWithoutRoomsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RentCreateOrConnectWithoutRoomsInputSchema).optional(),
  connect: z.lazy(() => RentWhereUniqueInputSchema).optional()
}).strict();

export const ServiceCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceCreateNestedManyWithoutRoomsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRoomsInputSchema),z.lazy(() => ServiceCreateWithoutRoomsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentBookingCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRoomInputSchema),z.lazy(() => RentBookingCreateWithoutRoomInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceUncheckedCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateNestedManyWithoutRoomsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRoomsInputSchema),z.lazy(() => ServiceCreateWithoutRoomsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRoomInputSchema),z.lazy(() => RentBookingCreateWithoutRoomInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomUpdatephotosInputSchema: z.ZodType<Prisma.RoomUpdatephotosInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RoomUpdaterulesInputSchema: z.ZodType<Prisma.RoomUpdaterulesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RentUpdateOneRequiredWithoutRoomsNestedInputSchema: z.ZodType<Prisma.RentUpdateOneRequiredWithoutRoomsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedCreateWithoutRoomsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RentCreateOrConnectWithoutRoomsInputSchema).optional(),
  upsert: z.lazy(() => RentUpsertWithoutRoomsInputSchema).optional(),
  connect: z.lazy(() => RentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RentUpdateToOneWithWhereWithoutRoomsInputSchema),z.lazy(() => RentUpdateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutRoomsInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithoutRoomsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRoomsInputSchema),z.lazy(() => ServiceCreateWithoutRoomsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutRoomsInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutRoomsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.RentBookingUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRoomInputSchema),z.lazy(() => RentBookingCreateWithoutRoomInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentBookingUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => RentBookingUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutRoomsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutRoomsInputSchema),z.lazy(() => ServiceCreateWithoutRoomsInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutRoomsInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutRoomsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRoomInputSchema),z.lazy(() => RentBookingCreateWithoutRoomInputSchema).array(),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema),z.lazy(() => RentBookingCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => RentBookingUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RentBookingCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RentBookingWhereUniqueInputSchema),z.lazy(() => RentBookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => RentBookingUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RentBookingUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => RentBookingUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ObjectCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => ObjectCreateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ObjectCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => ObjectWhereUniqueInputSchema).optional()
}).strict();

export const RentCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.RentCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RentCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => RentWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const ObjectUpdateOneWithoutReviewsNestedInputSchema: z.ZodType<Prisma.ObjectUpdateOneWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ObjectCreateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ObjectCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => ObjectUpsertWithoutReviewsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ObjectWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ObjectWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ObjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ObjectUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => ObjectUpdateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const RentUpdateOneWithoutReviewsNestedInputSchema: z.ZodType<Prisma.RentUpdateOneWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RentCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => RentUpsertWithoutReviewsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RentUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => RentUpdateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRentsBookingsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentsBookingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RentCreateNestedOneWithoutBookingsInputSchema: z.ZodType<Prisma.RentCreateNestedOneWithoutBookingsInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedCreateWithoutBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RentCreateOrConnectWithoutBookingsInputSchema).optional(),
  connect: z.lazy(() => RentWhereUniqueInputSchema).optional()
}).strict();

export const RoomCreateNestedOneWithoutBookingsInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutBookingsInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedCreateWithoutBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutBookingsInputSchema).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional()
}).strict();

export const EnumBookingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBookingStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BookingStatusSchema).optional()
}).strict();

export const UserUpdateOneWithoutRentsBookingsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutRentsBookingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentsBookingsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRentsBookingsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRentsBookingsInputSchema),z.lazy(() => UserUpdateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRentsBookingsInputSchema) ]).optional(),
}).strict();

export const RentUpdateOneRequiredWithoutBookingsNestedInputSchema: z.ZodType<Prisma.RentUpdateOneRequiredWithoutBookingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RentCreateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedCreateWithoutBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RentCreateOrConnectWithoutBookingsInputSchema).optional(),
  upsert: z.lazy(() => RentUpsertWithoutBookingsInputSchema).optional(),
  connect: z.lazy(() => RentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RentUpdateToOneWithWhereWithoutBookingsInputSchema),z.lazy(() => RentUpdateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutBookingsInputSchema) ]).optional(),
}).strict();

export const RoomUpdateOneWithoutBookingsNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneWithoutBookingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedCreateWithoutBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutBookingsInputSchema).optional(),
  upsert: z.lazy(() => RoomUpsertWithoutBookingsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoomUpdateToOneWithWhereWithoutBookingsInputSchema),z.lazy(() => RoomUpdateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutBookingsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumRentTypeFilterSchema: z.ZodType<Prisma.NestedEnumRentTypeFilter> = z.object({
  equals: z.lazy(() => RentTypeSchema).optional(),
  in: z.lazy(() => RentTypeSchema).array().optional(),
  notIn: z.lazy(() => RentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => NestedEnumRentTypeFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumRentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRentTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RentTypeSchema).optional(),
  in: z.lazy(() => RentTypeSchema).array().optional(),
  notIn: z.lazy(() => RentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => NestedEnumRentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRentTypeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumBookingStatusFilterSchema: z.ZodType<Prisma.NestedEnumBookingStatusFilter> = z.object({
  equals: z.lazy(() => BookingStatusSchema).optional(),
  in: z.lazy(() => BookingStatusSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => NestedEnumBookingStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBookingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBookingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookingStatusSchema).optional(),
  in: z.lazy(() => BookingStatusSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => NestedEnumBookingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookingStatusFilterSchema).optional()
}).strict();

export const DetailCreateWithoutObjectInputSchema: z.ZodType<Prisma.DetailCreateWithoutObjectInput> = z.object({
  key: z.string(),
  value: z.string()
}).strict();

export const DetailUncheckedCreateWithoutObjectInputSchema: z.ZodType<Prisma.DetailUncheckedCreateWithoutObjectInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string()
}).strict();

export const DetailCreateOrConnectWithoutObjectInputSchema: z.ZodType<Prisma.DetailCreateOrConnectWithoutObjectInput> = z.object({
  where: z.lazy(() => DetailWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DetailCreateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema) ]),
}).strict();

export const DetailCreateManyObjectInputEnvelopeSchema: z.ZodType<Prisma.DetailCreateManyObjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DetailCreateManyObjectInputSchema),z.lazy(() => DetailCreateManyObjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FrequentQuestionCreateWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionCreateWithoutObjectInput> = z.object({
  question: z.string(),
  answer: z.string()
}).strict();

export const FrequentQuestionUncheckedCreateWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedCreateWithoutObjectInput> = z.object({
  id: z.number().int().optional(),
  question: z.string(),
  answer: z.string()
}).strict();

export const FrequentQuestionCreateOrConnectWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionCreateOrConnectWithoutObjectInput> = z.object({
  where: z.lazy(() => FrequentQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema) ]),
}).strict();

export const FrequentQuestionCreateManyObjectInputEnvelopeSchema: z.ZodType<Prisma.FrequentQuestionCreateManyObjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FrequentQuestionCreateManyObjectInputSchema),z.lazy(() => FrequentQuestionCreateManyObjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReviewCreateWithoutObjectInputSchema: z.ZodType<Prisma.ReviewCreateWithoutObjectInput> = z.object({
  rating: z.number(),
  comment: z.string(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  rent: z.lazy(() => RentCreateNestedOneWithoutReviewsInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutObjectInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rentId: z.number().int().optional().nullable()
}).strict();

export const ReviewCreateOrConnectWithoutObjectInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutObjectInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema) ]),
}).strict();

export const ReviewCreateManyObjectInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyObjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyObjectInputSchema),z.lazy(() => ReviewCreateManyObjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DetailUpsertWithWhereUniqueWithoutObjectInputSchema: z.ZodType<Prisma.DetailUpsertWithWhereUniqueWithoutObjectInput> = z.object({
  where: z.lazy(() => DetailWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DetailUpdateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedUpdateWithoutObjectInputSchema) ]),
  create: z.union([ z.lazy(() => DetailCreateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedCreateWithoutObjectInputSchema) ]),
}).strict();

export const DetailUpdateWithWhereUniqueWithoutObjectInputSchema: z.ZodType<Prisma.DetailUpdateWithWhereUniqueWithoutObjectInput> = z.object({
  where: z.lazy(() => DetailWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DetailUpdateWithoutObjectInputSchema),z.lazy(() => DetailUncheckedUpdateWithoutObjectInputSchema) ]),
}).strict();

export const DetailUpdateManyWithWhereWithoutObjectInputSchema: z.ZodType<Prisma.DetailUpdateManyWithWhereWithoutObjectInput> = z.object({
  where: z.lazy(() => DetailScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DetailUpdateManyMutationInputSchema),z.lazy(() => DetailUncheckedUpdateManyWithoutObjectInputSchema) ]),
}).strict();

export const DetailScalarWhereInputSchema: z.ZodType<Prisma.DetailScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DetailScalarWhereInputSchema),z.lazy(() => DetailScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DetailScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DetailScalarWhereInputSchema),z.lazy(() => DetailScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const FrequentQuestionUpsertWithWhereUniqueWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUpsertWithWhereUniqueWithoutObjectInput> = z.object({
  where: z.lazy(() => FrequentQuestionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FrequentQuestionUpdateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedUpdateWithoutObjectInputSchema) ]),
  create: z.union([ z.lazy(() => FrequentQuestionCreateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedCreateWithoutObjectInputSchema) ]),
}).strict();

export const FrequentQuestionUpdateWithWhereUniqueWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUpdateWithWhereUniqueWithoutObjectInput> = z.object({
  where: z.lazy(() => FrequentQuestionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FrequentQuestionUpdateWithoutObjectInputSchema),z.lazy(() => FrequentQuestionUncheckedUpdateWithoutObjectInputSchema) ]),
}).strict();

export const FrequentQuestionUpdateManyWithWhereWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUpdateManyWithWhereWithoutObjectInput> = z.object({
  where: z.lazy(() => FrequentQuestionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FrequentQuestionUpdateManyMutationInputSchema),z.lazy(() => FrequentQuestionUncheckedUpdateManyWithoutObjectInputSchema) ]),
}).strict();

export const FrequentQuestionScalarWhereInputSchema: z.ZodType<Prisma.FrequentQuestionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FrequentQuestionScalarWhereInputSchema),z.lazy(() => FrequentQuestionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FrequentQuestionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FrequentQuestionScalarWhereInputSchema),z.lazy(() => FrequentQuestionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  objectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutObjectInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutObjectInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutObjectInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutObjectInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutObjectInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutObjectInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutObjectInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutObjectInputSchema) ]),
}).strict();

export const ReviewScalarWhereInputSchema: z.ZodType<Prisma.ReviewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reviewableId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reviewableType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  objectId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ObjectCreateWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectCreateWithoutFrequentQuestionsInput> = z.object({
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  details: z.lazy(() => DetailCreateNestedManyWithoutObjectInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectUncheckedCreateWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectUncheckedCreateWithoutFrequentQuestionsInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  details: z.lazy(() => DetailUncheckedCreateNestedManyWithoutObjectInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectCreateOrConnectWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectCreateOrConnectWithoutFrequentQuestionsInput> = z.object({
  where: z.lazy(() => ObjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ObjectCreateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutFrequentQuestionsInputSchema) ]),
}).strict();

export const ObjectUpsertWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectUpsertWithoutFrequentQuestionsInput> = z.object({
  update: z.union([ z.lazy(() => ObjectUpdateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutFrequentQuestionsInputSchema) ]),
  create: z.union([ z.lazy(() => ObjectCreateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutFrequentQuestionsInputSchema) ]),
  where: z.lazy(() => ObjectWhereInputSchema).optional()
}).strict();

export const ObjectUpdateToOneWithWhereWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectUpdateToOneWithWhereWithoutFrequentQuestionsInput> = z.object({
  where: z.lazy(() => ObjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ObjectUpdateWithoutFrequentQuestionsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutFrequentQuestionsInputSchema) ]),
}).strict();

export const ObjectUpdateWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectUpdateWithoutFrequentQuestionsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.lazy(() => DetailUpdateManyWithoutObjectNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const ObjectUncheckedUpdateWithoutFrequentQuestionsInputSchema: z.ZodType<Prisma.ObjectUncheckedUpdateWithoutFrequentQuestionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.lazy(() => DetailUncheckedUpdateManyWithoutObjectNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const ObjectCreateWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectCreateWithoutDetailsInput> = z.object({
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionCreateNestedManyWithoutObjectInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectUncheckedCreateWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectUncheckedCreateWithoutDetailsInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUncheckedCreateNestedManyWithoutObjectInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectCreateOrConnectWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectCreateOrConnectWithoutDetailsInput> = z.object({
  where: z.lazy(() => ObjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ObjectCreateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutDetailsInputSchema) ]),
}).strict();

export const ObjectUpsertWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectUpsertWithoutDetailsInput> = z.object({
  update: z.union([ z.lazy(() => ObjectUpdateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutDetailsInputSchema) ]),
  create: z.union([ z.lazy(() => ObjectCreateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutDetailsInputSchema) ]),
  where: z.lazy(() => ObjectWhereInputSchema).optional()
}).strict();

export const ObjectUpdateToOneWithWhereWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectUpdateToOneWithWhereWithoutDetailsInput> = z.object({
  where: z.lazy(() => ObjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ObjectUpdateWithoutDetailsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutDetailsInputSchema) ]),
}).strict();

export const ObjectUpdateWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectUpdateWithoutDetailsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUpdateManyWithoutObjectNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const ObjectUncheckedUpdateWithoutDetailsInputSchema: z.ZodType<Prisma.ObjectUncheckedUpdateWithoutDetailsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUncheckedUpdateManyWithoutObjectNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const RentCreateWithoutHostInputSchema: z.ZodType<Prisma.RentCreateWithoutHostInput> = z.object({
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUncheckedCreateWithoutHostInputSchema: z.ZodType<Prisma.RentUncheckedCreateWithoutHostInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentCreateOrConnectWithoutHostInputSchema: z.ZodType<Prisma.RentCreateOrConnectWithoutHostInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentCreateWithoutHostInputSchema),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema) ]),
}).strict();

export const RentCreateManyHostInputEnvelopeSchema: z.ZodType<Prisma.RentCreateManyHostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RentCreateManyHostInputSchema),z.lazy(() => RentCreateManyHostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateWithoutUserInput> = z.object({
  rating: z.number(),
  comment: z.string(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  object: z.lazy(() => ObjectCreateNestedOneWithoutReviewsInputSchema).optional(),
  rent: z.lazy(() => RentCreateNestedOneWithoutReviewsInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  objectId: z.number().int().optional().nullable(),
  rentId: z.number().int().optional().nullable()
}).strict();

export const ReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyUserInputSchema),z.lazy(() => ReviewCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RentBookingCreateWithoutUserInputSchema: z.ZodType<Prisma.RentBookingCreateWithoutUserInput> = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Rent: z.lazy(() => RentCreateNestedOneWithoutBookingsInputSchema),
  Room: z.lazy(() => RoomCreateNestedOneWithoutBookingsInputSchema).optional()
}).strict();

export const RentBookingUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  rentId: z.number().int(),
  roomId: z.number().int().optional().nullable(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentBookingCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RentBookingCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentBookingCreateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RentBookingCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RentBookingCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RentBookingCreateManyUserInputSchema),z.lazy(() => RentBookingCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RentUpsertWithWhereUniqueWithoutHostInputSchema: z.ZodType<Prisma.RentUpsertWithWhereUniqueWithoutHostInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RentUpdateWithoutHostInputSchema),z.lazy(() => RentUncheckedUpdateWithoutHostInputSchema) ]),
  create: z.union([ z.lazy(() => RentCreateWithoutHostInputSchema),z.lazy(() => RentUncheckedCreateWithoutHostInputSchema) ]),
}).strict();

export const RentUpdateWithWhereUniqueWithoutHostInputSchema: z.ZodType<Prisma.RentUpdateWithWhereUniqueWithoutHostInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RentUpdateWithoutHostInputSchema),z.lazy(() => RentUncheckedUpdateWithoutHostInputSchema) ]),
}).strict();

export const RentUpdateManyWithWhereWithoutHostInputSchema: z.ZodType<Prisma.RentUpdateManyWithWhereWithoutHostInput> = z.object({
  where: z.lazy(() => RentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RentUpdateManyMutationInputSchema),z.lazy(() => RentUncheckedUpdateManyWithoutHostInputSchema) ]),
}).strict();

export const RentScalarWhereInputSchema: z.ZodType<Prisma.RentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RentScalarWhereInputSchema),z.lazy(() => RentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentScalarWhereInputSchema),z.lazy(() => RentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  profile_photo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  department: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  collection: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  type: z.union([ z.lazy(() => EnumRentTypeFilterSchema),z.lazy(() => RentTypeSchema) ]).optional(),
  capacity: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RentBookingUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RentBookingUpdateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RentBookingCreateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RentBookingUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RentBookingUpdateWithoutUserInputSchema),z.lazy(() => RentBookingUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RentBookingUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RentBookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RentBookingUpdateManyMutationInputSchema),z.lazy(() => RentBookingUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RentBookingScalarWhereInputSchema: z.ZodType<Prisma.RentBookingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RentBookingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RentBookingScalarWhereInputSchema),z.lazy(() => RentBookingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  rentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roomId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumBookingStatusFilterSchema),z.lazy(() => BookingStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutRentsInputSchema: z.ZodType<Prisma.UserCreateWithoutRentsInput> = z.object({
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsInputSchema) ]),
}).strict();

export const ReviewCreateWithoutRentInputSchema: z.ZodType<Prisma.ReviewCreateWithoutRentInput> = z.object({
  rating: z.number(),
  comment: z.string(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  object: z.lazy(() => ObjectCreateNestedOneWithoutReviewsInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutRentInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutRentInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  objectId: z.number().int().optional().nullable()
}).strict();

export const ReviewCreateOrConnectWithoutRentInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutRentInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema) ]),
}).strict();

export const ReviewCreateManyRentInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyRentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyRentInputSchema),z.lazy(() => ReviewCreateManyRentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ServiceCreateWithoutRentsInputSchema: z.ZodType<Prisma.ServiceCreateWithoutRentsInput> = z.object({
  icon: z.string().optional().nullable(),
  name: z.string(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutAmenitiesInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutRentsInput> = z.object({
  id: z.number().int().optional(),
  icon: z.string().optional().nullable(),
  name: z.string(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutAmenitiesInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutRentsInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutRentsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema) ]),
}).strict();

export const RentBookingCreateWithoutRentInputSchema: z.ZodType<Prisma.RentBookingCreateWithoutRentInput> = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutRentsBookingsInputSchema).optional(),
  Room: z.lazy(() => RoomCreateNestedOneWithoutBookingsInputSchema).optional()
}).strict();

export const RentBookingUncheckedCreateWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateWithoutRentInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().optional().nullable(),
  roomId: z.number().int().optional().nullable(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentBookingCreateOrConnectWithoutRentInputSchema: z.ZodType<Prisma.RentBookingCreateOrConnectWithoutRentInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema) ]),
}).strict();

export const RentBookingCreateManyRentInputEnvelopeSchema: z.ZodType<Prisma.RentBookingCreateManyRentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RentBookingCreateManyRentInputSchema),z.lazy(() => RentBookingCreateManyRentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RoomCreateWithoutRentInputSchema: z.ZodType<Prisma.RoomCreateWithoutRentInput> = z.object({
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  amenities: z.lazy(() => ServiceCreateNestedManyWithoutRoomsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutRentInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutRentInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  amenities: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRoomsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutRentInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutRentInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutRentInputSchema),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema) ]),
}).strict();

export const RoomCreateManyRentInputEnvelopeSchema: z.ZodType<Prisma.RoomCreateManyRentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RoomCreateManyRentInputSchema),z.lazy(() => RoomCreateManyRentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutRentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutRentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutRentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutRentInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutRentInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutRentInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutRentInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutRentInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutRentInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutRentInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutRentInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutRentInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutRentInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutRentInputSchema) ]),
}).strict();

export const ServiceUpsertWithWhereUniqueWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUpsertWithWhereUniqueWithoutRentsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceUpdateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutRentsInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRentsInputSchema) ]),
}).strict();

export const ServiceUpdateWithWhereUniqueWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUpdateWithWhereUniqueWithoutRentsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutRentsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutRentsInputSchema) ]),
}).strict();

export const ServiceUpdateManyWithWhereWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithWhereWithoutRentsInput> = z.object({
  where: z.lazy(() => ServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateManyMutationInputSchema),z.lazy(() => ServiceUncheckedUpdateManyWithoutRentsInputSchema) ]),
}).strict();

export const ServiceScalarWhereInputSchema: z.ZodType<Prisma.ServiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RentBookingUpsertWithWhereUniqueWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUpsertWithWhereUniqueWithoutRentInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RentBookingUpdateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedUpdateWithoutRentInputSchema) ]),
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRentInputSchema) ]),
}).strict();

export const RentBookingUpdateWithWhereUniqueWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUpdateWithWhereUniqueWithoutRentInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RentBookingUpdateWithoutRentInputSchema),z.lazy(() => RentBookingUncheckedUpdateWithoutRentInputSchema) ]),
}).strict();

export const RentBookingUpdateManyWithWhereWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUpdateManyWithWhereWithoutRentInput> = z.object({
  where: z.lazy(() => RentBookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RentBookingUpdateManyMutationInputSchema),z.lazy(() => RentBookingUncheckedUpdateManyWithoutRentInputSchema) ]),
}).strict();

export const RoomUpsertWithWhereUniqueWithoutRentInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutRentInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoomUpdateWithoutRentInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutRentInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutRentInputSchema),z.lazy(() => RoomUncheckedCreateWithoutRentInputSchema) ]),
}).strict();

export const RoomUpdateWithWhereUniqueWithoutRentInputSchema: z.ZodType<Prisma.RoomUpdateWithWhereUniqueWithoutRentInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateWithoutRentInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutRentInputSchema) ]),
}).strict();

export const RoomUpdateManyWithWhereWithoutRentInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutRentInput> = z.object({
  where: z.lazy(() => RoomScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateManyMutationInputSchema),z.lazy(() => RoomUncheckedUpdateManyWithoutRentInputSchema) ]),
}).strict();

export const RoomScalarWhereInputSchema: z.ZodType<Prisma.RoomScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  single_bed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  queen_bed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  king_bed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  photos: z.lazy(() => StringNullableListFilterSchema).optional(),
  rules: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RentCreateWithoutServicesInputSchema: z.ZodType<Prisma.RentCreateWithoutServicesInput> = z.object({
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  host: z.lazy(() => UserCreateNestedOneWithoutRentsInputSchema),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutRentInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUncheckedCreateWithoutServicesInputSchema: z.ZodType<Prisma.RentUncheckedCreateWithoutServicesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentCreateOrConnectWithoutServicesInputSchema: z.ZodType<Prisma.RentCreateOrConnectWithoutServicesInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentCreateWithoutServicesInputSchema),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema) ]),
}).strict();

export const RoomCreateWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomCreateWithoutAmenitiesInput> = z.object({
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rent: z.lazy(() => RentCreateNestedOneWithoutRoomsInputSchema),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutAmenitiesInput> = z.object({
  id: z.number().int().optional(),
  rentId: z.number().int(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutAmenitiesInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema) ]),
}).strict();

export const RentUpsertWithWhereUniqueWithoutServicesInputSchema: z.ZodType<Prisma.RentUpsertWithWhereUniqueWithoutServicesInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RentUpdateWithoutServicesInputSchema),z.lazy(() => RentUncheckedUpdateWithoutServicesInputSchema) ]),
  create: z.union([ z.lazy(() => RentCreateWithoutServicesInputSchema),z.lazy(() => RentUncheckedCreateWithoutServicesInputSchema) ]),
}).strict();

export const RentUpdateWithWhereUniqueWithoutServicesInputSchema: z.ZodType<Prisma.RentUpdateWithWhereUniqueWithoutServicesInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RentUpdateWithoutServicesInputSchema),z.lazy(() => RentUncheckedUpdateWithoutServicesInputSchema) ]),
}).strict();

export const RentUpdateManyWithWhereWithoutServicesInputSchema: z.ZodType<Prisma.RentUpdateManyWithWhereWithoutServicesInput> = z.object({
  where: z.lazy(() => RentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RentUpdateManyMutationInputSchema),z.lazy(() => RentUncheckedUpdateManyWithoutServicesInputSchema) ]),
}).strict();

export const RoomUpsertWithWhereUniqueWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutAmenitiesInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoomUpdateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutAmenitiesInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutAmenitiesInputSchema) ]),
}).strict();

export const RoomUpdateWithWhereUniqueWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUpdateWithWhereUniqueWithoutAmenitiesInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateWithoutAmenitiesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutAmenitiesInputSchema) ]),
}).strict();

export const RoomUpdateManyWithWhereWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutAmenitiesInput> = z.object({
  where: z.lazy(() => RoomScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateManyMutationInputSchema),z.lazy(() => RoomUncheckedUpdateManyWithoutAmenitiesInputSchema) ]),
}).strict();

export const RentCreateWithoutRoomsInputSchema: z.ZodType<Prisma.RentCreateWithoutRoomsInput> = z.object({
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  host: z.lazy(() => UserCreateNestedOneWithoutRentsInputSchema),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUncheckedCreateWithoutRoomsInputSchema: z.ZodType<Prisma.RentUncheckedCreateWithoutRoomsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.RentCreateOrConnectWithoutRoomsInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentCreateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export const ServiceCreateWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceCreateWithoutRoomsInput> = z.object({
  icon: z.string().optional().nullable(),
  name: z.string(),
  rents: z.lazy(() => RentCreateNestedManyWithoutServicesInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutRoomsInput> = z.object({
  id: z.number().int().optional(),
  icon: z.string().optional().nullable(),
  name: z.string(),
  rents: z.lazy(() => RentUncheckedCreateNestedManyWithoutServicesInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutRoomsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export const RentBookingCreateWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingCreateWithoutRoomInput> = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutRentsBookingsInputSchema).optional(),
  Rent: z.lazy(() => RentCreateNestedOneWithoutBookingsInputSchema)
}).strict();

export const RentBookingUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUncheckedCreateWithoutRoomInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().optional().nullable(),
  rentId: z.number().int(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentBookingCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingCreateOrConnectWithoutRoomInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const RentBookingCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.RentBookingCreateManyRoomInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RentBookingCreateManyRoomInputSchema),z.lazy(() => RentBookingCreateManyRoomInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RentUpsertWithoutRoomsInputSchema: z.ZodType<Prisma.RentUpsertWithoutRoomsInput> = z.object({
  update: z.union([ z.lazy(() => RentUpdateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutRoomsInputSchema) ]),
  create: z.union([ z.lazy(() => RentCreateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedCreateWithoutRoomsInputSchema) ]),
  where: z.lazy(() => RentWhereInputSchema).optional()
}).strict();

export const RentUpdateToOneWithWhereWithoutRoomsInputSchema: z.ZodType<Prisma.RentUpdateToOneWithWhereWithoutRoomsInput> = z.object({
  where: z.lazy(() => RentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RentUpdateWithoutRoomsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutRoomsInputSchema) ]),
}).strict();

export const RentUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.RentUpdateWithoutRoomsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.lazy(() => UserUpdateOneRequiredWithoutRentsNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.RentUncheckedUpdateWithoutRoomsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const ServiceUpsertWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUpsertWithWhereUniqueWithoutRoomsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceUpdateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutRoomsInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export const ServiceUpdateWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUpdateWithWhereUniqueWithoutRoomsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutRoomsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutRoomsInputSchema) ]),
}).strict();

export const ServiceUpdateManyWithWhereWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithWhereWithoutRoomsInput> = z.object({
  where: z.lazy(() => ServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateManyMutationInputSchema),z.lazy(() => ServiceUncheckedUpdateManyWithoutRoomsInputSchema) ]),
}).strict();

export const RentBookingUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RentBookingUpdateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => RentBookingCreateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const RentBookingUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUpdateWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => RentBookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RentBookingUpdateWithoutRoomInputSchema),z.lazy(() => RentBookingUncheckedUpdateWithoutRoomInputSchema) ]),
}).strict();

export const RentBookingUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUpdateManyWithWhereWithoutRoomInput> = z.object({
  where: z.lazy(() => RentBookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RentBookingUpdateManyMutationInputSchema),z.lazy(() => RentBookingUncheckedUpdateManyWithoutRoomInputSchema) ]),
}).strict();

export const UserCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewsInput> = z.object({
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rents: z.lazy(() => RentCreateNestedManyWithoutHostInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rents: z.lazy(() => RentUncheckedCreateNestedManyWithoutHostInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const ObjectCreateWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectCreateWithoutReviewsInput> = z.object({
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  details: z.lazy(() => DetailCreateNestedManyWithoutObjectInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  image: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  details: z.lazy(() => DetailUncheckedCreateNestedManyWithoutObjectInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUncheckedCreateNestedManyWithoutObjectInputSchema).optional()
}).strict();

export const ObjectCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => ObjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ObjectCreateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const RentCreateWithoutReviewsInputSchema: z.ZodType<Prisma.RentCreateWithoutReviewsInput> = z.object({
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  host: z.lazy(() => UserCreateNestedOneWithoutRentsInputSchema),
  services: z.lazy(() => ServiceCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.RentUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRentsInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.RentCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentCreateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const UserUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUpdateManyWithoutHostNestedInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUncheckedUpdateManyWithoutHostNestedInputSchema).optional(),
  rentsBookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ObjectUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => ObjectUpdateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => ObjectCreateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => ObjectWhereInputSchema).optional()
}).strict();

export const ObjectUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => ObjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ObjectUpdateWithoutReviewsInputSchema),z.lazy(() => ObjectUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const ObjectUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectUpdateWithoutReviewsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.lazy(() => DetailUpdateManyWithoutObjectNestedInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const ObjectUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.ObjectUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subtitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.lazy(() => DetailUncheckedUpdateManyWithoutObjectNestedInputSchema).optional(),
  frequentQuestions: z.lazy(() => FrequentQuestionUncheckedUpdateManyWithoutObjectNestedInputSchema).optional()
}).strict();

export const RentUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.RentUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => RentUpdateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => RentCreateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => RentWhereInputSchema).optional()
}).strict();

export const RentUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.RentUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => RentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RentUpdateWithoutReviewsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const RentUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.RentUpdateWithoutReviewsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.lazy(() => UserUpdateOneRequiredWithoutRentsNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.RentUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserCreateWithoutRentsBookingsInput> = z.object({
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rents: z.lazy(() => RentCreateNestedManyWithoutHostInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRentsBookingsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rents: z.lazy(() => RentUncheckedCreateNestedManyWithoutHostInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRentsBookingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsBookingsInputSchema) ]),
}).strict();

export const RentCreateWithoutBookingsInputSchema: z.ZodType<Prisma.RentCreateWithoutBookingsInput> = z.object({
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  host: z.lazy(() => UserCreateNestedOneWithoutRentsInputSchema),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutRentsInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentUncheckedCreateWithoutBookingsInputSchema: z.ZodType<Prisma.RentUncheckedCreateWithoutBookingsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  hostId: z.number().int(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutRentInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRentsInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutRentInputSchema).optional()
}).strict();

export const RentCreateOrConnectWithoutBookingsInputSchema: z.ZodType<Prisma.RentCreateOrConnectWithoutBookingsInput> = z.object({
  where: z.lazy(() => RentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RentCreateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedCreateWithoutBookingsInputSchema) ]),
}).strict();

export const RoomCreateWithoutBookingsInputSchema: z.ZodType<Prisma.RoomCreateWithoutBookingsInput> = z.object({
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rent: z.lazy(() => RentCreateNestedOneWithoutRoomsInputSchema),
  amenities: z.lazy(() => ServiceCreateNestedManyWithoutRoomsInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutBookingsInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutBookingsInput> = z.object({
  id: z.number().int().optional(),
  rentId: z.number().int(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  amenities: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutRoomsInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutBookingsInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutBookingsInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedCreateWithoutBookingsInputSchema) ]),
}).strict();

export const UserUpsertWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserUpsertWithoutRentsBookingsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRentsBookingsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRentsBookingsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRentsBookingsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRentsBookingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRentsBookingsInputSchema) ]),
}).strict();

export const UserUpdateWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRentsBookingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUpdateManyWithoutHostNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRentsBookingsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRentsBookingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUncheckedUpdateManyWithoutHostNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RentUpsertWithoutBookingsInputSchema: z.ZodType<Prisma.RentUpsertWithoutBookingsInput> = z.object({
  update: z.union([ z.lazy(() => RentUpdateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutBookingsInputSchema) ]),
  create: z.union([ z.lazy(() => RentCreateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedCreateWithoutBookingsInputSchema) ]),
  where: z.lazy(() => RentWhereInputSchema).optional()
}).strict();

export const RentUpdateToOneWithWhereWithoutBookingsInputSchema: z.ZodType<Prisma.RentUpdateToOneWithWhereWithoutBookingsInput> = z.object({
  where: z.lazy(() => RentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RentUpdateWithoutBookingsInputSchema),z.lazy(() => RentUncheckedUpdateWithoutBookingsInputSchema) ]),
}).strict();

export const RentUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.RentUpdateWithoutBookingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.lazy(() => UserUpdateOneRequiredWithoutRentsNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUpdateManyWithoutRentsNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.RentUncheckedUpdateWithoutBookingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutRentsNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RoomUpsertWithoutBookingsInputSchema: z.ZodType<Prisma.RoomUpsertWithoutBookingsInput> = z.object({
  update: z.union([ z.lazy(() => RoomUpdateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutBookingsInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedCreateWithoutBookingsInputSchema) ]),
  where: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const RoomUpdateToOneWithWhereWithoutBookingsInputSchema: z.ZodType<Prisma.RoomUpdateToOneWithWhereWithoutBookingsInput> = z.object({
  where: z.lazy(() => RoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoomUpdateWithoutBookingsInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutBookingsInputSchema) ]),
}).strict();

export const RoomUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.RoomUpdateWithoutBookingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.lazy(() => RentUpdateOneRequiredWithoutRoomsNestedInputSchema).optional(),
  amenities: z.lazy(() => ServiceUpdateManyWithoutRoomsNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutBookingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amenities: z.lazy(() => ServiceUncheckedUpdateManyWithoutRoomsNestedInputSchema).optional()
}).strict();

export const DetailCreateManyObjectInputSchema: z.ZodType<Prisma.DetailCreateManyObjectInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string()
}).strict();

export const FrequentQuestionCreateManyObjectInputSchema: z.ZodType<Prisma.FrequentQuestionCreateManyObjectInput> = z.object({
  id: z.number().int().optional(),
  question: z.string(),
  answer: z.string()
}).strict();

export const ReviewCreateManyObjectInputSchema: z.ZodType<Prisma.ReviewCreateManyObjectInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rentId: z.number().int().optional().nullable()
}).strict();

export const DetailUpdateWithoutObjectInputSchema: z.ZodType<Prisma.DetailUpdateWithoutObjectInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DetailUncheckedUpdateWithoutObjectInputSchema: z.ZodType<Prisma.DetailUncheckedUpdateWithoutObjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DetailUncheckedUpdateManyWithoutObjectInputSchema: z.ZodType<Prisma.DetailUncheckedUpdateManyWithoutObjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionUpdateWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUpdateWithoutObjectInput> = z.object({
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionUncheckedUpdateWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedUpdateWithoutObjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FrequentQuestionUncheckedUpdateManyWithoutObjectInputSchema: z.ZodType<Prisma.FrequentQuestionUncheckedUpdateManyWithoutObjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUpdateWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutObjectInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  rent: z.lazy(() => RentUpdateOneWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutObjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutObjectInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutObjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RentCreateManyHostInputSchema: z.ZodType<Prisma.RentCreateManyHostInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  price: z.number(),
  profile_photo: z.string(),
  slug: z.string(),
  department: z.string().optional(),
  city: z.string().optional(),
  description: z.string(),
  collection: z.union([ z.lazy(() => RentCreatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentCreaterulesInputSchema),z.string().array() ]).optional(),
  type: z.lazy(() => RentTypeSchema).optional(),
  capacity: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewCreateManyUserInputSchema: z.ZodType<Prisma.ReviewCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  objectId: z.number().int().optional().nullable(),
  rentId: z.number().int().optional().nullable()
}).strict();

export const RentBookingCreateManyUserInputSchema: z.ZodType<Prisma.RentBookingCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  rentId: z.number().int(),
  roomId: z.number().int().optional().nullable(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RentUpdateWithoutHostInputSchema: z.ZodType<Prisma.RentUpdateWithoutHostInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateWithoutHostInputSchema: z.ZodType<Prisma.RentUncheckedUpdateWithoutHostInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutRentsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateManyWithoutHostInputSchema: z.ZodType<Prisma.RentUncheckedUpdateManyWithoutHostInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutUserInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  object: z.lazy(() => ObjectUpdateOneWithoutReviewsNestedInputSchema).optional(),
  rent: z.lazy(() => RentUpdateOneWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RentBookingUpdateWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUpdateWithoutUserInput> = z.object({
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Rent: z.lazy(() => RentUpdateOneRequiredWithoutBookingsNestedInputSchema).optional(),
  Room: z.lazy(() => RoomUpdateOneWithoutBookingsNestedInputSchema).optional()
}).strict();

export const RentBookingUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateManyRentInputSchema: z.ZodType<Prisma.ReviewCreateManyRentInput> = z.object({
  id: z.number().int().optional(),
  rating: z.number(),
  comment: z.string(),
  userId: z.number().int(),
  reviewableId: z.number().int(),
  reviewableType: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  objectId: z.number().int().optional().nullable()
}).strict();

export const RentBookingCreateManyRentInputSchema: z.ZodType<Prisma.RentBookingCreateManyRentInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().optional().nullable(),
  roomId: z.number().int().optional().nullable(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoomCreateManyRentInputSchema: z.ZodType<Prisma.RoomCreateManyRentInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  single_bed: z.number().int(),
  queen_bed: z.number().int(),
  king_bed: z.number().int(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string().optional().nullable(),
  photos: z.union([ z.lazy(() => RoomCreatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomCreaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewUpdateWithoutRentInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutRentInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  object: z.lazy(() => ObjectUpdateOneWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutRentInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutRentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutRentInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutRentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reviewableType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  objectId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceUpdateWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutRentsInput> = z.object({
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutAmenitiesNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutRentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutAmenitiesNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateManyWithoutRentsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutRentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingUpdateWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUpdateWithoutRentInput> = z.object({
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutRentsBookingsNestedInputSchema).optional(),
  Room: z.lazy(() => RoomUpdateOneWithoutBookingsNestedInputSchema).optional()
}).strict();

export const RentBookingUncheckedUpdateWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateWithoutRentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyWithoutRentInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyWithoutRentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomUpdateWithoutRentInputSchema: z.ZodType<Prisma.RoomUpdateWithoutRentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amenities: z.lazy(() => ServiceUpdateManyWithoutRoomsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutRentInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutRentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amenities: z.lazy(() => ServiceUncheckedUpdateManyWithoutRoomsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateManyWithoutRentInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutRentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentUpdateWithoutServicesInputSchema: z.ZodType<Prisma.RentUpdateWithoutServicesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.lazy(() => UserUpdateOneRequiredWithoutRentsNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutRentNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateWithoutServicesInputSchema: z.ZodType<Prisma.RentUncheckedUpdateWithoutServicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRentNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutRentNestedInputSchema).optional()
}).strict();

export const RentUncheckedUpdateManyWithoutServicesInputSchema: z.ZodType<Prisma.RentUncheckedUpdateManyWithoutServicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  profile_photo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.lazy(() => RentUpdatecollectionInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RentUpdaterulesInputSchema),z.string().array() ]).optional(),
  type: z.union([ z.lazy(() => RentTypeSchema),z.lazy(() => EnumRentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomUpdateWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUpdateWithoutAmenitiesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.lazy(() => RentUpdateOneRequiredWithoutRoomsNestedInputSchema).optional(),
  bookings: z.lazy(() => RentBookingUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutAmenitiesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => RentBookingUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateManyWithoutAmenitiesInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutAmenitiesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  single_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  queen_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  king_bed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.lazy(() => RoomUpdatephotosInputSchema),z.string().array() ]).optional(),
  rules: z.union([ z.lazy(() => RoomUpdaterulesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingCreateManyRoomInputSchema: z.ZodType<Prisma.RentBookingCreateManyRoomInput> = z.object({
  id: z.number().int().optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.number().int().optional().nullable(),
  rentId: z.number().int(),
  status: z.lazy(() => BookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ServiceUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutRoomsInput> = z.object({
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUpdateManyWithoutServicesNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutRoomsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rents: z.lazy(() => RentUncheckedUpdateManyWithoutServicesNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateManyWithoutRoomsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutRoomsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingUpdateWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUpdateWithoutRoomInput> = z.object({
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutRentsBookingsNestedInputSchema).optional(),
  Rent: z.lazy(() => RentUpdateOneRequiredWithoutBookingsNestedInputSchema).optional()
}).strict();

export const RentBookingUncheckedUpdateWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RentBookingUncheckedUpdateManyWithoutRoomInputSchema: z.ZodType<Prisma.RentBookingUncheckedUpdateManyWithoutRoomInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusSchema),z.lazy(() => EnumBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ObjectFindFirstArgsSchema: z.ZodType<Prisma.ObjectFindFirstArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereInputSchema.optional(),
  orderBy: z.union([ ObjectOrderByWithRelationInputSchema.array(),ObjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ObjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ObjectScalarFieldEnumSchema,ObjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ObjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ObjectFindFirstOrThrowArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereInputSchema.optional(),
  orderBy: z.union([ ObjectOrderByWithRelationInputSchema.array(),ObjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ObjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ObjectScalarFieldEnumSchema,ObjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ObjectFindManyArgsSchema: z.ZodType<Prisma.ObjectFindManyArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereInputSchema.optional(),
  orderBy: z.union([ ObjectOrderByWithRelationInputSchema.array(),ObjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ObjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ObjectScalarFieldEnumSchema,ObjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ObjectAggregateArgsSchema: z.ZodType<Prisma.ObjectAggregateArgs> = z.object({
  where: ObjectWhereInputSchema.optional(),
  orderBy: z.union([ ObjectOrderByWithRelationInputSchema.array(),ObjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ObjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ObjectGroupByArgsSchema: z.ZodType<Prisma.ObjectGroupByArgs> = z.object({
  where: ObjectWhereInputSchema.optional(),
  orderBy: z.union([ ObjectOrderByWithAggregationInputSchema.array(),ObjectOrderByWithAggregationInputSchema ]).optional(),
  by: ObjectScalarFieldEnumSchema.array(),
  having: ObjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ObjectFindUniqueArgsSchema: z.ZodType<Prisma.ObjectFindUniqueArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereUniqueInputSchema,
}).strict() ;

export const ObjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ObjectFindUniqueOrThrowArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereUniqueInputSchema,
}).strict() ;

export const FrequentQuestionFindFirstArgsSchema: z.ZodType<Prisma.FrequentQuestionFindFirstArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FrequentQuestionOrderByWithRelationInputSchema.array(),FrequentQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FrequentQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FrequentQuestionScalarFieldEnumSchema,FrequentQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FrequentQuestionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FrequentQuestionFindFirstOrThrowArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FrequentQuestionOrderByWithRelationInputSchema.array(),FrequentQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FrequentQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FrequentQuestionScalarFieldEnumSchema,FrequentQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FrequentQuestionFindManyArgsSchema: z.ZodType<Prisma.FrequentQuestionFindManyArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FrequentQuestionOrderByWithRelationInputSchema.array(),FrequentQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FrequentQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FrequentQuestionScalarFieldEnumSchema,FrequentQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FrequentQuestionAggregateArgsSchema: z.ZodType<Prisma.FrequentQuestionAggregateArgs> = z.object({
  where: FrequentQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FrequentQuestionOrderByWithRelationInputSchema.array(),FrequentQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: FrequentQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FrequentQuestionGroupByArgsSchema: z.ZodType<Prisma.FrequentQuestionGroupByArgs> = z.object({
  where: FrequentQuestionWhereInputSchema.optional(),
  orderBy: z.union([ FrequentQuestionOrderByWithAggregationInputSchema.array(),FrequentQuestionOrderByWithAggregationInputSchema ]).optional(),
  by: FrequentQuestionScalarFieldEnumSchema.array(),
  having: FrequentQuestionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FrequentQuestionFindUniqueArgsSchema: z.ZodType<Prisma.FrequentQuestionFindUniqueArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereUniqueInputSchema,
}).strict() ;

export const FrequentQuestionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FrequentQuestionFindUniqueOrThrowArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereUniqueInputSchema,
}).strict() ;

export const DetailFindFirstArgsSchema: z.ZodType<Prisma.DetailFindFirstArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereInputSchema.optional(),
  orderBy: z.union([ DetailOrderByWithRelationInputSchema.array(),DetailOrderByWithRelationInputSchema ]).optional(),
  cursor: DetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DetailScalarFieldEnumSchema,DetailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DetailFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DetailFindFirstOrThrowArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereInputSchema.optional(),
  orderBy: z.union([ DetailOrderByWithRelationInputSchema.array(),DetailOrderByWithRelationInputSchema ]).optional(),
  cursor: DetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DetailScalarFieldEnumSchema,DetailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DetailFindManyArgsSchema: z.ZodType<Prisma.DetailFindManyArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereInputSchema.optional(),
  orderBy: z.union([ DetailOrderByWithRelationInputSchema.array(),DetailOrderByWithRelationInputSchema ]).optional(),
  cursor: DetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DetailScalarFieldEnumSchema,DetailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DetailAggregateArgsSchema: z.ZodType<Prisma.DetailAggregateArgs> = z.object({
  where: DetailWhereInputSchema.optional(),
  orderBy: z.union([ DetailOrderByWithRelationInputSchema.array(),DetailOrderByWithRelationInputSchema ]).optional(),
  cursor: DetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DetailGroupByArgsSchema: z.ZodType<Prisma.DetailGroupByArgs> = z.object({
  where: DetailWhereInputSchema.optional(),
  orderBy: z.union([ DetailOrderByWithAggregationInputSchema.array(),DetailOrderByWithAggregationInputSchema ]).optional(),
  by: DetailScalarFieldEnumSchema.array(),
  having: DetailScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DetailFindUniqueArgsSchema: z.ZodType<Prisma.DetailFindUniqueArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereUniqueInputSchema,
}).strict() ;

export const DetailFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DetailFindUniqueOrThrowArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const RentFindFirstArgsSchema: z.ZodType<Prisma.RentFindFirstArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereInputSchema.optional(),
  orderBy: z.union([ RentOrderByWithRelationInputSchema.array(),RentOrderByWithRelationInputSchema ]).optional(),
  cursor: RentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RentScalarFieldEnumSchema,RentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RentFindFirstOrThrowArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereInputSchema.optional(),
  orderBy: z.union([ RentOrderByWithRelationInputSchema.array(),RentOrderByWithRelationInputSchema ]).optional(),
  cursor: RentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RentScalarFieldEnumSchema,RentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RentFindManyArgsSchema: z.ZodType<Prisma.RentFindManyArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereInputSchema.optional(),
  orderBy: z.union([ RentOrderByWithRelationInputSchema.array(),RentOrderByWithRelationInputSchema ]).optional(),
  cursor: RentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RentScalarFieldEnumSchema,RentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RentAggregateArgsSchema: z.ZodType<Prisma.RentAggregateArgs> = z.object({
  where: RentWhereInputSchema.optional(),
  orderBy: z.union([ RentOrderByWithRelationInputSchema.array(),RentOrderByWithRelationInputSchema ]).optional(),
  cursor: RentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RentGroupByArgsSchema: z.ZodType<Prisma.RentGroupByArgs> = z.object({
  where: RentWhereInputSchema.optional(),
  orderBy: z.union([ RentOrderByWithAggregationInputSchema.array(),RentOrderByWithAggregationInputSchema ]).optional(),
  by: RentScalarFieldEnumSchema.array(),
  having: RentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RentFindUniqueArgsSchema: z.ZodType<Prisma.RentFindUniqueArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereUniqueInputSchema,
}).strict() ;

export const RentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RentFindUniqueOrThrowArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const RoomFindFirstArgsSchema: z.ZodType<Prisma.RoomFindFirstArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoomFindFirstOrThrowArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomFindManyArgsSchema: z.ZodType<Prisma.RoomFindManyArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomAggregateArgsSchema: z.ZodType<Prisma.RoomAggregateArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoomGroupByArgsSchema: z.ZodType<Prisma.RoomGroupByArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithAggregationInputSchema.array(),RoomOrderByWithAggregationInputSchema ]).optional(),
  by: RoomScalarFieldEnumSchema.array(),
  having: RoomScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoomFindUniqueArgsSchema: z.ZodType<Prisma.RoomFindUniqueArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoomFindUniqueOrThrowArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithAggregationInputSchema.array(),ReviewOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewScalarFieldEnumSchema.array(),
  having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const RentBookingFindFirstArgsSchema: z.ZodType<Prisma.RentBookingFindFirstArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereInputSchema.optional(),
  orderBy: z.union([ RentBookingOrderByWithRelationInputSchema.array(),RentBookingOrderByWithRelationInputSchema ]).optional(),
  cursor: RentBookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RentBookingScalarFieldEnumSchema,RentBookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RentBookingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RentBookingFindFirstOrThrowArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereInputSchema.optional(),
  orderBy: z.union([ RentBookingOrderByWithRelationInputSchema.array(),RentBookingOrderByWithRelationInputSchema ]).optional(),
  cursor: RentBookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RentBookingScalarFieldEnumSchema,RentBookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RentBookingFindManyArgsSchema: z.ZodType<Prisma.RentBookingFindManyArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereInputSchema.optional(),
  orderBy: z.union([ RentBookingOrderByWithRelationInputSchema.array(),RentBookingOrderByWithRelationInputSchema ]).optional(),
  cursor: RentBookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RentBookingScalarFieldEnumSchema,RentBookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RentBookingAggregateArgsSchema: z.ZodType<Prisma.RentBookingAggregateArgs> = z.object({
  where: RentBookingWhereInputSchema.optional(),
  orderBy: z.union([ RentBookingOrderByWithRelationInputSchema.array(),RentBookingOrderByWithRelationInputSchema ]).optional(),
  cursor: RentBookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RentBookingGroupByArgsSchema: z.ZodType<Prisma.RentBookingGroupByArgs> = z.object({
  where: RentBookingWhereInputSchema.optional(),
  orderBy: z.union([ RentBookingOrderByWithAggregationInputSchema.array(),RentBookingOrderByWithAggregationInputSchema ]).optional(),
  by: RentBookingScalarFieldEnumSchema.array(),
  having: RentBookingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RentBookingFindUniqueArgsSchema: z.ZodType<Prisma.RentBookingFindUniqueArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereUniqueInputSchema,
}).strict() ;

export const RentBookingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RentBookingFindUniqueOrThrowArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereUniqueInputSchema,
}).strict() ;

export const ObjectCreateArgsSchema: z.ZodType<Prisma.ObjectCreateArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  data: z.union([ ObjectCreateInputSchema,ObjectUncheckedCreateInputSchema ]),
}).strict() ;

export const ObjectUpsertArgsSchema: z.ZodType<Prisma.ObjectUpsertArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereUniqueInputSchema,
  create: z.union([ ObjectCreateInputSchema,ObjectUncheckedCreateInputSchema ]),
  update: z.union([ ObjectUpdateInputSchema,ObjectUncheckedUpdateInputSchema ]),
}).strict() ;

export const ObjectCreateManyArgsSchema: z.ZodType<Prisma.ObjectCreateManyArgs> = z.object({
  data: z.union([ ObjectCreateManyInputSchema,ObjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ObjectCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ObjectCreateManyAndReturnArgs> = z.object({
  data: z.union([ ObjectCreateManyInputSchema,ObjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ObjectDeleteArgsSchema: z.ZodType<Prisma.ObjectDeleteArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  where: ObjectWhereUniqueInputSchema,
}).strict() ;

export const ObjectUpdateArgsSchema: z.ZodType<Prisma.ObjectUpdateArgs> = z.object({
  select: ObjectSelectSchema.optional(),
  include: ObjectIncludeSchema.optional(),
  data: z.union([ ObjectUpdateInputSchema,ObjectUncheckedUpdateInputSchema ]),
  where: ObjectWhereUniqueInputSchema,
}).strict() ;

export const ObjectUpdateManyArgsSchema: z.ZodType<Prisma.ObjectUpdateManyArgs> = z.object({
  data: z.union([ ObjectUpdateManyMutationInputSchema,ObjectUncheckedUpdateManyInputSchema ]),
  where: ObjectWhereInputSchema.optional(),
}).strict() ;

export const ObjectDeleteManyArgsSchema: z.ZodType<Prisma.ObjectDeleteManyArgs> = z.object({
  where: ObjectWhereInputSchema.optional(),
}).strict() ;

export const FrequentQuestionCreateArgsSchema: z.ZodType<Prisma.FrequentQuestionCreateArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  data: z.union([ FrequentQuestionCreateInputSchema,FrequentQuestionUncheckedCreateInputSchema ]),
}).strict() ;

export const FrequentQuestionUpsertArgsSchema: z.ZodType<Prisma.FrequentQuestionUpsertArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereUniqueInputSchema,
  create: z.union([ FrequentQuestionCreateInputSchema,FrequentQuestionUncheckedCreateInputSchema ]),
  update: z.union([ FrequentQuestionUpdateInputSchema,FrequentQuestionUncheckedUpdateInputSchema ]),
}).strict() ;

export const FrequentQuestionCreateManyArgsSchema: z.ZodType<Prisma.FrequentQuestionCreateManyArgs> = z.object({
  data: z.union([ FrequentQuestionCreateManyInputSchema,FrequentQuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FrequentQuestionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FrequentQuestionCreateManyAndReturnArgs> = z.object({
  data: z.union([ FrequentQuestionCreateManyInputSchema,FrequentQuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FrequentQuestionDeleteArgsSchema: z.ZodType<Prisma.FrequentQuestionDeleteArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  where: FrequentQuestionWhereUniqueInputSchema,
}).strict() ;

export const FrequentQuestionUpdateArgsSchema: z.ZodType<Prisma.FrequentQuestionUpdateArgs> = z.object({
  select: FrequentQuestionSelectSchema.optional(),
  include: FrequentQuestionIncludeSchema.optional(),
  data: z.union([ FrequentQuestionUpdateInputSchema,FrequentQuestionUncheckedUpdateInputSchema ]),
  where: FrequentQuestionWhereUniqueInputSchema,
}).strict() ;

export const FrequentQuestionUpdateManyArgsSchema: z.ZodType<Prisma.FrequentQuestionUpdateManyArgs> = z.object({
  data: z.union([ FrequentQuestionUpdateManyMutationInputSchema,FrequentQuestionUncheckedUpdateManyInputSchema ]),
  where: FrequentQuestionWhereInputSchema.optional(),
}).strict() ;

export const FrequentQuestionDeleteManyArgsSchema: z.ZodType<Prisma.FrequentQuestionDeleteManyArgs> = z.object({
  where: FrequentQuestionWhereInputSchema.optional(),
}).strict() ;

export const DetailCreateArgsSchema: z.ZodType<Prisma.DetailCreateArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  data: z.union([ DetailCreateInputSchema,DetailUncheckedCreateInputSchema ]),
}).strict() ;

export const DetailUpsertArgsSchema: z.ZodType<Prisma.DetailUpsertArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereUniqueInputSchema,
  create: z.union([ DetailCreateInputSchema,DetailUncheckedCreateInputSchema ]),
  update: z.union([ DetailUpdateInputSchema,DetailUncheckedUpdateInputSchema ]),
}).strict() ;

export const DetailCreateManyArgsSchema: z.ZodType<Prisma.DetailCreateManyArgs> = z.object({
  data: z.union([ DetailCreateManyInputSchema,DetailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DetailCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DetailCreateManyAndReturnArgs> = z.object({
  data: z.union([ DetailCreateManyInputSchema,DetailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DetailDeleteArgsSchema: z.ZodType<Prisma.DetailDeleteArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  where: DetailWhereUniqueInputSchema,
}).strict() ;

export const DetailUpdateArgsSchema: z.ZodType<Prisma.DetailUpdateArgs> = z.object({
  select: DetailSelectSchema.optional(),
  include: DetailIncludeSchema.optional(),
  data: z.union([ DetailUpdateInputSchema,DetailUncheckedUpdateInputSchema ]),
  where: DetailWhereUniqueInputSchema,
}).strict() ;

export const DetailUpdateManyArgsSchema: z.ZodType<Prisma.DetailUpdateManyArgs> = z.object({
  data: z.union([ DetailUpdateManyMutationInputSchema,DetailUncheckedUpdateManyInputSchema ]),
  where: DetailWhereInputSchema.optional(),
}).strict() ;

export const DetailDeleteManyArgsSchema: z.ZodType<Prisma.DetailDeleteManyArgs> = z.object({
  where: DetailWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const RentCreateArgsSchema: z.ZodType<Prisma.RentCreateArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  data: z.union([ RentCreateInputSchema,RentUncheckedCreateInputSchema ]),
}).strict() ;

export const RentUpsertArgsSchema: z.ZodType<Prisma.RentUpsertArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereUniqueInputSchema,
  create: z.union([ RentCreateInputSchema,RentUncheckedCreateInputSchema ]),
  update: z.union([ RentUpdateInputSchema,RentUncheckedUpdateInputSchema ]),
}).strict() ;

export const RentCreateManyArgsSchema: z.ZodType<Prisma.RentCreateManyArgs> = z.object({
  data: z.union([ RentCreateManyInputSchema,RentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RentCreateManyAndReturnArgs> = z.object({
  data: z.union([ RentCreateManyInputSchema,RentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RentDeleteArgsSchema: z.ZodType<Prisma.RentDeleteArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  where: RentWhereUniqueInputSchema,
}).strict() ;

export const RentUpdateArgsSchema: z.ZodType<Prisma.RentUpdateArgs> = z.object({
  select: RentSelectSchema.optional(),
  include: RentIncludeSchema.optional(),
  data: z.union([ RentUpdateInputSchema,RentUncheckedUpdateInputSchema ]),
  where: RentWhereUniqueInputSchema,
}).strict() ;

export const RentUpdateManyArgsSchema: z.ZodType<Prisma.RentUpdateManyArgs> = z.object({
  data: z.union([ RentUpdateManyMutationInputSchema,RentUncheckedUpdateManyInputSchema ]),
  where: RentWhereInputSchema.optional(),
}).strict() ;

export const RentDeleteManyArgsSchema: z.ZodType<Prisma.RentDeleteManyArgs> = z.object({
  where: RentWhereInputSchema.optional(),
}).strict() ;

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const RoomCreateArgsSchema: z.ZodType<Prisma.RoomCreateArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  data: z.union([ RoomCreateInputSchema,RoomUncheckedCreateInputSchema ]),
}).strict() ;

export const RoomUpsertArgsSchema: z.ZodType<Prisma.RoomUpsertArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
  create: z.union([ RoomCreateInputSchema,RoomUncheckedCreateInputSchema ]),
  update: z.union([ RoomUpdateInputSchema,RoomUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoomCreateManyArgsSchema: z.ZodType<Prisma.RoomCreateManyArgs> = z.object({
  data: z.union([ RoomCreateManyInputSchema,RoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoomCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RoomCreateManyAndReturnArgs> = z.object({
  data: z.union([ RoomCreateManyInputSchema,RoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoomDeleteArgsSchema: z.ZodType<Prisma.RoomDeleteArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomUpdateArgsSchema: z.ZodType<Prisma.RoomUpdateArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  data: z.union([ RoomUpdateInputSchema,RoomUncheckedUpdateInputSchema ]),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomUpdateManyArgsSchema: z.ZodType<Prisma.RoomUpdateManyArgs> = z.object({
  data: z.union([ RoomUpdateManyMutationInputSchema,RoomUncheckedUpdateManyInputSchema ]),
  where: RoomWhereInputSchema.optional(),
}).strict() ;

export const RoomDeleteManyArgsSchema: z.ZodType<Prisma.RoomDeleteManyArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
}).strict() ;

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
}).strict() ;

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
  create: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
  update: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReviewCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> = z.object({
  data: z.union([ ReviewUpdateManyMutationInputSchema,ReviewUncheckedUpdateManyInputSchema ]),
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const RentBookingCreateArgsSchema: z.ZodType<Prisma.RentBookingCreateArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  data: z.union([ RentBookingCreateInputSchema,RentBookingUncheckedCreateInputSchema ]),
}).strict() ;

export const RentBookingUpsertArgsSchema: z.ZodType<Prisma.RentBookingUpsertArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereUniqueInputSchema,
  create: z.union([ RentBookingCreateInputSchema,RentBookingUncheckedCreateInputSchema ]),
  update: z.union([ RentBookingUpdateInputSchema,RentBookingUncheckedUpdateInputSchema ]),
}).strict() ;

export const RentBookingCreateManyArgsSchema: z.ZodType<Prisma.RentBookingCreateManyArgs> = z.object({
  data: z.union([ RentBookingCreateManyInputSchema,RentBookingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RentBookingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RentBookingCreateManyAndReturnArgs> = z.object({
  data: z.union([ RentBookingCreateManyInputSchema,RentBookingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RentBookingDeleteArgsSchema: z.ZodType<Prisma.RentBookingDeleteArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  where: RentBookingWhereUniqueInputSchema,
}).strict() ;

export const RentBookingUpdateArgsSchema: z.ZodType<Prisma.RentBookingUpdateArgs> = z.object({
  select: RentBookingSelectSchema.optional(),
  include: RentBookingIncludeSchema.optional(),
  data: z.union([ RentBookingUpdateInputSchema,RentBookingUncheckedUpdateInputSchema ]),
  where: RentBookingWhereUniqueInputSchema,
}).strict() ;

export const RentBookingUpdateManyArgsSchema: z.ZodType<Prisma.RentBookingUpdateManyArgs> = z.object({
  data: z.union([ RentBookingUpdateManyMutationInputSchema,RentBookingUncheckedUpdateManyInputSchema ]),
  where: RentBookingWhereInputSchema.optional(),
}).strict() ;

export const RentBookingDeleteManyArgsSchema: z.ZodType<Prisma.RentBookingDeleteManyArgs> = z.object({
  where: RentBookingWhereInputSchema.optional(),
}).strict() ;