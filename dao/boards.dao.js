const ObjectId = require('mongodb').ObjectId
let boards
let posts

module.exports = class BoardsDAO {
  static async injectDB (conn) {
    if (boards && posts) {
      console.log('boardsDAO.js db is already exists')
      return
    }
    console.log('boardsDAO.js injection successfull for boardsDAO')
    boards = await conn.db('roggl').collection('my_boards')
    posts = await conn.db('roggl').collection('my_posts')
    console.log(await boards.findOne({})) // debug
    console.log(await posts.findOne({})) // debug
  }

  static async index () {
    let cursor
    try {
      cursor = await boards.find().project({ name: 1 })
      // // Course Answer
      // cursor = await movies
      //   .find({ countries: { $in: countries } })
      //   .project({ title: 1 })
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return []
    }

    return cursor.toArray()
    // cursor =  boards.find().toArray(function (err, result) {
    //   if (err) throw err
    //   return result
    // })
    // console.log(cursor)
    // return cursor
  }

  static async getOneBoard (userInfo) {
    return await boards.findOne({ title: 'hasan' })
  }

  static async boardUpdate (boardObj) {
    let { _id, name } = boardObj
    _id = new ObjectId(_id)
    try {
      await boards.updateOne(
        { _id: _id },
        {
          $set: {
            name: name
            // updated: 2
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

  static async boardCreate (boardObj) {
    const { name } = boardObj
    try {
      await boards.insertOne({ name })
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      return { error: e }
    }
  }
}
