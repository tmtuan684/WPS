# Advanced Leaflet + OpenStreetMap Exercises

Five advanced, fully-working demos (not fill-in-the-blank — the point here is to see each
technique working end to end, then adapt it). Each is a standalone HTML file: open it
directly in a browser. All need an internet connection (map tiles, CDN-hosted libraries,
and for B/C/E, Turf.js; A also loads the Leaflet.heat plugin from the CDN).

## Files

### A — Heatmap Visualization (`A-heatmap.html`)
Renders ~300 weighted points as a density heatmap using the Leaflet.heat plugin, with a
toggle to compare against plain markers. Good for "where is activity concentrated"
questions — incident reports, usage logs, foot traffic.

### B — Geofencing with Turf.js (`B-geofencing.html`)
A marker moves along a fixed path; every animation frame, Turf's
`booleanPointInPolygon` checks whether it's inside a defined zone. The marker changes
color and an event log records each entry/exit. This is the core mechanic behind
location-based alerts.

### C — Nearest-Neighbor Spatial Search (`C-nearest-neighbor.html`)
Click anywhere on the map; Turf's `distance()` is used to rank a dataset of points by
proximity to the click, and the 5 nearest are highlighted with connector lines and listed
with their distances. The "find the nearest N locations" pattern.

### D — Time-Series Playback (`D-time-series-playback.html`)
A set of stations, each with a value that changes across a sequence of timestamps
(simulated hourly "traffic" data). A slider + play button lets you scrub through time,
with marker size and color updating to reflect the value at each point in time.

### E — Reachability / Simplified Isochrone (`E-reachability-isochrone.html`)
Drag the origin marker, then compute an approximate "reachable in 10 minutes by car"
zone. The demo queries the OSRM routing engine along 8 compass directions, using a small
binary search per direction to find the reachable radius, then connects the results into
a polygon with Turf.

**Important caveat, stated in the demo too:** this is a simplified approximation for
learning purposes, not a production-grade isochrone. It samples only 8 directions and
does binary search using straight-line "as the crow flies" candidate points rather than
snapping to the actual road network's shape, so the resulting polygon can be noticeably
rougher than a true isochrone. For real applications, use a dedicated isochrone service
(OpenRouteService, Mapbox Isochrone API, or a self-hosted OSRM with the `isochrone`-style
tooling) — they compute this properly from the routing graph itself, not by guessing
radii in a handful of directions.

## Notes on external services

- **A** loads Leaflet.heat from unpkg — no external API calls beyond that.
- **B, C** use Turf.js (loaded from unpkg) for geospatial math — all computation happens
  client-side, no network calls beyond loading the library.
- **E** makes real calls to the free [OSRM demo server](https://project-osrm.org/) — up to
  24 requests per "compute" click (8 directions × 3 refinements). This is fine for
  occasional practice but would need a self-hosted OSRM instance (or a paid routing API)
  for anything beyond light testing, both for rate limits and reliability.

## Where these ideas could plug into your other work

- **B (geofencing)** is a reusable pattern if a hotel property ever wants
  location-triggered prompts (e.g. "you're now in the kitchen zone — here are the
  relevant SOPs") — same `booleanPointInPolygon` mechanic, applied to indoor zones
  instead of city blocks (though indoor positioning itself is a separate, harder problem).
- **D (time-series playback)** is a natural way to visualize something like SOP-query
  volume or training completion over time per location, if that data ever becomes
  geographic rather than purely tabular.
- **A (heatmap)** could visualize where in a usability test users clicked, if you ever
  overlay click coordinates on a real floor plan or map rather than a UI screenshot.
