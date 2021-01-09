<template lang="html">

  <section class="stats">
    <b-container>
      <b-row>
        <b-col>
          <h1 class="display-4">Statistiques</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="4" xl="4" class="mx-sm-auto">
          <h2 class="lead">Objets Trouvés</h2>
          <hr>
          <objects></objects>
        </b-col>
        <b-col sm="12" md="6" lg="8" xl="8" class="mx-sm-auto mt-sm-3 mt-md-0">
          <h2 class="lead">Retards par année en pourcentage</h2>
          <hr>
          <delays></delays>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="12" md="6" lg="6" xl="6" class="mx-sm-auto">
          <h2 class="lead">Moyenne d'age des voyageurs</h2>
          <hr>
          <age></age>
        </b-col>
        <b-col sm="12" md="6" lg="6" xl="6" class="mx-sm-auto">
          <h2 class="lead">Top 20 types d'objets trouvés</h2>
          <hr>
          <type-objects></type-objects>
        </b-col>
      </b-row>
      <b-row class="mt-4 mb-5">
        <b-col class="mx-sm-auto mx-md-0">
          <h2 class="lead">Top 10 Moyenne Total Voyageurs</h2>
          <hr>
          <travelers></travelers>
        </b-col>
      </b-row>
    </b-container>

  </section>

</template>

<script lang="js">

import Objects from "../widgets/stats/Objects";
import Delays from "../widgets/stats/Delays";
import Travelers from "../widgets/stats/Travelers";
import Age from "../widgets/stats/Age";
import TypeObjects from "@/components/widgets/stats/TypeObjects";

export default {
  name: 'stats',
  components: {
    TypeObjects,
    Age,
    Travelers,
    Objects,
    Delays
  },
  props: [],
  mounted() {

  },
  data() {
    return {}
  },
  methods: {},
  computed: {}
}


</script>

<style scoped lang="scss">
.stats {

}
</style>
