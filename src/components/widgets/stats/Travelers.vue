<template lang="html">

  <section class="voyageurs">
    <b-container fluid>
      <b-row>
        <b-col>
          <label>Année :</label>
          <select v-model="year" @change="loadData" class="form-control">
            <option v-for="option in select_options" v-bind:key="option.value" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div id="loader" class="d-flex align-items-center justify-content-center mt-3">
            <b-spinner label="Spinning" style="width: 3rem; height: 3rem;"></b-spinner>
          </div>
          <horizontal-bar-chart id="chart" class="loading mt-3" :data="chartData"
                                :options="chartOptions"></horizontal-bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">

import * as qs from "qs";
import axios from "axios";
import HorizontalBarChart from "../../charts/HorizontalBarChart";
import tinycolor2 from "tinycolor2";

export default {
  name: 'travelers',
  components: {HorizontalBarChart},
  props: [],
  mounted() {

  },
  data() {
    return {
      year: 2019,
      chartData: [],
      chartOptions: [],
      response: null
    }
  },
  methods: {
    loadData() {
      try {
        document.querySelector('#chart').classList.add('loading')
        document.querySelector('#loader').classList.remove('loading')
      } catch (e) {
        console.log()
      }
      let params = {
        dataset: "frequentation-gares",
        rows: 10,
        sort: this.year !== 2017 ? "total_voyageurs_" + this.year : "totalvoyageurs" + this.year
      }

      params = qs.stringify(params)
      axios.get("https://data.sncf.com/api/records/1.0/search/?" + params)
          .then(r => {
            let data = []
            r.data.records.map(value => {
              data.push(value.fields)
            });
            this.response = data
            this.updateChart()
            document.querySelector('#chart').classList.remove('loading')
            document.querySelector('#loader').classList.add('loading')
          })
    },
    updateChart() {
      if (this.response === null) {
        this.loadData()
      } else {
        let labels = []
        let rows = []
        let colors = []
        for (let i = 0; i < 10; i++) {
          colors.push(tinycolor2("#0e7c7b").lighten(5 * i).toString())
          labels.push(this.response[i].nom_gare)
          switch (this.year) {
            case 2015:
              rows.push(this.response[i].total_voyageurs_2015);
              break;
            case 2016:
              rows.push(this.response[i].total_voyageurs_2016);
              break;
            case 2017:
              rows.push(this.response[i].totalvoyageurs2017);
              break;
            case 2018:
              rows.push(this.response[i].total_voyageurs_2018);
              break;
            case 2019:
              rows.push(this.response[i].total_voyageurs_2019);
              break;
          }
        }
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: "2015",
              data: rows,
              backgroundColor: colors,
            }
          ]
        }

        this.chartOptions = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return Math.round(value / 1000000) + "M";
                }
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

                return (tooltipItems.xLabel / 1000000).toFixed(2) + "M"
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          height: 400,
          elements: {
            rectangle: {
              borderWidth: 1
            }
          }
        }
      }
    }
  },
  computed: {
    select_options() {
      let options = []
      for (let i = 2019; i >= 2015; i--) {
        options.push({text: i, value: i})
      }
      return options
    }
  },
  async created() {
    this.loadData()
  }
}


</script>

<style scoped lang="scss">
.loading {
  display: none !important;
}

#loader {
  width: 100%;
  height: 400px;
  color: #d62246;
}
</style>
