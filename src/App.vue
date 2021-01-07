<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" variant="faded" type="light" sticky class="navbar-sncf">
        <b-navbar-brand href="/">
          <b-img class="d-inline-block align-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Logo_SNCF_2011.svg/1200px-Logo_SNCF_2011.svg.png" alt="Logo" height="30px"></b-img>
          SNCF Visualisation
        </b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item><b-link class="text-decoration-none text-secondary" to="/">Accueil</b-link></b-nav-item>
            <b-nav-item><b-link class="text-decoration-none text-secondary" to="/gares">Cartes</b-link></b-nav-item>
            <b-nav-item><b-link class="text-decoration-none text-secondary" to="/statistiques">Stats</b-link></b-nav-item>
            <b-nav-item><b-link class="text-decoration-none text-secondary" to="/about">A Propos</b-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <vue-page-transition name="overlay-up-full">
      <router-view class="page-content"/>
    </vue-page-transition>
  </div>
</template>

<script lang="js">

export default {
  name: 'App',
  components: {
  },
  props: [],
  mounted() {

  },
  data() {
    return {
    }
  },
  methods: {
    onItemClick() {
      if (document.querySelector('#menu').classList.contains('vsm_expanded')) {
        document.querySelector('.vsm--toggle-btn').click();
      }
    }
  },
  computed: {}
}
</script>
<style lang="scss">
.overlay-top,
.overlay-bottom
{
  background-color: #d62246 !important;
  z-index: 9998;
}
.navbar-sncf{
  background-color: #ffffff;
  z-index: 20;
}
</style>
