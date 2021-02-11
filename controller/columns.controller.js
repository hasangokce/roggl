console.log('File imported: Columns Controller') // debug
const ColumnsDAO = require('../dao/columns.dao.js') // DAO

module.exports = class ColumnsController {

  async createItem (req, res) {
    const { owner_id, board_id, title, content } = { ...req.body }
    const updateResult = await ColumnsDAO.create({ owner_id, board_id, title, content })
    res.send({ ok: 1 , insertedId: updateResult.insertedId })
  }

  async getItems (req, res) {
    if(!req.params.board_id) res.send()
    const result = await ColumnsDAO.index(req.params.board_id)
    res.send(result)
  }

  async columnUpdate (req, res) {
    const { _id, content } = req.body
    console.log('controller columnUpdate() |--> body');
    console.log(req.body)
    const updateResult = await ColumnsDAO.columnUpdate({ _id, content })
    console.log(updateResult)
    res.send({ok: 1})
  }

  async columnUpdateTitle (req, res) {
    const { _id, title } = req.body
    console.log('controller columnUpdateTitle() |--> body');
    console.log(req.body)
    const updateResult = await ColumnsDAO.columnUpdateTitle({ _id, title })
    console.log(updateResult)
    res.send({ok: 1})
  }
  
}
