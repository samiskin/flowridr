import Store from 'Store';

class DataStore extends Store {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  getTimestamps() {
    return Object.keys(this.state.data);
  }

  getPriceData(timestamp) {
    return this.state.data[timestamp];
  }

  update(action) {
    console.log(action);
    switch(action.type) {
      case 'NEW_PRICE_POINT':
        this.state.data[action.data.timestamp] = action.data.data;
        this.notify();
    }


  }


}

export default new DataStore();
