import React from 'react';
import Component from 'Component';
import SettingStore from 'stores/SettingStore';
import DataStore from 'stores/DataStore';

export default class Map extends Component{

  static stores=[SettingStore]

  constructor() {
    super();
    this.platform = new H.service.Platform({
      app_id: 'DemoAppId01082013GAL',
      app_code: 'AJKnXv84fjrb0KIHawS0Tg',
      useCIT: true,
      useHTTPS: true
    });

    this.defaultLayers = this.platform.createDefaultLayers();
  }

  syncState() {
    return {
      bounds: SettingStore.getBounds()
    }
  }

  setMapViewBounds(map) {
    let bounds = this.state.bounds;
    var bbox = new H.geo.Rect(bounds.topLeft.latitude, bounds.topLeft.longitude, bounds.bottomRight.latitude, bounds.bottomRight.longitude);
    map.setViewBounds(bbox);
  }

  componentDidMount() {
    this.map = new H.Map(this.refs.map.getDOMNode(), this.defaultLayers.normal.map);
    this.setMapViewBounds(this.map);
  }

  render() {
    return (
      <div ref="map" style={{width: '100%', height: '100%', background: 'grey'}}/>
    );
  }


}
