import Store from 'Store';

class SettingStore extends Store {
  constructor() {
    super();
    this.state = {
      bounds: {
        topLeft: {
          latitude: 37.806137,
          longitude: -122.513186
        },
        bottomRight: {
          latitude:  37.715355,
          longitude: -122.376591
        }
      }
    };
  }

  getBounds() {
    return this.state.bounds;
  }
}

export default new SettingStore();
