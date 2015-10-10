import React from 'react';
import Component from 'Component';

export default class Map extends Component{

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

  setMapViewBounds(map) {
    var bbox = new H.geo.Rect(37.810899, -122.527192, 37.718520, -122.358332);
    map.setViewBounds(bbox);
  }

  componentDidMount() {
    this.map = new H.Map(this.refs.map.getDOMNode(), this.defaultLayers.normal.map);
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
    this.setMapViewBounds(this.map);
  }

  render() {
    return (
      <div ref="map" style={{width: '400px', height: '400px', background: 'grey'}}/>
    );
  }


}
