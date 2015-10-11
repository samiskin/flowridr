import Dispatcher from 'Dispatcher';

class DataActions  {
  setPricePoint(payload) {
    Dispatcher.dispatch({type: 'NEW_PRICE_POINT', data: payload});
  }
}

export default new DataActions();
