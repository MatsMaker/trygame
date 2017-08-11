import AbstractService from './abstract'
import {session} from '../../protocol.relations'

export default class MushroomsService extends AbstractService {
  constructor (game, gameSoket, object, relations = session) {
    super(game, gameSoket, object, relations)
  }
}
