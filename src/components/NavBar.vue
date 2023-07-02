<template>
  <nav class="navbar font-sans w-full px-12">
    <!-- search bar -->
    <i
      class="fa-solid fa-bars absolute right-8 text-3xl 
       px-2 py-1 text-primary hover:text-white hover:bg-primary cursor-pointer rounded-lg "
      :class="{ '': this.$i18n.locale === 'ar' }"
      @click="showMenu = !showMenu"
    ></i>

    <ul
      class="flex items-center my-10 justify-between w-full max-lg:flex-col-reverse max-lg:ml-auto max-lg:items-center max-lg:w-1/2 max-lg:gap-4"
      v-show="showMenu"
      :class="{
        'w-1/2': showMenu,
        hidden: !showMenu,
        'flex-row-reverse': this.$i18n.locale == 'ar',
      }"
    >
      <li class="search drop-shadow-md">
        <i
          class="fas fa-search text-primary absolute z-20 top-4 left-4"
          :class="{ 'left-64': this.$i18n.locale === 'ar' }"
        ></i>
        <input
          type="text"
          :placeholder="$t('navbar.searchPlaceholder')"
          :class="{ 'text-right': this.$i18n.locale === 'ar' }"
          class="relative px-12 py-6 p h-8 border-0 outline-none focus:outline-none rounded-full"
        />
      </li>
      <li
        class="bg-primary block px-12 py-3 rounded-full cursor-pointer transition-all font-semibold text-white border-2 hover:bg-white hover:text-primary hover:border-primary"
      >
        <router-link to="/categories">{{ $t("navbar.startQuiz") }}</router-link>
      </li>
      <li>
        <a href="#" class="w-8">
          <!-- profile img -->
          <img
            src="../../public/img/profile-avatar.jpg"
            alt="profile"
            class="rounded-full h-12 inline-block mr-4"
          />
          <span>{{ username }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      username: "Ala",
      showMenu: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
