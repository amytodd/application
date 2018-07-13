import React,{Component} from 'react';
import {observer} from "mobx-react";
import RecordViewGalleryMediaItem from './record_view_gallery_media_item';
import RecordViewComponentState from './record_view_component_state';

@observer class RecordViewGallery extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gallery_class = 'm-media-viewer';

    gallery_class += this.props.record.view_type === 'expanded' ? 'm-media-viewer--expanded' : '-thumbs m-media-viewer--gallery';

    const media = this.props.record.media.map((media) => <RecordViewGalleryMediaItem key={`media_${media.id}`} media={media} />);

    return <div className={gallery_class}>
      {media}
    </div>
  }
}

export default RecordViewComponentState.bindComponent(RecordViewGallery);
