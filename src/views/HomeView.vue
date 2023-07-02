<template>
  <div class="main-view flex w-full bg-gray-100 p-8" :class="{'flex-row-reverse' : this.$i18n.locale == 'ar'}">
    <SideBar class="w-1/6" />
    <section class="flex-col w-full" >
      <NavBar></NavBar>
      <MainView/>
    </section>


  </div>
</template>
  
  <script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import MainView from "./MainView.vue";
export default {
  components: { SideBar, NavBar, MainView },
  
};
</script>
  
  <style>
</style>