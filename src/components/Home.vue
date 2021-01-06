<template lang="html">

  <section class="home">
    <div class="hero">
      <div class="d-flex w-100 h-100 justify-content-center align-items-center hero-container"
           style="min-height: 100vh">
        <div class="text-center">
          <h1 class="display-4 text-light pb-3">SNCF Data Visualization</h1>
          <div class="btn-group btn-group-lg shadow" role="group" aria-label="Basic example">
            <router-link class="btn btn-dark rounded-0" to="gares">Gares</router-link>
            <router-link class="btn btn-dark rounded-0" to="objets-trouves">Objets Trouvés</router-link>
            <router-link class="btn btn-dark rounded-0" to="about">A Propos</router-link>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves-buttom">
          <path fill="#2a2a2e" fill-opacity="1"
                d="M0,32L60,80C120,128,240,224,360,261.3C480,299,600,277,720,250.7C840,224,960,192,1080,197.3C1200,203,1320,245,1380,266.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
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
  background-image: url('~@/assets/img/hero-background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero .hero-container {
  backdrop-filter: blur(4px);
}

.waves-buttom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
