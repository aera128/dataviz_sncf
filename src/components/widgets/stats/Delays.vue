<template lang="html">

  <section class="retards">
    <b-container fluid>
      <b-row>
        <b-col class="mb-4">
          <label>Année :</label>
          <select v-model="year" @change="updateChart" class="form-control">
            <option v-for="option in select_options" v-bind:key="option.value" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">

import axios from "axios";
import BarChart from "../../charts/BarChart";
import tinycolor2 from "tinycolor2";

export default {
  name: 'delays',
  components: {BarChart},
  props: [],
  mounted() {

  },
  data() {
    return {
      year: new Date().getFullYear() - 1,
      response: null,
      chartData: null,
      chartOptions: null,
    }
  },
  methods: {
    updateChart() {
      axios.get("https://data.sncf.com/api/records/1.0/search/", {
        params: {
          dataset: "reglarite-mensuelle-tgv-nationale",
          rows: -1,
          sort: "-date",
          q: "annee:" + this.year
        }
      }).then(r => {
        this.response = r.data.records;
        let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        let labels = []
        let tmp_data = []
        let colors = []
        let index = 0

        this.response.forEach(value => {
          labels.push(months[value.fields.mois - 1]);
          tmp_data.push(100 - value.fields.regularite_composite_en_)
          colors.push(tinycolor2("#0e7c7b").lighten(5 * index).toString())
          index++
        })
        this.chartData = {
          labels: labels,
          datasets: [{
            label: "Taux de retard par année :",
            backgroundColor: colors,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            data: tmp_data
          }]
        }

        this.chartOptions = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function (tooltipItems) {
                return tooltipItems.yLabel.toFixed(2) + "%";
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          height: 200
        }
      })
    }
  },
  computed: {
    select_options() {
      let options = []
      for (let i = new Date().getFullYear() - 1; i >= 2015; i--) {
        options.push({text: i, value: i})
      }
      return options
    }
  },
  async created() {
    this.updateChart()
  }
}


</script>

<style scoped lang="scss">
.retards {

}
</style>
