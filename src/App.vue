<template>
  <div id="app">
      <sidebar-menu :menu="menu" :collapsed="true"/>
      <router-view class="page-content"/>
  </div>
</template>

<script lang="js">
import {SidebarMenu} from 'vue-sidebar-menu'

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  props: [],
  mounted() {

  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'Dataviz',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Accueil',
          icon: 'fa fa-home'
        },
        {
          href: '/gares',
          title: 'Gares',
          icon: 'fa fa-train'
        },
        {
          href: '/about',
          title: 'A Propos',
          icon: 'fa fa-info'
        },
      ],
    }
  },
  methods: {},
  computed: {}
}
</script>
<style lang="scss">
.page-content {
  position: relative;
  left: 50px;
  width: calc(100% - 50px);
}
.v-sidebar-menu .vsm--icon {
  background: transparent !important;
}
</style>
