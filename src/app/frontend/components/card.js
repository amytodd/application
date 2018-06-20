import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import Parser from 'html-react-parser';
import {Link, withRouter} from 'react-router-dom';

@withRouter
@observer export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  highlightCard() {
    this.props.card.highlighted = true;

    // fixme - change this to indicate that the marker related to the hovered card is out of the viewport somehow?
    // // pan the map to this cards' position
    // if( !this.props.card.is_collection ) {
    //   this.props.mapViewStore.panTo(this.props.card.lat, this.props.card.lng);
    // }
  }

  render() {
    const parsed_content = Parser(this.props.card.description);

    let container_classes = "m-record-card";
    let image_styles = {background: '#2e3c4e'};

    if( this.props.card.is_collection ) container_classes += " m-record-card--collection";
    if( this.props.card.image ) image_styles.backgroundImage = `url('${this.props.card.image.card}')`;

    let resource = '/';
    if( this.props.card.is_collection ) {
      resource = 'collections';
    }else if(this.props.card.collection_id) {
      resource = `collections/${this.props.card.collection_id}`;
    }else {
      resource = 'records';
    }

    if( this.props.card.highlighted) {
      container_classes += " highlighted";
    }

    const collection_path = location.pathname.match(/\/collections\/(\d+)/);
    let path = `/map/${resource}/${this.props.card.id}`;
    if( collection_path && collection_path.length > 1 ) {
      path = `/map/collections/${collection_path[1]}/records/${this.props.card.id}`;
    }

    return (
      <Link to={path} className={container_classes} onMouseEnter={this.highlightCard.bind(this)} onMouseOut={()=>this.props.card.highlighted=false}>
        <div className="wrapper">
          <div className="image" style={image_styles}>
          </div>
          {this.props.card.is_collection && <span className="collection-indicator">Collection</span>}
          <div className="text-content">
            <h1>{this.props.card.title}</h1>

            {parsed_content[0] || parsed_content}
          </div>

          <div className="link-indicator">
          </div>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  // mapViewStore: PropTypes.object.isRequired
};
