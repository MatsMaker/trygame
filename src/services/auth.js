import AbstractService from './abstract'
import {session} from '../../protocol.relations'

export default class AuthService extends AbstractService {
  constructor (game, gameSoket, object, relations = session) {
    super(game, gameSoket, object, relations)
  }

  auth () {
    this._observer(this._relations.auth)()
  }
}
