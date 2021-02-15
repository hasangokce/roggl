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

  async boardAll (req, res) {
    const result = await BoardsDAO.index(req.params.board_id)
    res.send(result)
  }


  async boardCreate (req, res) {
    const { owner_id, name } = { ...req.body }
    const updateResult = await BoardsDAO.boardCreate({ owner_id, name })
    console.log(updateResult)
    res.send({ ok: 1 , insertedId: updateResult.insertedId })
  }

  async boardUpdate (req, res) {
    const { _id, name } = req.body
    console.log(req.body)
    const updateResult = await BoardsDAO.boardUpdate({ _id, name })
    console.log(updateResult)
    res.send({ok: 1})
  }

  async boardDelete (req, res) {
    console.log('delete called')
    const { id: boardId } = req.params
    const deleteResponse = await BoardsDAO.boardDelete(boardId)
    res.send({ ok: deleteResponse.result.n })
    // if (isDeleted === true) res.send({ok: 1})
    // if (isDeleted === false) res.send({ok: 0})
  }
}
