<template>
  <aside class="side-bar font-sans pl-4 pt-6">
    <ul class="flex flex-col justify-between items-center transition-all h-full max-md:">
      <li class="text-third font-extrabold text-3xl mb-16 mt-6 mr-4">
        <router-link to="/dashboard">Quizzy</router-link>
      </li>
      <!--dashboard-->
      <li class="text-gray-500 font-medium rounded-full mb-10 ">
        <router-link
          to="/dashboard"
          class="rounded-full px-4 py-3 hover:bg-primary hover:text-white"
          :class="{
            'bg-primary text-white drop-shadow-md': $route.path === '/dashboard',
          }"
        >
          <i class="fas fa-table mr-4"></i>{{ $t('sidebar.dashboard') }}
        </router-link>
      </li>
      <!--support-->
      <li class="text-gray-500 font-medium rounded-full mb-10 mr-8">
        <router-link
          to="/support"
          class="rounded-full px-4 py-3 hover:bg-primary hover:text-white"
          :class="{
            'bg-primary text-white drop-shadow-md': $route.path === '/support',
          }"
        >
          <i class="fa-solid fa-headphones mr-4"></i>{{ $t('sidebar.support') }}
        </router-link>
      </li>
      <!--notifications-->
      <li class="text-gray-500 font-medium rounded-full mb-10 ">
        <router-link
          to="/notifications"
          class="rounded-full px-4 py-3 hover:bg-primary hover:text-white"
          :class="{
            'bg-primary text-white drop-shadow-md': $route.path === '/notifications',
          }"
        >
          <i class="fas fa-bell mr-4"></i>{{ $t('sidebar.notifications') }}
        </router-link>
      </li>

      <li class="text-gray-500 font-medium rounded-full mb-8">
      <button
        @click="toggleLanguage"
        class="rounded-full px-4 py-3 hover:bg-primary hover:text-white"
      >
        {{ currentLanguage === 'en' ? 'العربية' : 'English' }}
      </button>
    </li>

      <!--logout-->
      <li class="text-gray-500 font-medium rounded-full mb-8 mt-auto">
        <router-link
          to="/logout"
          class="rounded-full px-4 py-3 hover:bg-primary hover:text-white"
          :class="{
            'bg-primary text-white drop-shadow-md': $route.path === '/logout',
          }"
        >
          <i class="fa-solid fa-right-from-bracket fa-rotate-180 mr-4 text-primary"></i>{{ $t('sidebar.logout') }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>


<script>
export default {
  name: "SideBar",
  data() {
    return {
      currentLanguage: this.$i18n.locale,
    };
  },
  methods: {
    toggleLanguage() {
      this.$i18n.locale = this.currentLanguage === "en" ? "ar" : "en";
      this.currentLanguage = this.$i18n.locale;
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline;
}
</style>