import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  _updateElement() {
    // TODO
  }

  updateData() {

  }

}
