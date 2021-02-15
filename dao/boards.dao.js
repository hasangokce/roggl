const ObjectId = require('mongodb').ObjectId
let boards
let posts

module.exports = class BoardsDAO {
  /**
   * Injects database connections to this class
   * @param {*} conn Client object from MongoClient
   * @throws Will throw an error if there is an error
   * @returns {null}
   */
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

  /**
   * Creates a single board
   * @param {*} boardObj
   * @throws Will throw an error if there is a problem
   * @returns {Object} Returns response object
   */
  static async boardCreate (boardObj) {
    let { name, owner_id } = boardObj
    owner_id = ObjectId(owner_id)
    try {
      const insertResult = await boards.insertOne({ name, owner_id })
      return insertResult
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      return { error: e }
    }
  }

  /**
   * Reads all items
   * @throws Will throw an error if there is an error
   * @returns {Array} Returns an array
   */
  static async index (user_id) {
    console.log(user_id);
    let cursor
    const owner_id = ObjectId(user_id)
    try {
      cursor = await boards.find({owner_id: owner_id}).project({ name: 1 })
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return []
    }

    return cursor.toArray()
  }

  static async getOneBoard (userInfo) {
    return await boards.findOne({ title: 'hasan' })
  }

  /**
   * Updates board item
   * @param {Object} boardObj
   * @throws Will throw an error if the argument is null.
   * @returns Success message
   */
  static async boardUpdate (boardObj) {
    try {
      let { _id, name } = boardObj
      _id = new ObjectId(_id)
      await boards.updateOne(
        { _id: _id },
        {
          $set: {
            name: name
          }
        },
        { upsert: true }
      )
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      // return { error: e }
      return false
    }
  }

  static async boardDelete (boardId, userId) {
    try {
      // Use the boardId and userEmail to delete the proper comment.
      const deleteResponse = await boards.deleteOne({
        _id: ObjectId(boardId)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`)
      return false
      // return false
    }
  }
}
