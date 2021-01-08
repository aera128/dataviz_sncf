<template lang="html">

  <section class="gares">
    <l-map class="l-map" :zoom="zoom" :center="center" @popupopen="test">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-geo-json
          v-if="show"
          :geojson="geojson"
          :options="options"
          :options-style="styleFunction"></l-geo-json>
    </l-map>
    <div class="input-group search-input">
      <input type="text" class="form-control" placeholder="Search" v-model="q" @keyup="updateQuery">
      <div class="input-group-append">
        <button class="btn btn-secondary" type="button" @click="updateQuery" id="btn-search">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet';
import axios from "axios";
import * as qs from "qs";

export default {
  name: 'map',
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
      center: [47, 2],
      enableTooltip: true,
      geojson: {
        "type": "FeatureCollection",
        "features": {},
      },
      timer: null,
      prevRoute: null,
      q: this.$route.query.q,
      foundObjects: null
    }
  },
  methods: {
    updateQuery() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$router.push({path: 'map', query: {q: this.q}});
        this.updateMap();
      }, 800);
    },
    updateMap() {
      document.querySelector("#btn-search").innerHTML = '<div class="spinner-border" style="width: 1rem; height: 1rem; border-width: 2px" role="status"><span class="sr-only">Loading...</span</div>';
      let params = {
        dataset: "referentiel-gares-voyageurs",
        q: (!this.query || this.query === "") ? "niveauservice_libelle > 1" : "niveauservice_libelle > 1 and " + this.query,
        rows: -1,
        facet: ["departement_libellemin", "segmentdrg_libelle", "gare_agencegc_libelle", "gare_regionsncf_libelle", "gare_ug_libelle"]
      }
      params = qs.stringify(params, {indices: false})

      axios
          .get('https://ressources.data.sncf.com/api/records/1.0/search/?' + params)
          .then(r => {
            let list = [];
            r.data.records.map((value) => {
              let facet = this.foundObjects.facets.find(x => x.name === value.fields.alias_libelle_noncontraint)
              list.push({
                "type": "Feature",
                "properties": {
                  "popupContent":
                      "<div><strong>Code : </strong> " + value.fields.code + " </div>" +
                      "<div><strong>Gare : </strong> " + value.fields.alias_libelle_noncontraint + " </div>" +
                      "<div><strong>Département : </strong> " + value.fields.departement_libellemin + " </div>" +
                      "<div><strong>N° Département : </strong> " + value.fields.departement_numero + " </div>" +
                      "<div><strong>Latitude : </strong> " + value.fields.latitude_entreeprincipale_wgs84 + " </div>" +
                      "<div><strong>Longitude : </strong> " + value.fields.longitude_entreeprincipale_wgs84 + " </div>" +
                      "<div><strong>Niveau de service : </strong> " + value.fields.niveauservice_libelle + " </div>" +
                      (facet ? "<div><strong>Total d'objets trouvés : </strong> " + facet.count + " </div>" : '') +
                      (facet ? "<div class='text-center'>" +
                          "<div " +
                          "style='cursor: pointer' class='objects-station btn btn-primary btn-sm rounded-pill mt-3' " +
                          "to='station/?uic=" + value.fields.uic_code + "&name=" + value.fields.alias_libelle_noncontraint + "'>Voir Statistiques</div>" +
                          "</div>" :
                          "<div><i>Pas d'objets trouvés</div>")
                },
                "geometry": value.geometry
              });
            })
            this.geojson["features"] = list;
            document.querySelector("#btn-search").innerHTML = '<i class="fa fa-search"></i>';
          })
    },
    test() {
      try {
        document.querySelector('.objects-station').addEventListener('click', () => {
          if (document.querySelector('.objects-station')) {
            this.$router.push(document.querySelector('.objects-station').getAttribute('to'))
          }
        })
      } catch (e) {
        return -1
      }
    },
  },
  computed: {
    query() {
      return this.$route.query.q
    },
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
    await axios.get("https://data.sncf.com/api/records/1.0/search/?dataset=objets-trouves-restitution&q=&rows=1&facet=date&facet=gc_obo_date_heure_restitution_c&facet=gc_obo_gare_origine_r_name&facet=gc_obo_nature_c&facet=gc_obo_type_c&facet=gc_obo_nom_recordtype_sc_c")
        .then(r => {
          this.foundObjects = r.data.facet_groups.find(facets => facets.name === "gc_obo_gare_origine_r_name")
        })
    this.updateMap();
  },
  watch: {
    $route(to,) {
      this.q = to.query.q;
      this.updateMap();
    }
  }
}
</script>

<style scoped lang="scss">
.l-map {
  position: relative;
  left: 0;
  width: 100%;
  height: calc(100vh - 56px);
  z-index: 0;
}

.search-input {
  position: absolute;
  top: 69px;
  left: 50px;
  width: calc(100% - 60px);
  @media (min-width: 576px) {
    width: calc(100% - 60px);
  }
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 30%;
  }
}

</style>
