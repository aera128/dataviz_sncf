<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" variant="faded" type="light" sticky class="navbar-sncf">
        <b-navbar-brand>
          <b-img class="d-inline-block align-top"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Logo_SNCF_2011.svg/1200px-Logo_SNCF_2011.svg.png"
                 alt="Logo" height="30px"></b-img>
          SNCF.stats
        </b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <router-link to="/" tag="b-nav-item"><i class="fa fa-home"></i> Accueil</router-link>
            <router-link to="/map" tag="b-nav-item"><i class="fa fa-map"></i> Carte</router-link>
            <router-link to="/stats" tag="b-nav-item"><i class="fas fa-chart-pie"></i> Stats</router-link>
            <router-link to="/about" tag="b-nav-item"><i class="fa fa-info-circle"></i> A Propos</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <vue-page-transition name="overlay-up-full">
      <router-view class="page-content"/>
    </vue-page-transition>
    <footer class="footer d-flex align-items-center justify-content-center">
      <span class="lead"><i class="fa fa-copyright"></i> 2021</span>
    </footer>
  </div>
</template>

<script lang="js">

export default {
  name: 'App',
  components: {},
  props: [],
  mounted() {

  },
  data() {
    return {}
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
.overlay-bottom {
  background-color: #d62246 !important;
  z-index: 9998;
}

.navbar-sncf {
  background-color: #ffffff;
  z-index: 20;
}
.footer{
  background-color: #d62246 !important;
  height: 200px;
  color: #e8f9ed;
}
</style>
