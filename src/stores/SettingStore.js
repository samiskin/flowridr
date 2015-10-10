import Store from 'Store';

class SettingStore extends Store {
  constructor() {
    this.state = {
      topLeft: {
        longitude: 37.810899,
        latitude: -122.527192
      },
      bottomRight: {
        longitude: 37.718520,
        latitude: -122.358332
      }
    }
  }
}

export default new SettingStore();
