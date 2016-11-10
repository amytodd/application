(() => {
  /*
  MapPinStore - the attributes we POST to the pins controller when creating a new pin
  */
  class MapPinStore {
    constructor() {
      this.form_submit_disabled = false;
      this.title = '';
      this.description = '';
      this.link_url = '';
      this.attachment = '';
      this.video_url = '';
      this.date_from_day = '';
      this.date_from_month = '';
      this.date_from_year = '';
      this.date_to_day = '';
      this.date_to_month = '';
      this.date_to_year = '';
      this.collections = '';
      this.location = '';
      this.pin_form_visible = false;
      this.pin_form_lat_lng = {};
      this.pin_form_enabled = false;

      this.bindListeners({
        onSetPinLocation: MapPinActions.SET_PIN_LOCATION,
        onEnablePinForm: MapPinActions.ENABLE_PIN_FORM,
        onTogglePinForm: MapPinActions.TOGGLE_PIN_FORM,
        onResetForm: MapPinActions.RESET_FORM
      });
    }

    onSetPinLocation(latlng) {
      this.pin_form_lat_lng = latlng;
    }

    onEnablePinForm(enabled) {
      if( !enabled ){
        this.pin_form_visible = false;
      }
      this.pin_form_enabled = enabled;
    }

    onTogglePinForm(visible) {
      this.pin_form_enabled = visible;
      this.pin_form_visible = visible;
    }

    onResetForm() {
      console.log("Resetting form...");
      this.title = '';
      this.description = '';
      this.link_url = '';
      this.attachment = '';
      this.video_url = '';
      this.date_from_day = '';
      this.date_from_month = '';
      this.date_from_year = '';
      this.date_to_day = '';
      this.date_to_month = '';
      this.date_to_year = '';
      this.collections = '';
      this.pin_form_visible = false;
      this.pin_form_lat_lng = {};
      this.pin_form_enabled = false;

      return true;
    }
  }

  this.MapPinStore = alt.createStore(MapPinStore, 'MapPinStore');
})();
