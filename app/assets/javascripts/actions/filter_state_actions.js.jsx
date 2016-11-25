(() => {
  class FilterStateActions {
    toggleAdvancedFilters(visible) {
      return visible;
    }

    updateSearchQuery(value) {
      return value;
    }

    updateFilterAttribute(attribute, value) {
      return {attribute: attribute, value: value};
    }

    updateFilterCentre(centre_point) {
      return centre_point;
    }

    updateFilterBounds(bounds) {
      return bounds;
    }
  }

  this.FilterStateActions = alt.createActions(FilterStateActions);
})();