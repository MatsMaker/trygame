import {base} from '../../protocol.relations'

export default class BaseService {
  constructor (game, stream$, object, relations = base) {
    this._game = game
    this._stream$ = stream$
    this._object = object
    this._relations = relations

    this._initListeners()
  }

  connection (request) {
    this._emit({
      eventName: this._relations.connection,
      data: request
    })
  }

  _observer (object) {
    return {
      next: (response) => {
        if (object.hasAttribute(response.eventName)) {
          object[response.eventName](response.data)
        }
      },
      error: (err) => console.warn(err),
      complete: () => {}
    }
  }

  _initListeners () {
    this._stream$.subscribe(this._observer(this._object))
  }

  _emit (eventName, data) {
    const request = JSON.stringify({
      eventName,
      data
    })
    this._stream$.next(request)
  }
}
