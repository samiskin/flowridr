
var React = require('React');
export default class Component extends React.Component {

  static stores = []

  constructor(props) {
    super(props);
    this.state = this.syncState() || {};

    this.constructor.stores.forEach(store => {
      store.subscribe(this._update.bind(this));
    });
  }

  _update(payload) {
      this.setState(this.updatedState);
  }

  syncState() {

  }

  updatedState() {
  }


}
