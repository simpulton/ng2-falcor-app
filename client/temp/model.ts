import * as falcor from 'falcor';
import {XMLHttpSource as HttpDataSource} from 'falcor-http-datasource';

export const model = new falcor.Model({
  cache: {
    'items': [
      {
        'id': 1,
        'name': 'Item 1',
        'description': 'This is a description'
      },
      {
        'id': 2,
        'name': 'Item 2',
        'description': 'This is a description'
      },
      {
        'id': 3,
        'name': 'Item 3',
        'description': 'This is a lovely item'
      }
    ]
  }
});
