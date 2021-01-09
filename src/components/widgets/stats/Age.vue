<template lang="html">

  <section class="age">
    <b-container fluid>
      <b-row>
        <b-col class="mx-auto pt-5">
          <line-chart :data="chartData" :options="chartOptions"></line-chart>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">
import axios from "axios";
import * as qs from "qs";
import LineChart from "../../charts/LineChart";

export default {
  name: 'age',
  props: ['uic'],
  components: {
    LineChart,
  },
  mounted() {

  },
  data() {
    return {
      response: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        height: 400,
        fill: "transparent",
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
        dataset: "enquetes-gares-connexions-repartition-repartition-par-classe-dage",
        q: this.uic ? 'uic:' + this.uic : '',
        rows: -1,
        facet: ["classe_d_age"]
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
      if (this.response == null) {
        this.getData();
      } else {
        let data = this.response.facet_groups.find(x => x.name === "classe_d_age").facets
        let labels = [];
        data.map(value => {
          labels.push(value.name)
        })

        let fields = []
        this.response.records.map(value => {
          fields.push(value.fields)
        })

        let means = []
        labels.forEach(age => {
          let sum = 0
          let count = 0
          fields.filter(f => f.classe_d_age === age).forEach(f => {
            sum += f.pourcentage;
            count++;
          })
          means.push((sum / count).toFixed(2))
        })
        this.chartData = {
          height:200,
          hoverBorderWidth: 10,
          labels: labels,
          datasets: [
            {
              label: "data",
              borderColor: "#13aaa8",
              data: means,
              fill: false,
            }
          ]
        }

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
.age {

}
</style>
