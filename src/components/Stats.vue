<template lang="html">

  <section class="stats">
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h1 class="display-4">Statistiques</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="10" md="6" lg="4" xl="4" class="mx-sm-auto">
          <h2 class="lead">Objets Perdus</h2>
          <hr>
          <objects></objects>
        </b-col>
        <b-col sm="10" md="6" lg="8" xl="8" class="mx-sm-auto mt-sm-3 mt-md-0">
          <h2 class="lead">Retards</h2>
          <hr>
          <retards></retards>
        </b-col>
      </b-row>
    </b-container>

  </section>

</template>

<script lang="js">

import Objects from "./Objects";
import Retards from "./Retards";

export default {
  name: 'stats',
  components: {
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
