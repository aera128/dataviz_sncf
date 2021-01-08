<template lang="html">
  <section class="objects">
    <b-container fluid>
      <b-row>
        <b-col>
          <label>Année :</label>
          <select v-model="year" @change="updatePie" class="form-control mb-2">
            <option v-for="option in select_options" v-bind:key="option.value" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p><strong>Total :</strong> {{ total }}<br><strong>Restitutions :</strong> {{ nb_restitutions }}<br><strong>Pourcentage
            :</strong> {{ pourcentage }}</p>
          <span></span>
          <pie :data="chartData" :options="chartOptions"></pie>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="js">
import axios from "axios";
import Pie from "../../charts/PieChart";
import * as qs from "qs";

export default {
  name: 'objects',
  components: {
    Pie
  },
  props: ['uic'],
  mounted() {

  },
  data() {
    return {
      total: 0,
      nb_restitutions: 0,
      pourcentage: 0,
      response: null,
      year: new Date().getFullYear(),
      chartOptions: {
        hoverBorderWidth: 50
      },
      chartData: {},
      select_options: [{text: new Date().getFullYear(), value: new Date().getFullYear()}]
    };
  },
  methods: {
    getData() {
      let params = {
        dataset: "objets-trouves-restitution",
        q: this.uic ? 'gc_obo_gare_origine_r_code_uic_c:' + this.uic : '',
        rows: 1,
        facet: [
          "gc_obo_date_heure_restitution_c",
          "gc_obo_gare_origine_r_name",
          "gc_obo_nature_c",
          "gc_obo_type_c",
          "gc_obo_nom_recordtype_sc_c",
          "date",
        ],
        "sort": [
          "date"
        ],
        select_options: []
      }
      params = qs.stringify(params, {encode: true, indices: false})
      axios
          .get("https://data.sncf.com/api/records/1.0/search/?" + params)
          .then(r => {
            this.response = r.data;
            let date = this.response.facet_groups.find(x => x.name === "date")
            let options = []
            date.facets.forEach(value => {
              options.push({text: value.name, value: value.name})
            })
            this.select_options = options
            this.year = options[options.length - 1].value
            this.updatePie()
          })
    },
    updatePie() {
      if (this.response == null) {
        this.getData();
      } else {
        let date = this.response.facet_groups.find(x => x.name === "date")
        this.total = date.facets.find(x => x.name == this.year).count;
        let restitutions = this.response.facet_groups.find(x => x.name === "gc_obo_date_heure_restitution_c")
        let get_year = restitutions.facets.find(x => x.name == this.year)
        this.nb_restitutions = get_year ? get_year.count : 0;
        this.pourcentage = (this.nb_restitutions * 100 / this.total).toFixed(2) + "%";

        this.chartData = {
          hoverBorderWidth: 10,
          labels: ["Nombre d'objets restitués", "Nombre d'objets non rendus"],
          datasets: [
            {
              label: "data",
              backgroundColor: ["#0e7c7b", "#d62246"],
              data: [
                this.nb_restitutions,
                this.total - this.nb_restitutions]
            }
          ]
        }
      }
    }
  },
  computed: {},
  async created() {
    this.updatePie()
  }
}


</script>

<style scoped lang="scss">
.objects {
}
</style>
