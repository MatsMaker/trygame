import AbstractService from './abstract'
import {base} from '../../protocol.relations'

export default class BaseService extends AbstractService {
  constructor (game, gameSoket, object, relations = base) {
    super(game, gameSoket, object, relations)
  }

  connection () {
    this._observer(this._relations.connection)()
  }
}
