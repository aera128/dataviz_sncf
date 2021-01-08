<template lang="html">

  <section class="about">
    <b-container>
      <b-row>
        <b-col>
          <h1 class="display-4">A Propos</h1>
          <hr class="my-4">
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h2 class="lead mb-4">Auteurs</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="Matthieu MERCIER" class="mb-2">
            <b-card-text>
              <i>Student - Master 2 Informatique Université de Caen</i>
            </b-card-text>
            <b-button href="https://github.com/aera128" target="_blank" variant="primary"><i class="fab fa-github"></i> Github</b-button>
          </b-card>
        </b-col>
        <b-col>
          <b-card title="Alexandre LELOUTRE" class="mb-2">
            <b-card-text>
              <i>Student - Master 2 Informatique Université de Caen</i>
            </b-card-text>
            <b-button href="https://github.com/ALeloutre" target="_blank" variant="primary"><i class="fab fa-github"></i> Github</b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h2 class="lead mb-3">Librairies</h2>
          <b-list-group class="mb-5">
            <b-list-group-item><b-link href="https://vuejs.org/" target="_blank">Vue CLI</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://vuejs.org/" target="_blank">Vue.js</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://router.vuejs.org/" target="_blank">Vue Router</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://vue2-leaflet.netlify.app/" target="_blank">Vue Leaflet</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://bootstrap-vue.org/" target="_blank">BootstrapVue</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://vue-chartjs.org/" target="_blank">vue-chartjs</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://github.com/grid-js/gridjs-vue" target="_blank">gridjs-vue</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://github.com/imcvampire/vue-axios" target="_blank">vue-axios</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://github.com/Orlandster/vue-page-transition" target="_blank">vue-page-transition</b-link></b-list-group-item>
            <b-list-group-item><b-link href="https://github.com/Orlandster/vue-typed-js" target="_blank">vue-typed-js</b-link></b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </section>

</template>

<script lang="js">

export default {
  name: 'about',
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
.about {

}
</style>
