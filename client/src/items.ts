import {Http, Headers} from 'angular2/http';
import {Store} from '@ngrx/store';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import * as falcor from 'falcor';
import {XMLHttpSource as HttpDataSource} from 'falcor-http-datasource';

const model = new falcor.Model({
  source: new HttpDataSource('http://localhost:9090/model.json')
});

export interface Item {
  id: number;
  name: string;
  description: string;
};

export interface AppStore {
  items: Item[];
  selectedItem: Item;
};

//-------------------------------------------------------------------
// ITEMS STORE
//-------------------------------------------------------------------
export const items = (state: any = [], {type, payload}) => {
  let index: number;
  switch (type) {
    case 'ADD_ITEMS':
      return payload;
    case 'CREATE_ITEM':
      return [...state, payload];
    case 'UPDATE_ITEM':
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_ITEM':
      return state.filter(item => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};

//-------------------------------------------------------------------
// SELECTED ITEM STORE
//-------------------------------------------------------------------
export const selectedItem = (state: any = null, {type, payload}) => {
  switch (type) {
    case 'SELECT_ITEM':
      return payload;
    default:
      return state;
  }
};

//-------------------------------------------------------------------
// ITEMS SERVICE
//-------------------------------------------------------------------
@Injectable()
export class ItemsService {
  items: Observable<Array<Item>>;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.items = store.select('items');
  }

  loadItems() {
    model.get(['items', {from: 0, to: 2}, ['id', 'name', 'description']])
      .map(res => res.json.items)
      .map(items => Object.keys(items).map(key => items[key]))
      .map(payload => ({ type: 'ADD_ITEMS', payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveItem(item: Item) {
    (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item: Item) {
    item.id = Math.floor(Math.random() * (100 - 3 + 1) + 3);
    model.setValue('items', item)
      .map(payload => ({ type: 'CREATE_ITEM', payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateItem(item: Item) {
    model.setValue(['items', item.id], item)
    .map(payload => ({ type: 'UPDATE_ITEM', payload }))
    .subscribe(action => this.store.dispatch(action));
  }

  deleteItem(item: Item) {
    model.setValue(['items', item.id], null)
      .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
  }
}
