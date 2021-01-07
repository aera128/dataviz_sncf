<template lang="html">
  <section class="home">
    <div class="hero">
      <div class="d-flex w-100 h-100 justify-content-center align-items-center hero-container"
           style="min-height: calc(100vh - 56px)">
        <div class="text-center">
          <h1 class="display-4 pb-3">SNCF Data Visualization</h1>
          <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
            <router-link class="btn btn-sncf rounded-pill" to="gares">Gares</router-link>
            <router-link class="btn btn-sncf rounded-pill mx-3" to="statistiques">Stats</router-link>
            <router-link class="btn btn-sncf rounded-pill" to="about">A Propos</router-link>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves-buttom">
          <path fill="#d62246" fill-opacity="1"
                d="M0,288L120,288C240,288,480,288,720,277.3C960,267,1200,245,1320,234.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script lang="js">

export default {
  name: 'home',
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
.hero {
  background-color: #e8f9ed;
}

.waves-buttom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.btn-sncf {
  background-color: #d62246;
  color: #e8f9ed;
  z-index: 1;
}
</style>
