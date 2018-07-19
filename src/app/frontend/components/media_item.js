import React,{Component} from 'react';
import {inject, observer} from "mobx-react";
import { Route } from 'react-router';
import {Switch, withRouter} from 'react-router-dom';
import Img from 'react-image';
import MediaElement from './media_element';

@inject('router', 'trayViewStore')
@withRouter
@observer export default class MediaItem extends Component {
  constructor(props) {
    super(props);

    this.state = {media_item: this.props.trayViewStore.record.get_attachment(this.props.match.params.media_item_id)};
  }

  componentWillReceiveProps() {
    console.log("MediaItem componentWillReceiveProps", arguments);
  }

  image() {
    return <Img src={this.state.media_item.attachable.large} alt="" loader={<span className="is-loading" />}/>
  }

  audio() {
    console.log(`Showing soundcloud()`);
    // return <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/249483615&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
    // const sources = [{src: 'http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FVIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40a994ee9320f2c255848f88e185bbe910f11cec/Audio%20file%20mp3', type: 'audio/mpeg'}];
    const sources = [
        {src: 'http://www.streambox.fr/playlists/test_001/stream.m3u8', type: 'application/x-mpegURL'},
        {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
        {src: 'rtmp://firehose.cul.columbia.edu:1935/vod/mp4:sample.mp4', type: 'video/rtmp'}
      ], config = {}, tracks = {};

    return <MediaElement width='100%' height='100%' id='player' sources={[{src: 'http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FVIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40a994ee9320f2c255848f88e185bbe910f11cec/Audio%20file%20mp3', type: 'audio/mpeg'}]} tracks={tracks} options={config} mediaType='audio' />
  }

  video() {
    console.log(`Showing video()`);
    return <iframe width="560" height="315" src="https://www.youtube.com/embed/_jn2bUFFzY8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  }

  render() {
    console.log(this.state.media_item, this.state.media_item.media_type);
    const render_method = this.state.media_item.media_type;
    const in_gallery_view = this.props.trayViewStore.record.view_type === 'gallery';

    return <div className={`main-media-item ${this.state.media_item.media_type}`}>
      <Switch location={this.props.location}>
        <Route exact={true}>
          <div>
            <div className="item">
              {this.state.media_item && this[render_method]()}
            </div>

            {in_gallery_view && (
              <div className="meta">
                <div className="attribution">
                  <p>Duis dapibus mollis erat ac.</p>
                </div>
                <div className="caption">
                  <p>Proin ornare sapien in nunc fermentum euismod. Sed lectus purus, ornare vel faucibus volutpat, pharetra vitae nisl. Nunc metus neque, dictum sit amet risus eget, porttitor tincidunt purus. Fusce ultricies est sed vulputate fermentum. Nunc vel tristique orci. Proin dapibus…</p>
                  <button className="show-all">Read more</button>
                </div>
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  }
}
