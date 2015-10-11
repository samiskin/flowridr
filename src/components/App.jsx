
import Component from 'Component';
import Map from 'Map.jsx';
import HeatMap from 'HeatMap.jsx';
import DataActions from 'actions/DataActions';
import log from 'logs/saved_data_16.json';

export default class App extends Component{

  constructor() {
    super();
    DataActions.setPricePoint(log);
  }

  render() {
    return (
      <div style={{width: '1200px', height: '800px'}}>
        <div style={{position: 'absolute', top: 0, width: '1200px', height: '800px', zIndex: 10}}>
          <HeatMap/>
        </div>
        <Map/>
      </div>
    );
  }



}
