import constants from './constants.js'
import { Database } from 'sqlite'
import Redis from 'ioredis'

const db = new Database(constants.sqlite_database)
const redis = new Redis(constants.redis)

const tavg_average_sql = `SELECT AVG(tavg)
                          FROM weather_measurements
                          WHERE date
                          BETWEEN (?) AND (?)`

/* Returns average of recorded daily temperature from the database. */
const getAverage = async (location, startDate, endDate) => {
  /* Dynamically generate the cache key */
  const cacheKey = `weather:${location}:${startDate}:${endDate}:average`

  /* Check Redis for cached entry first */
  let cacheEntry =  await redis.get(cacheKey)

  /* If Redis returns a cache hit, */
  if (cacheEntry) {
    cacheEntry = JSON.parse(cacheEntry)

    /* return the entry */
    return { ...cacheEntry, source : 'cache'}
  }

  /* If Redis returns a cache miss, fetch the entry from the database */
  await db.open()
  const dbEntry = await db.get(tavg_average_sql, [startDate, endDate])

  /* Add the entry we pulled from the database to the cache */
  redis.set(cacheKey, JSON.stringify(dbEntry), 'EX', 60 * 60 * 24)

  /* Return the database entry */
  return { ...dbEntry, source : 'database'}
}

const t0 = new Date().getTime()
const average = await getAverage('Iceland', '2010-01-01', '2020-11-01')
const t1 = new Date().getTime()
average.responseTime = `${t1-t0}ms`
console.log(average)
redis.quit()
process.exit()
