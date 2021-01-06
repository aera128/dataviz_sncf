<template>
  <div id="app">
    <sidebar-menu id="menu" :menu="menu" :collapsed="true" @item-click="onItemClick"/>
    <vue-page-transition name="overlay-left-full">
      <router-view class="page-content"/>
    </vue-page-transition>
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
          href: '/objets-trouves',
          title: 'Objets Trouvés',
          icon: 'fa fa-flag'
        },
        {
          href: '/about',
          title: 'A Propos',
          icon: 'fa fa-info'
        },
      ],
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
.page-content {
  position: relative;
  left: 50px;
  width: calc(100% - 50px);
}

.v-sidebar-menu {
}

.v-sidebar-menu.vsm_expanded {
}

.v-sidebar-menu.vsm_collapsed {
}

.v-sidebar-menu.vsm_rtl {
}

.v-sidebar-menu .vsm--item {
}

.v-sidebar-menu .vsm--item.vsm--item_open {
}

.v-sidebar-menu .vsm--link {
}

.v-sidebar-menu .vsm--link.vsm--link_active {
}

.v-sidebar-menu .vsm--link.vsm--link_exact-active {
}

.v-sidebar-menu .vsm--link.vsm--link_mobile-item {
}

.v-sidebar-menu .vsm--link.vsm--link_level-[n] {
}

.v-sidebar-menu .vsm--link.vsm--link_disabled {
}

.v-sidebar-menu .vsm--title {
}

.v-sidebar-menu .vsm--icon {
  background: transparent !important;
  padding-top: 5px;
  padding-bottom: 5px;
}

.v-sidebar-menu .vsm--arrow {
}

.v-sidebar-menu .vsm--arrow.vsm--arrow_open {
}

.v-sidebar-menu .vsm--badge {
}

.v-sidebar-menu .vsm--header {
}

.v-sidebar-menu .vsm--list {
}

.v-sidebar-menu .vsm--dropdown > .vsm--list {
}

.v-sidebar-menu .vsm--mobile-item {
}

.v-sidebar-menu .vsm--mobile-bg {
}

.v-sidebar-menu .vsm--toggle-btn {
  background-color: #2a2a2e !important;
}

.overlay-right,
.overlay-left
{
  background-color: #2a2a2e !important;
}

:root{
  $enable-responsive-font-sizes: true;
}
</style>
