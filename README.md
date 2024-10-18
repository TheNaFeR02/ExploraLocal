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
npm run dev and the schema below plus the env variables in .development. will run the project locally with the database on Docker Desktop.

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
npm run start with the env in place and the schema below, will run the project locally with the vercel database.

> before commiting and pushing, test the npm run build and the push will apply the changes immeadiatly.

./prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}

# [ ] move to .env.production.local
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
- [x] Delete assets from public. At taking into account for build and slow things.

- [x] leave the POSTGRES credentials on a env.production.local
- [x] leave DATABASE_URL on .env.development.local.
- [x] test to run both environments, the local db and vercel db
- [x] remember: dotenv-cli allow to use the env file I select. 
- [ ] Test transaction methods.
- [ ] MercadoPago production credentials. 
- [ ] Add a hotel: production database: w/ 3 rooms.

```
## To run local
```

- [ ] Seed database
- [ ] Services icons
- [ ] Assets from internet. One hotel & One Apartment
- [ ] Profile pic, collection, services, rules & rooms.
- [ ] Rent 
- [ ] Flow direction -> for payment, pse & bank transfer.
- [ ] Rent share screen, but button link is not changing for hotels in url when its a hotel.
- [ ] test real credit, debit and pse transactions. Check flow.


- [ ] Once the payment is complete, make sure to create the RentBooking so next time the dates won't appear as available.