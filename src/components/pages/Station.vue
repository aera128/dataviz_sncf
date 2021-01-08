<template lang="html">

  <section class="list-objects">
    <b-container v-if="uic">
      <b-row>
        <b-col>
          <h1 class="display-4">Statistiques {{ name }}</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col sm="12" md="6" lg="5" xl="5" class="mx-sm-auto">
          <h2 class="lead">Objets Trouvés</h2>
          <hr>
          <objects :uic="uic"></objects>
        </b-col>
        <b-col sm="12" md="6" lg="7" xl="7" class="mx-sm-auto mt-sm-3 mt-md-0">
          <h2 class="lead">Top 10 types d'objets trouvés</h2>
          <hr>
          <type-objects :uic="uic"></type-objects>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h1 class="display-4">Objets</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <grid
              :auto-width="autoWidth"
              :cols="cols"
              :rows="rows"
              :pagination="pagination"
              :search="search"
              :sort="sort"
              :language="language"
              :fixedHeader="fixedHeader"
              class="mt-3 mb-5 gridjs"
          ></grid>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-if="!uic">
      <b-row>
        <b-col>
          <h1 class="display-4">Error</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row class="mb-5">
        <i>Aucune gare selectionnée ou trouvée, veuillez en selectionner une sur
          <b-link to="/gares">la Carte</b-link>
        </i>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">
import Grid from 'gridjs-vue'
import axios from "axios";
import Objects from "@/components/widgets/stats/Objects";
import TypeObjects from "@/components/widgets/stats/TypeObjects";

export default {
  name: 'station',
  components: {
    Grid,
    Objects,
    TypeObjects
  },
  props: [],
  mounted() {

  },
  data() {
    return {
      uic: this.$route.query.uic ? this.$route.query.uic : '',
      name: '',
      autoWidth: true,
      cols: ["Nature", "Gare", "Date", "Type", "Objet", "UIC_Gare"],
      rows: [{
        "nature": 'Loading..',
        "gare": 'Loading..',
        "date": 'Loading..',
        "type": 'Loading..',
        "objet": 'Loading..',
        "uic_gare": 'Loading..'
      }],
      pagination: true,
      search: true,
      sort: true,
      fixedHeader: true,
      language: {
        'search': {
          'placeholder': 'Rechercher'
        },
        'pagination': {
          'previous': '<',
          'next': '>',
          'showing': 'Affichage de',
          'results': () => 'enregistrements',
          'to': 'à',
          'of': 'sur'
        },
        'gc_obo_nature_c': 'Nature'
      },
      response: null
    }
  },
  methods: {
    loadData() {
      if (this.uic !== '') {
        axios.get("https://data.sncf.com/api/records/1.0/search/", {
          params: {
            "dataset": "objets-trouves-restitution",
            "timezone": "UTC",
            "q": "gc_obo_gare_origine_r_code_uic_c:" + this.uic,
            "rows": -1,
            "sort": [
              "date"
            ],
            "format": "json",
          }
        }).then(r => {
          this.response = r.data

          if (r.data.nhits === 0) {
            this.uic = null
          } else {
            this.cols = ["Nature", "Gare", "Date", "Type", "Objet", "UIC_Gare"]
            let data = []
            this.response.records.map(value => {
              this.renameKey(value.fields, "gc_obo_nature_c", "nature")
              this.renameKey(value.fields, "gc_obo_gare_origine_r_name", "gare")
              this.renameKey(value.fields, "gc_obo_nom_recordtype_sc_c", "type")
              this.renameKey(value.fields, "gc_obo_type_c", "objet")
              this.renameKey(value.fields, "gc_obo_gare_origine_r_code_uic_c", "uic_gare")
              data.push(value.fields);
            })
            this.rows = data
          }

        })
      } else {
        this.rows = []
      }
    },
    renameKey(obj, key, newKey) {
      obj[newKey] = obj[key];
      delete obj["key"];
    },
  },
  computed: {},
  async created() {
    this.name = this.$route.query.name ? this.$route.query.name : ''
    this.loadData()
  }
}


</script>

<style scoped lang="scss">
.list-objects {
  min-height: calc(100vh - 56px);
}

.gridjs {
  font-size: small;
  line-height: 16px;
}
</style>
