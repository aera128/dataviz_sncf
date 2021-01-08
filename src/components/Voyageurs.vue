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
          <div id="loader" class="d-flex align-items-center justify-content-center">
            <b-spinner label="Spinning" style="width: 3rem; height: 3rem;"></b-spinner>
          </div>
          <horizontal-bar-chart id="chart" class="loading" :data="chartData" :options="chartOptions"></horizontal-bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">

import * as qs from "qs";
import axios from "axios";
import HorizontalBarChart from "./horizontalBarChart";

export default {
  name: 'voyageurs',
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
      }
      catch (e){
        console.log()
      }
      let params = {
        dataset: "frequentation-gares",
        rows: -1,
        sort: "total_voyageurs_" + this.year
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
        for (let i = 0; i < 10; i++) {
          labels.push(this.response[i].nom_gare)
          switch (this.year) {
              case 2015:
                rows.push(this.response[i].total_voyageurs_2015);
                break;
              case 2016:
                rows.push(this.response[i].total_voyageurs_2016);
                break;
              case 2017:
                rows.push(this.response[i].total_voyageurs_2017);
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
              backgroundColor: ["#de2e51", "#e03f5f", "#e3506d", "#e6617b", "#e97289", "#eb8297", "#ee93a6", "#f1a4b4", "#f3b5c2", "#f6c6d0"],
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
