<template lang="html">

  <section class="type-objects">
    <b-container fluid>
      <b-row class="mt-5">
        <b-col>
          <horizontal-bar-chart :data="chartData" :options="chartOptions"></horizontal-bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="js">

import axios from "axios";
import * as qs from "qs";
import tinycolor2 from "tinycolor2";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";

export default {
  name: 'type-objects',
  components: {
    HorizontalBarChart
  },
  props: ['uic'],
  mounted() {

  },
  data() {
    return {
      response: null,
      chartOptions: {
        legend: {
          display: false
        },
      },
      chartData: {}
    };
  },
  methods: {
    getData() {
      let params = {
        dataset: "objets-trouves-restitution",
        q: this.uic ? 'gc_obo_gare_origine_r_code_uic_c:' + this.uic : '',
        rows: 1,
        facet: [
          "gc_obo_nature_c"
        ]
      }

      params = qs.stringify(params, {indices: false})
      axios
          .get("https://data.sncf.com/api/records/1.0/search/?" + params)
          .then(r => {
            this.response = r.data;
            this.updatePie()
          })
    },
    updatePie() {
      let types = this.response.facet_groups.find(x => x.name === "gc_obo_nature_c")
      let labels = []
      let data = []

      let index = 0
      let colors = []
      types.facets.map(value => {
        if (index < 20) {
          labels.push(value.name)
          data.push(value.count)
          colors.push(tinycolor2("#0e7c7b").lighten(3 * index).toString())
          index++
        } else {
          return
        }
      })
      this.chartData = {
        hoverBorderWidth: 10,
        labels: labels,
        datasets: [
          {
            label: "data",
            backgroundColor: colors,
            data: data
          }
        ],
      }
    }
  },
  computed: {},
  async created() {
    this.getData()
  }
}


</script>

<style scoped lang="scss">
.type-objects {

}
</style>
