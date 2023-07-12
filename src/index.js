import * as L from "leaflet-gpx";

async function renderMap(track) {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  // Not working because of CORS:
  // const trackurl = 'https://tracks.world/de/trk10do840/track004.gpx';
  // Instead the track must be downloaded to the server before!
  const gpxString = await fetch(track).then((res) =>
    res.text()
  );
  //console.log(gpxString.slice(0, 50));
  new L.GPX(gpxString, {
    async: true,
    marker_options: {
      startIconUrl: "pin-icon-start.png",
      endIconUrl: "pin-icon-end.png",
      shadowUrl: "pin-shadow.png"
    }
  })
    .on("loaded", (e) => {
      var gpx = e.target;
      map.fitBounds(gpx.getBounds());
      // console.log(gpx.get_elevation_max());
    })
    .addTo(map);
}

const track = window.location.search;
console.log(track.substring(5));

renderMap(track.substring(5)).catch(console.error);
