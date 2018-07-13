import React,{Component} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet'
import {observer} from "mobx-react";
import {Link} from 'react-router-dom';

import RecordViewTitle from './record_view_title';
import RecordViewMeta from './record_view_meta';
import RecordViewAttribution from './record_view_attribution';
import RecordViewSidebar from './record_view_sidebar';
import RecordViewGallery from './record_view_gallery';
import RecordViewComponentState from "./record_view_component_state";

import RecordViewHeader from './record_view_header';
import RecordViewContent from './record_view_content';

@observer class RecordView extends Component {
  constructor(props) {
    super(props);

    this.state = {loading: true};
  }

  componentWillMount() {
    const fetch_nearby_data = this.props.trayViewStore.cards.size === 0;
    this.props.trayViewStore.fetchRecord(this.props.match.params.id, fetch_nearby_data);
  }

  componentWillUnmount() {
    if( this.props.routing.location.pathname.search(/\/edit$/) > -1 ) {
    }else {
    }
  }

  componentWillReceiveProps(props) {
  }

  render_media_full() {
    const link_path = this.props.match.params.collection_id ? `/map/collections/${this.props.match.params.collection_id}` : '/map';

    return <div>
      <div className="m-record-media-expanded">
        <div className="media-item media-item--image">
          <Link to={`/map/records/${this.props.match.params.id}/media/1/image`}>
            <img src={require('../../assets/images/example/1-large.jpg')} alt=""/>
            <div className="attribution">
              <p>Duis dapibus mollis erat ac.</p>
            </div>
            <div className="caption">
              <p>Proin ornare sapien in nunc fermentum euismod. Sed lectus purus, ornare vel faucibus volutpat, pharetra vitae nisl. Nunc metus neque, dictum sit amet risus eget, porttitor tincidunt purus. Fusce ultricies est sed vulputate fermentum. Nunc vel tristique orci. Proin dapibus.</p>
            </div>
          </Link>
        </div>

        <div className="media-item media-item--image">
          <Link to={`/map/records/${this.props.match.params.id}/media/1/image`}>
            <img src={require('../../assets/images/example/4-large.jpg')} alt=""/>
            <div className="attribution">
              <p>Duis dapibus mollis erat ac.</p>
            </div>
            <div className="caption">
              <p>Proin ornare sapien in nunc fermentum eusismod. Sed lectus purus, ornare vel faucibus volutpat, pharetra vitae nisl. Nunc metus neque, dictum sit amet risus eget, porttitor tincidunt purus. Fusce ultricies est sed vulputate fermentum. Nunc vel tristique orci. Proin dapibus.</p>
            </div>
          </Link>
        </div>

        <div className="media-item media-item--image">
          <Link to={`/map/records/${this.props.match.params.id}/media/1/image`}>
            <img src={require('../../assets/images/example/5-large.jpg')} alt=""/>
            <div className="attribution">
              <p>Duis dapibus mollis erat ac.</p>
            </div>
            <div className="caption">
              <p>Proin ornare sapien in nunc fermentum euismod. Sed lectus purus, ornare vel faucibus volutpat, pharetra vitae nisl. Nunc metus neque, dictum sit amet risus eget, porttitor tincidunt purus. Fusce ultricies est sed vulputate fermentum. Nunc vel tristique orci. Proin dapibus.</p>
            </div>
          </Link>
        </div>

        <div className="media-item media-item--audio">
          <Link to={`/map/records/${this.props.match.params.id}/media/2/soundcloud`}>
            <img src={require('../../assets/images/example/2-large.jpg')} alt=""/>
            <div className="attribution">
              <p>Duis dapibus mollis erat ac.</p>
            </div>
            <div className="caption">
              <p>Proin ornare sapien in nunc fermentum euismod. Sed lectus purus, ornare vel faucibus volutpat, pharetra vitae nisl. Nunc metus neque, dictum sit amet risus eget, porttitor tincidunt purus. Fusce ultricies est sed vulputate fermentum. Nunc vel tristique orci. Proin dapibus.</p>
            </div>
          </Link>
        </div>

        <div className="media-item media-item--video">
          <Link to={`/map/records/${this.props.match.params.id}/media/2/video`}>
            <img src={require('../../assets/images/example/3-large.jpg')} alt=""/>
            <div className="attribution">
              <p>Duis dapibus mollis erat ac.</p>
            </div>
            <div className="caption">
              <p>Proin ornare sapien in nunc fermentum euismod. Sed lectus purus, ornare vel faucibus volutpat, pharetra vitae nisl. Nunc metus neque, dictum sit amet risus eget, porttitor tincidunt purus. Fusce ultricies est sed vulputate fermentum. Nunc vel tristique orci. Proin dapibus.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  }

  render_media_gallery() {
    const link_path = this.props.match.params.collection_id ? `/map/collections/${this.props.match.params.collection_id}` : '/map';

    return <div>

      <div className="m-record-media-thumbs">
        <div className="thumb image">
          <Link to={`/map/records/${this.props.match.params.id}/media/1`}><img src={require('../../assets/images/example/1.jpg')} alt=""/></Link>
        </div>

        <div className="thumb image">
          <Link to={`/map/records/${this.props.match.params.id}/media/1`}><img src={require('../../assets/images/example/4.jpg')} alt=""/></Link>
        </div>

        <div className="thumb image">
          <Link to={`/map/records/${this.props.match.params.id}/media/1`}><img src={require('../../assets/images/example/5.jpg')} alt=""/></Link>
        </div>

        <div className="thumb thumb--audio thumb--portrait">
          <Link to={`/map/records/${this.props.match.params.id}/media/2/soundcloud`}><img src={require('../../assets/images/example/2.jpg')} alt=""/></Link>
        </div>

        <div className="thumb thumb--video">
          <Link to={`/map/records/${this.props.match.params.id}/media/2/video`}><img src={require('../../assets/images/example/3.jpg')} alt=""/></Link>
        </div>
      </div>

    </div>
  }

  render_sidebar() {
    return <div className="sidebar">

      <div className="place">
        <div className="map">
          <Map center={this.props.trayViewStore.record.position} zoom={14}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
            <Marker position={this.props.trayViewStore.record.position} icon={this.props.trayViewStore.record.icon()} />
          </Map>
        </div>

        <div className="text">{this.props.trayViewStore.record.location.address} | {this.props.trayViewStore.record.lat}, {this.props.trayViewStore.record.lng}</div>
      </div>

      <div className="social">
        <div className="add-to-collection">
          <button><span>Add</span></button>
          Add to collection
        </div>

        <div className="social-status">
          <button className="like" onClick={() => this.props.trayViewStore.record.incrementLikeCount()}>
            <span>Like</span>
          </button>
          {this.props.trayViewStore.record.view_count} views <br/>
          {this.props.trayViewStore.record.like_count} likes
        </div>

        <div className="share-record">
          <button className="share"><span>Share</span></button>
          Share this record
        </div>
      </div>
    </div>
  }

  render_gallery_header () {
    return <div className="header--gallery">

      <div className="m-record-hero">
        {this.props.trayViewStore.record.image && <div className="image random-image" style={{'backgroundImage': `url('${this.props.trayViewStore.record.image.primary}')`}}></div>}
      </div>

      {this.render_media_gallery()}
      {this.render_meta()}
      {this.render_title()}
      {this.render_sidebar()}

    </div>
  }

  render_full_header () {
    return <div className="header--full header--no-hero">

      <div className="m-record-hero">
        {this.props.trayViewStore.record.image && <div className="image random-image" style={{'backgroundImage': `url('${this.props.trayViewStore.record.image.primary}')`}}></div>}
      </div>

      <div className='title-area'>
        <div className="text-content">
          {this.render_meta()}
          {this.render_title()}
        </div>
        {this.render_sidebar()}
      </div>

      {this.render_media_full()}

    </div>
  }

  render_state_loading_false_old() {
    const link_path = this.props.match.params.collection_id ? `/map/collections/${this.props.match.params.collection_id}` : '/map';

    return <div className="m-overlay is-showing">
      <div className="s-overlay--record is-showing">
        <div className="m-record">
          <div className="next">
            {/*<button className="next" onClick={() => this.props.trayViewStore.moveToNextCard()}>Next</button>*/}
          </div>
          <div className="previous">
            {/*<button className="previous" onClick={() => this.props.trayViewStore.moveToPreviousCard()}>Previous</button>*/}
          </div>
          <div className="close">
            <a href="#" className="close" onClick={this.handleCloseOnClick}>Close</a>
          </div>

          <div style={{position: 'absolute', top: '40px', left: '40px'}}>
            <Link to={`/map/records/${this.props.match.params.id}/gallery`}>Gallery</Link> <br /> <Link to={`/map/records/${this.props.match.params.id}/full`}>Full</Link>
            {this.props.match.params.view_type}
          </div>

          <div className="wrap">

            {this.props.match.params.view_type && this[`render_${this.props.match.params.view_type}_header`]()}
            {!this.props.match.params.view_type && this.render_full_header()}  {/* if we dont have a view type, render the full view by default */}

            <div className="m-article">
              {this.props.trayViewStore.record.description}
            </div>

            <div className="footer">
              <div className="attribution">
                <ul>
                  <li><h4>Created:</h4> {this.props.trayViewStore.record.created_at}</li>
                  {
                    this.props.trayViewStore.record.credit &&
                    <li><h4>Credit:</h4> {this.props.trayViewStore.record.credit}</li>
                  }
                </ul>
              </div>
              <div className="footer-actions">
                <button className="contact-owner">Contact owner</button>
                <button className="flag">Report this record</button>
                <Link to={`${link_path}/records/${this.props.match.params.id}/edit`} className="edit">Edit</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  }

  render() {
    if( this.props.trayViewStore.record ) {
      const gallery_component = <RecordViewGallery record={this.props.trayViewStore.record} />;
      let header_classes = "m-record";


      return <div className="m-overlay is-showing">
        <div className="s-overlay--record is-showing">
          <div className={header_classes}>

            <div className="close">
              <a href="#" className="close" onClick={this.handleCloseOnClick}>Close</a>
            </div>

            <div className="wrap">
              <RecordViewHeader  {...this.props} gallery={gallery_component} />
              <RecordViewContent {...this.props} gallery={gallery_component} />

              {this.props.children}
            </div>

          </div>
        </div>
      </div>;
    }else {
      return <span></span>
    }
  }
}

export default RecordViewComponentState.bindComponent(RecordView);
