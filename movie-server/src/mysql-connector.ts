import { con } from './index'

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query
 * @param {string[] | Object} params
 * in the query
 */
export const execute = async <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    return await new Promise<T>((resolve, reject) => {
      con.query(query, params, (error, results) => {
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
