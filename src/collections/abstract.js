export default class AbstractCollection {
  constructor (game, owner, chaildClass) {
    if (new.target === AbstractCollection) {
      throw new TypeError('Cannot construct AbstractService instances directly')
    }
    this._game = game
    this._owner = owner
    this._itemOfOwner = null
    this._chaildClass = chaildClass
    this._collection = []
  }

  get itemOfOwner () {
    return this._itemOfOwner
  }

  addItemOfOwner (...arg) {
    if (new.target === AbstractCollection) {
      throw new TypeError('Cannot method AbstractService instances directly')
    }
    this._itemOfOwner = new this._chaildClass(...arg)
    this._collection.push(this._itemOfOwner)
  }

  addItem (owner) {
    if (owner.id === this._owner.id) {
      throw new Error(`${owner.id} is owner this collection`)
    }
    const newItem = new this._chaildClass(this._game, this._owner)
    this._collection.push(newItem)
  }
}
