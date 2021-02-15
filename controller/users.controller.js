console.log('File imported: Columns Controller') // debug
const UsersDAO = require('../dao/users.dao.js') // DAO

module.exports = class ColumnsController {

  async lookCredentials (req, res) {
    const { email, password } = req.body
    const result = await UsersDAO.lookCredentials({email, password})
    res.send(result)
  }

  async userRegister (req, res) {
    const { email, password } = req.body
    const result = await UsersDAO.userRegister({email, password})
    res.send(result)
  }

  async createItem (req, res) {
    const { owner_id, board_id, title, content } = { ...req.body }
    const updateResult = await UsersDAO.create({ owner_id, board_id, title, content })
    res.send({ ok: 1 , insertedId: updateResult.insertedId })
  }

  async getItems (req, res) {
    if(!req.params.board_id) res.send()
    const result = await UsersDAO.index(req.params.board_id)
    res.send(result)
  }

  async columnUpdate (req, res) {
    const { _id, content } = req.body
    console.log('controller columnUpdate() |--> body');
    console.log(req.body)
    const updateResult = await UsersDAO.columnUpdate({ _id, content })
    console.log(updateResult)
    res.send({ok: 1})
  }

  async columnUpdateTitle (req, res) {
    const { _id, title } = req.body
    console.log('controller columnUpdateTitle() |--> body');
    console.log(req.body)
    const updateResult = await UsersDAO.columnUpdateTitle({ _id, title })
    console.log(updateResult)
    res.send({ok: 1})
  }

  async columnDelete (req, res) {
    console.log('delete called')
    const { id: columnId } = req.params
    const deleteResponse = await UsersDAO.columnDelete(columnId)
    res.send({ ok: deleteResponse.result.n })
    // if (isDeleted === true) res.send({ok: 1})
    // if (isDeleted === false) res.send({ok: 0})
  }
  
}
