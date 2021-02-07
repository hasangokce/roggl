
let db

module.exports = class BoardsDAO {
  static async injectDB (conn) {
    if (db) {
      console.log('boardsDAO.js db is already exists')
      return
    }
    console.log('boardsDAO.js injection successfull for boardsDAO')
    db = await conn
    console.log(await db.collection('my_boards').findOne({}))
    console.log(await db.collection('my_posts').findOne({}))
  }

  static async test () {
    console.log('test')
  }

  static async getOneBoard (userInfo) {
    return await db.collection('my_boards').findOne({ title: 'hasan' })
  }

  static async changeSingle () {
    const email = 'kodyap@gmail.com'
    const jwt = 'jwt'
    try {
      await db.collection('my_boards').updateOne(
        { user_id: email },
        {
          $set: {
            user_id: email,
            jwt: jwt
          }
        },
        { upsert: true }
      )
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      return { error: e }
    }
  }
}
