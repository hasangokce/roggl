
let db

module.exports = class BoardsDAO {

    static async injectDB(conn) {
        if (db) {
            console.log('boardsDAO.js return called')
            return
        }
        console.log("boardsDAO.js injection successfull for boardsDAO")
        db = conn
    }

    static async test() {
        console.log("test")
    }

    static async getOneBoard(userInfo) {
        return await db.collection('my_boards').findOne({"title" : "hasan"})
    }

    static async changeSingle(){
        let email = "kodyap@gmail.com"
        let jwt = "jwt"
        try {
            await db.collection('my_boards').updateOne(
              { user_id: email },
              {
                $set: {
                  user_id: email,
                  jwt: jwt
                },
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