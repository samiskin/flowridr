import Component from 'Component';
import DataStore from 'stores/DataStore';
import SettingStore from 'stores/SettingStore';
import _ from 'lodash';


export default class HeatMap extends Component {

  static stores=[DataStore];

  static defaultProps = {
    timestamp: 1444534720266,
    product: "uberX",
    width: 1200,
    height: 800
  }

  static propTypes = {
    timestamp: React.PropTypes.number,
    product: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // minimal heatmap instance configuration
    this.heatmapInstance = h337.create({
      container: this.refs.heatmap.getDOMNode()
    });
    this.componentDidUpdate();
    //
    // // now generate some random data
    // var points = [];
    // var max = 0;
    // var width = 840;
    // var height = 400;
    // var len = 200;
    //
    // while (len--) {
    //   var val = Math.floor(Math.random()*100);
    //   max = Math.max(max, val);
    //   var point = {
    //     x: Math.floor(Math.random()*width),
    //     y: Math.floor(Math.random()*height),
    //     value: val
    //   };
    //   points.push(point);
    // }
    // // heatmap data format
    // var data = {
    //   max: max,
    //   data: points
    // };
    // // if you have a set of datapoints always use setData instead of addData
    // // for data initialization
  }

  syncState() {
    return {
      priceData: DataStore.getPriceData(this.props.timestamp),
      topLeft: SettingStore.getBounds().topLeft,
      bottomRight: SettingStore.getBounds().bottomRight
    };
  }

  scaleFromLife = (lifePoint) => {
    let translated = {x: lifePoint.x - this.origin.x, y: lifePoint.y - this.origin.y};
    let scaled = {
      x: (translated.x / this.lifeWidth) * this.props.width,
      y: (translated.y / this.lifeHeight) * this.props.height
    };

    return scaled;
  }

  componentDidUpdate() {
    this.origin = ll2xy(this.state.topLeft.latitude, this.state.topLeft.longitude);
    this.end = ll2xy(this.state.bottomRight.latitude, this.state.bottomRight.longitude);
    this.lifeWidth = this.end.x - this.origin.x;
    this.lifeHeight = this.end.y - this.origin.y;


    let max = 0;

    let filtered = _.filter(this.state.priceData, (data) => {
      let value = _.find(data.prices, (uberData) => uberData.display_name == this.props.product).surge_multiplier;
      return true || value > 1.01;
    });

    let points = filtered.map((data) => {
      let point = this.scaleFromLife(ll2xy(data.latitude, data.longitude));
      let value = _.find(data.prices, (uberData) => uberData.display_name == this.props.product).surge_multiplier;
      // console.log(value);
      max = Math.max(value, max);
      console.log(point);

      return {
        x: point.x,
        y: point.y,
        value: value - 1
      };
    });

    if (this.heatmapInstance) {
      this.heatmapInstance.setData({max: max, data: points});
    }
  }



  render() {
    return (
      <div style={{width: this.props.width, height: this.props.height}} ref="heatmap"/>
    );
  }

}
