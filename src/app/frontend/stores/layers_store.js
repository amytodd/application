import {observable, observe, computed} from 'mobx';
import LayerModel from '../models/layer';

export default class LayersStore {
  @observable layers = [];
  @observable active_layer_ids = [];

  constructor() {
    // when assigning the layers, iterate over them and activate any that are enabled by default
    observe(this, 'layers', (change) => {
      change.newValue.map((layer) => {
        if(layer.enabled) {
          this.toggleLayer(layer.id);
        }
      });
    });
  }

  toggleLayer(layer_id) {
    let layer_ids = this.active_layer_ids;
    const layer_index = layer_ids.indexOf(layer_id);

    if( layer_index >= 0 ) {
      layer_ids.splice(layer_index, 1);
    }else {
      layer_ids.unshift(layer_id);
    }

    this.active_layer_ids = layer_ids;
  }

  setLayers(layers) {
    this.layers = layers;
  }

  @computed get activeLayers() {
    // get active layer objects
    let layers = this.layers.filter((l) => this.active_layer_ids.indexOf(l.id)>=0);

    const sortLayers = (a, b) => {
      if( this.active_layer_ids.indexOf(a.id) > this.active_layer_ids.indexOf(b.id) ) {
        return 1
      }else if( this.active_layer_ids.indexOf(b.id) > this.active_layer_ids.indexOf(a.id) ) {
        return -1;
      }else {
        return 0;
      }
    };

    // sort layer objects by the order of active_layer_ids
    layers.sort(sortLayers);
    return layers;
  }

  static fromJS(object) {
    let layers_store = new LayersStore();

    if( object.hasOwnProperty('layers') ) {
      layers_store.layers = object.layers.map((layer) => LayerModel.fromJS(layer));
    }

    return layers_store;
  }
}
