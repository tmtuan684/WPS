# Leaflet + OpenStreetMap Exercises

A progressive set of Leaflet/OSM exercises, each with a **starter** file (TODOs to fill in)
and a **solution** file (working reference). Every file is a standalone HTML page — just
open it directly in a browser (double-click, or drag into a tab). No build step, npm
install, or local server needed; Leaflet and its plugins load from the unpkg CDN, and map
tiles load from OpenStreetMap — so you do need an internet connection to see the actual maps.

Most examples are centered on Ho Chi Minh City so the data feels a bit more familiar,
but you can change the coordinates to anywhere.

## How to use

1. Open a `*-starter.html` file in your editor and in your browser side by side.
2. Fill in the `// TODO` comments.
3. Refresh the browser to check your work.
4. Compare against the matching `*-solution.html` if you get stuck.

## Structure

### Level 1 — Basics: Getting a Map on the Page
- `1.1-hello-map` — `L.map()`, `L.tileLayer()`, `setView()` — the map "hello world"
- `1.2-marker-popup` — a single marker with a popup
- `1.3-multiple-markers` — placing markers programmatically from a data array
- `1.4-fit-bounds` — auto-zoom/pan so all markers are visible (`L.latLngBounds`, `fitBounds`)

### Level 2 — Styling & Data Layers
- `2.1-custom-icons` — replacing the default pin with `L.divIcon()`, chosen by data (open/closed)
- `2.2-geojson-layer` — rendering a GeoJSON `FeatureCollection` (points + polygon) with `L.geoJSON()`
- `2.3-layer-groups` — organizing markers into toggleable categories with `L.layerGroup()` + `L.control.layers()`
- `2.4-choropleth` — coloring polygons by a data value, with a legend control

### Level 3 — Interactivity
- `3.1-click-to-add-marker` — map click events, reading `e.latlng`
- `3.2-draggable-marker` — `draggable: true`, `drag`/`dragend` events, live coordinate readout
- `3.3-search-geocoding` — free-text search using the Nominatim geocoding API, `flyTo()`
- `3.4-draw-measure` — click-to-draw a polygon, then compute its perimeter and area

### Level 4 — Intermediate: Real Application Patterns
- `4.1-marker-clustering` — grouping hundreds of markers with the Leaflet.markercluster plugin
- `4.2-routing` — pick two points, fetch a route from OSRM, show distance/duration
- `4.3-filterable-directory` — synced sidebar list + map, with category filtering
- `4.4-live-updating-position` — animating a marker's position smoothly along a path

## Notes on external services

A few exercises call free public APIs, so they need network access (and normal browser
CORS behavior applies):
- **3.3** uses [Nominatim](https://operations.osmfoundation.org/policies/nominatim/) (OSM's
  geocoder) — fine for light, non-commercial use; don't hammer it with automated bulk requests.
- **4.2** uses the [OSRM demo routing server](https://project-osrm.org/) — also a shared free
  service meant for light testing, not production traffic.

For a real production app, you'd typically self-host Nominatim/OSRM or use a paid provider
with an SLA — worth keeping in mind if any of this ends up in something staff or students
actually rely on.

## Where this could go next

- **4.3** (filterable directory) is close to a real "facility locator" pattern — could fit
  a hotel property/amenities map alongside your AI-SRL training assistant.
- **2.4** (choropleth) is the same data-driven-styling technique you'd use to visualize any
  per-location metric — e.g. per-department completion rates on a floor plan, if you ever
  wanted a geographic view of RAG/SOP usage instead of a plain table.
- **3.4** (draw & measure) plus **4.2** (routing) are good building blocks for any kind of
  "define an area" or "plan a route" feature.
