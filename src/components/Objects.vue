<template lang="html">
  <section class="objects">
    <b-container fluid>
      <b-row>
        <b-col>
          <label>Année :</label>
          <select v-model="year" @change="updatePie" class="form-control">
            <option v-for="option in select_options" v-bind:key="option.value" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Total : {{ total }}<br>Restitutions : {{ nb_restitutions }}<br>Pourcentage : {{ pourcentage }}</p>
          <span></span>
          <pie :data="chartData" :options="chartOptions"></pie>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">
import axios from "axios";
import Pie from "./Pie";

export default {
  name: 'objects',
  components: {
    Pie
  },
  props: {},
  mounted() {

  },
  data() {
    return {
      total: 0,
      nb_restitutions: 0,
      pourcentage : 0,
      response: null,
      year: new Date().getFullYear(),
      chartOptions: {
        hoverBorderWidth: 50
      },
      chartData: {}
    };
  },
  methods: {
    getData() {
      axios
          .get("https://data.sncf.com/api/records/1.0/search/?dataset=objets-trouves-restitution&q=&rows=1&facet=date&facet=gc_obo_date_heure_restitution_c&facet=gc_obo_gare_origine_r_name&facet=gc_obo_nature_c&facet=gc_obo_type_c&facet=gc_obo_nom_recordtype_sc_c")
          .then(r => {
            this.response = r.data;
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
        this.nb_restitutions = restitutions.facets.find(x => x.name == this.year).count;
        this.pourcentage = (this.nb_restitutions*100/this.total).toFixed(2) +"%";

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
  computed: {
    select_options() {
      let options = []
      for (let i = new Date().getFullYear(); i >= 2013; i--) {
        options.push({text: i, value: i})
      }
      return options
    }
  },
  async created() {
    this.updatePie()
  }
}


</script>

<style scoped lang="scss">
.objects {
}
</style>
