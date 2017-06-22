class CollectionItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  updateCollectionNameAttribute(event) {
    this.updateAttribute(event);
    MapPinActions.setFormAttribute({collection_id: null});
  }

  render () {
    return (
        <div>
          <div className="form-group form-group-title">
            <label>Collection name</label>
            <input type="text" placeholder="Collection Name" onChange={this.updateCollectionNameAttribute.bind(this)} data-attribute="collection_name" value={this.state.collection_name} data-parsley-required={true} data-parsley-error-message="Enter a name for the collection" />
          </div>

          <div className="form-group form-group-title">
            <label>Describe what this collection will contain</label>
            <div className="collection-item-options">
              <input type="text" value={this.state.collection_description} onChange={this.updateAttribute.bind(this)} data-attribute='collection_description' placeholder="New Collection Description" data-parsley-required={true} data-parsley-error-message="Enter a description for the collection" />
            </div>
          </div>

          <div className="form-group form-collection-privacy">
            <label htmlFor="">
              Public
              <span className="form-helper-text">
                Once you've created this group, anybody will be able to add pins to it
              </span>
              <input type="radio" value="open" onChange={this.updateAttribute.bind(this)} data-attribute="collection_privacy" checked={this.state.collection_privacy=="open"} />
            </label>

            <label htmlFor="">
              <input type="radio" value="restricted" onChange={this.updateAttribute.bind(this)} data-attribute="collection_privacy" checked={this.state.collection_privacy=="restricted"} />
              Private
              <span className="form-helper-text">
                This type of collection is curated by you and only your pins can be a part of it
              </span>
            </label>
          </div>
        </div>
    );
  }
}

CollectionItemForm = Layers.bindComponentToMapPinStore(CollectionItemForm);