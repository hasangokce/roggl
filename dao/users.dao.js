const ObjectId = require('mongodb').ObjectId
let users
let boards

module.exports = class UsersDAO {
  /**
   * Injects database connections to this class
   * @param {*} conn Client object from MongoClient
   * @throws Will throw an error if there is an error
   * @returns {null}
   */
  static async injectDB (conn) {
    if (users) {
      console.log('boardsDAO.js db is already exists')
      return
    }
    console.log('boardsDAO.js injection successfull for boardsDAO')
    users = await conn.db('roggl').collection('my_users')
    boards = await conn.db('roggl').collection('my_boards')
    console.log(await users.findOne({})) // debug
  }

  static async lookCredentials (userObj) {
    console.log("dao look credentials");
    const result = await users.findOne({ email: userObj.email, password: userObj.password })
    if (result) {
      return result
    } else {
      return { "ok": 0 }
    }
  }

  static async userRegister (userObj) {
    console.log("dao user register");
    const emailExists = await users.findOne({ email: userObj.email })
    console.log(emailExists);
    if (emailExists === null || userObj.password !== '') {
      console.log('email available do register');
      const result = await users.insertOne(userObj)
      console.log({ ok: 1, insertedId: result.insertedId });
      return { ok: 1, insertedId: result.insertedId }

    } else {
      console.log('ok: 0 email exists');
      return { "ok": 0, "message": "Email already exists" }
    }
  }
  /**
   * Creates a single board
   * @param {*} columnObj
   * @throws Will throw an error if there is a problem
   * @returns {Object} Returns response object
   */
  static async create (columnObj) {
    let { owner_id, board_id, title, content } = columnObj
    owner_id = ObjectId(owner_id)
    try {
      const insertResult = await users.insertOne({ owner_id, board_id, title, content })
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
  static async index (board_id) {
    let cursor
    console.log("board_id: " + board_id);
    const owner_id = ObjectId("6006f8e357638c51a36a59c3")
    try {
      cursor = await users.find({ owner_id: owner_id, board_id: board_id })//.project({ name: 1 })
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return []
    }

    return cursor.toArray()
  }

  /**
  * Updates column item
  * @param {Object} columnObj
  * @throws Will throw an error if the argument is null.
  * @returns Success message
  */
  static async columnUpdate (columnObj) {
    try {
      let { _id, content } = columnObj
      _id = new ObjectId(_id)
      await users.updateOne(
        { _id: _id },
        {
          $set: {
            content: content
          }
        },
        { upsert: false }
      )
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      // return { error: e }
      return false
    }
  }


  /**
  * Updates column item
  * @param {Object} columnObj
  * @throws Will throw an error if the argument is null.
  * @returns Success message
  */
  static async columnUpdateTitle (columnObj) {
    try {
      let { _id, title } = columnObj
      _id = new ObjectId(_id)
      await users.updateOne(
        { _id: _id },
        {
          $set: {
            title: title
          }
        },
        { upsert: false }
      )
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`)
      // return { error: e }
      return false
    }
  }

  static async columnDelete (columnId, userId) {
    try {
      // Use the columnId and userEmail to delete the proper comment.
      const deleteResponse = await users.deleteOne({
        _id: ObjectId(columnId)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`)
      return false
      // return false
    }
  }


}
