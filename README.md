# To Do


- [x] Change current instance for an Apt type
- [x] Make sure Habitación section is not appearing
- [x] Make sure price dates are being filtered.
- [x] Make sure price is adjusting according to the dates.


~25mins: Bookings dates adjusting depending on Room selected.
- [x] Add MercadoBricks to Hotel reservation page
- [x] Check Apartment reservation still functioning
// validation
- [x] Validate that a disable day can't be included in the date range.
- [x] Past days are being disabled 
- [x] Make a warning if the number of people exceed the max capacity.
- [x] Block the payment until all the validations are exceeded.
- [ ] Once the payment is completed show a screen with the information of the booking.

- [ ] refactor some code: Code for hotel that s not necessary anymore on book-reservation (apartments only now).

```
## Current setup: To run project completely local.
- local database: Run database on Docker desktop
- The database connection is through prisma.

./prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

./.env.development.local
DATABASE_URL='postgresql://postgres:mysecretpassword@localhost:5432/postgres'
...

## Deployed: To run on vercel


./prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}

- Database env variables:
POSTGRES_URL="************"
POSTGRES_PRISMA_URL="************"
POSTGRES_URL_NO_SSL="************"
POSTGRES_URL_NON_POOLING="************"
POSTGRES_USER="************"
POSTGRES_HOST="************"
POSTGRES_PASSWORD="************"
POSTGRES_DATABASE="************"


```


## deploy
- [x] Build errors fixed: useCallback and useMemo distinction. Hooks properly setted up.
- [x] Page deployed on Vercel.
- [x] Database created. 
- [x] Database linked to project
- [x] Prisma studio editing now on top of remote postgres database.
- [x] Using uploadthings (free tier up to 2gbs) for images and files.
- [ ] Delete assets from public. At taking into account for build and slow things.
