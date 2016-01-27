import * as falcor from 'falcor';
import {XMLHttpSource as HttpDataSource} from 'falcor-http-datasource';

export const model = new falcor.Model({
  source: new HttpDataSource('http://localhost:9090/model.json')
});
