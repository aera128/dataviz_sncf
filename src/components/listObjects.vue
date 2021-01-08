<template lang="html">

  <section class="list-objects">
    <b-container fluid="">
      <b-row>
        <b-col cols="12" md="10" class="mx-auto">
          <h1 class="display-4">Objets</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="10" class="mx-auto">
          <grid
              :auto-width="autoWidth"
              :cols="cols"
              :rows="rows"
              :pagination="pagination"
              :search="search"
              :sort="sort"
              :language="language"
              :fixedHeader="fixedHeader"
              class="mt-3 gridjs"
          ></grid>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">
import Grid from 'gridjs-vue'
import axios from "axios";

export default {
  name: 'list-objects',
  components: {
    Grid
  },
  props: [],
  mounted() {

  },
  data() {
    return {
      uic: this.$route.query.uic ? this.$route.query.uic : '',
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
    this.loadData()
  }
}


</script>

<style scoped lang="scss">
.list-objects {

}

.gridjs {
  font-size: small;
  line-height: 16px;
}
</style>
