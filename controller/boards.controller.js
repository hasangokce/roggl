console.log('File imported: Boards Controller') // debug
const BoardsDAO = require('../dao/boards.dao.js') // DAO

module.exports = class BoardsController {
  foo (req, res) {
    const userInfo = {
      name: 'Hasan',
      surname: 'Gökçe'
    }
    console.log(userInfo)
    res.send(userInfo)
  }

  async boardCreatePost (req, res) {
    const { _id, name } = { ...req.body }
    const updateResult = await BoardsDAO.boardCreate({ _id, name })
    console.log(updateResult)
    res.send({ ok: 1 })
  }

  async boardUpdatePut (req, res) {
    const { _id, name } = req.body
    console.log(req.body)
    const updateResult = await BoardsDAO.boardUpdate({ _id, name })
    console.log(updateResult)
    res.send()
  }
}
