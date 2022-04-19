/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createPool, Pool } from 'mysql2'

let pool: Pool

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const init = () => {
  try {
    pool = createPool({
      connectionLimit: process.env.MYSQL_CONNECTION_LIMIT as unknown as number,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT as unknown as number
    })

    pool.getConnection((err) => {
      if (err) {
        return console.error(
          'error: ' + err.message)
      }
      console.log('connected')
      const createStatament =
            'CREATE TABLE movielist( titulo varchar(255) unique, genero varchar(255), año char(20), director varchar(255), actores varchar(255), primary key(titulo));'
      pool.query(createStatament, (_err: any, _drop: any) => {
        if (err) return console.log(err)
      })
    })

    console.debug('MySql Adapter Pool generated successfully')
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error)
    throw new Error('failed to initialized pool')
  }
}

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query
 * @param {string[] | Object} params
 * in the query
 */
export const execute = async <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.')

    return await new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error != null) reject(error)
        else resolve(JSON.parse(JSON.stringify(results)))
      })
    })
  } catch (error: any) {
    console.error('[mysql.connector][execute][Error]: ', error)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error(error)
  }
}
