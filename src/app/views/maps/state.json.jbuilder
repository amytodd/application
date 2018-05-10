Rails.logger.info("params state.json.jbuilder render")

if @collection
  json.partial! 'maps/partials/collection', {locals: {collection: @collection, records: @records, collections: @collections}}
else
  json.partial! 'maps/partials/records', {locals: {records: @records, collections: @collections}}
end

json.class "#{collections.class} class"

json.set! :recordFormStore do
end

json.layersStore({})
json.set! :layersStore do
  json.layers [
                {id: 1, title: "Roque map", description: "<p>The Roque Map description</p>", date: Date.new, url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", attribution: "Some Attribution", opacity: 1, enabled: false},
                {id: 2, title: "Morgan map", description: "<p>The Morgan map description</p>", date: Date.new, url: "http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png", attribution: "Some Attribution", opacity: 1, enabled: false},
                {id: 3, title: "Example map", description: "<p>Example Map description</p>", date: Date.new, url: "https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png", attribution: "Some Attribution", opacity: 1, enabled: false},
                {id: 4, title: "Another map", description: "<p>Another map description</p>", date: Date.new, url: "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png", attribution: "Some Attribution", opacity: 1, enabled: false}
              ]
end

json.mapViewStore({})
json.set! :mapViewStore do
  json.center [@record.lat, @record.lng] if @record
  json.center [51.55227613396215, 0.26617169380187999] unless @record
  json.zoom 10
end

json.collectionStore({})
json.set! :collectionStore do
  json.set! :collections do
    json.array! @collections do |collection|
      json.partial! 'collections/collection', {locals: {collection: collection}}
    end
  end
end
