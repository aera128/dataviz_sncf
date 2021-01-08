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
          <retards></retards>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mx-sm-auto mt-4">
          <h2 class="lead">Moyennes d'ages</h2>
          <hr>
          <age></age>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mx-sm-auto mx-md-0 mt-4 mb-5">
          <h2 class="lead">Top 10 Moyenne Total Voyageurs</h2>
          <hr>
          <voyageurs></voyageurs>
        </b-col>
      </b-row>
    </b-container>

  </section>

</template>

<script lang="js">

import Objects from "./Objects";
import Retards from "./Retards";
import Voyageurs from "./Voyageurs";
import Age from "./Age";

export default {
  name: 'stats',
  components: {
    Age,
    Voyageurs,
    Objects,
    Retards
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
