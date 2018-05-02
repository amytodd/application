import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import MarkerContainer from './marker_container';

import {observer} from "mobx-react";
import LayerToolsContainer from './layer_tools_container';

@observer export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.mapRef = null;
    this.setMapRef = element => {
      this.mapRef = element;
      this.props.trayViewStore.map_ref = this.mapRef;
    }
  }

  handleOnDragEnd() {
    console.log("DRAGGED");
  }

  handleOnZoomEnd() {
    console.log("ZOOMED");
  }

  handleOnClick(event) {
    this.props.mapViewStore.latlng = event.latlng;

    if( this.props.mapViewStore.add_record_mode ) {
      const {lat, lng} = event.latlng;
      this.props.recordFormStore.latlng = event.latlng;

      this.props.mapViewStore.overlay = "record_form";
    }
  }

  render() {
    const position = this.props.mapViewStore.center.toJS();
    const map_zoom = this.props.mapViewStore.zoom;

    let markers = [];

    if( this.props.trayViewStore.cardStore ) {
      this.props.trayViewStore.cardStore.cards.map((c) => {
        let key;
        if( c.is_collection ) {
          c.records.map((r)=> {
            key = `collection_${c.id}_record_${r.id}`;
            markers.push( <MarkerContainer key={key} position={r.position} card={c} trayViewStore={this.props.trayViewStore} /> )
          })
        }else {
          key = `record_${c.id}`;
          markers.push( <MarkerContainer key={key} position={c.position} card={c} trayViewStore={this.props.trayViewStore} /> )
        }
      });
    }

    const layers = <span className="tile-layers">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />

      {this.props.layersStore.activeLayers.map((layer, index) => {
        return <TileLayer key={layer.id} url={layer.url} attribution={layer.attribution} opacity={layer.opacity} zIndex={1000-index} />
      })}
    </span>;

    return <div className="m-map-area">
      <div className="m-map">
        <Map center={position} zoom={map_zoom} ref={this.setMapRef} onDragEnd={this.handleOnDragEnd.bind(this)} onZoomEnd={this.handleOnZoomEnd.bind(this)} onClick={this.handleOnClick.bind(this)}>
          {layers}

          {markers}
        </Map>
      </div>

      <LayerToolsContainer {...this.props} />
    </div>;
  }
}
