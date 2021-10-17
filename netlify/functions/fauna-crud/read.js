/* Import faunaDB sdk */
const process = require('process')

const { query, Client } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

const handler = async (event) => {
  const { id } = event
  console.log(`Function 'read' invoked. Read id: ${id}`)

  try {
    const response = await client.query(query.Map(query.Paginate(query.Match(query.Index("single"), id)),
                                                  query.Lambda("data", query.Get(query.Var("data")))))
//     Map(Paginate(Match(Index("single"), "2")), Lambda("data", Get(Var("data"))))
    console.log('success', response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
