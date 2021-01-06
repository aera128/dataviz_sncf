<template lang="html">

  <section class="gares">
    <l-map class="l-map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-geo-json
          v-if="show"
          :geojson="geojson"
          :options="options"
          :options-style="styleFunction"></l-geo-json>
    </l-map>
    <div>{{ sncf }}</div>
  </section>

</template>

<script lang="js">
// import L from 'leaflet';
import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet';
import axios from "axios";

export default {
  name: 'gares',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  props: [],
  mounted() {

  },
  data() {
    return {
      show: true,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 6,
      center: [48, -1.219482],
      enableTooltip: true,
      geojson: {
        "type": "FeatureCollection",
        "features": {},
      },
      sncf: null,
    }
  },
  methods: {},
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
        }
      }
    }
  },
  async created() {
    axios
        .get('https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=niveauservice_libelle%3E1&rows=-1&sort=gare_alias_libelle_noncontraint')
        .then(r => {
          let list = [];
          r.data.records.map((value) => {
            list.push({
              "type": "Feature",
              "properties": {
                "popupContent":
                    "<div><strong>Code : </strong> " + value.fields.code + " </div>"+
                    "<div><strong>Gare : </strong> " + value.fields.alias_libelle_noncontraint + " </div>"+
                    "<div><strong>Département : </strong> " + value.fields.departement_libellemin + " </div>"+
                    "<div><strong>N° Département : </strong> " + value.fields.departement_numero + " </div>"+
                    "<div><strong>Latitude : </strong> " + value.fields.latitude_entreeprincipale_wgs84 + " </div>"+
                    "<div><strong>Longitude : </strong> " + value.fields.longitude_entreeprincipale_wgs84 + " </div>"+
                    "<div><strong>Niveau de service : </strong> " + value.fields.niveauservice_libelle + " </div>"
              },
              "geometry": value.geometry
            });
            this.geojson["features"] = list;
          })
        })
  }
}


</script>

<style scoped lang="scss">
.l-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
