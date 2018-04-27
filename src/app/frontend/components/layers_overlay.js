import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";

import Layer from './layer';

@observer export default class LayersOverlay extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    this.props.mapViewStore.overlay = null
  }

  render() {
    let className = "m-overlay";
    if( this.props.mapViewStore.overlay === 'layers' ) className += " is-showing";

    return (
      <div className={className}>
        <div className="s-overlay--layers is-showing">

          <div className="close">
            <button className="close" onClick={this.handleClick.bind(this)}>Close</button>
          </div>

          <div className="m-layers-picker">
            <div className="header">
              <h1>Layers</h1>

              <p>
                Activate the following layers on the map
              </p>
            </div>

            <div className="layers">
              <h2>All Layers</h2>
              {this.props.layersStore.layers.map((layer) => <Layer key={layer.id} layer={layer} {...this.props} />)}
            </div>

          </div>
        </div>
      </div>
    );
  }
}