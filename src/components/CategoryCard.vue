<template>
  <router-link :to="`/categories/${this.id}`">
    <div>
      <div class="relative w-52 rounded-2xl drop-shadow-lg cursor-pointer">
        <img
          :src="img"
          alt=""
          class="w-52 object-cover rounded-2xl drop-shadow-lg"
        />
        <div
          class="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl"
        ></div>
        <h2 class="text-white text-lg absolute top-28 left-4 font-semibold">
          <!-- capitalize the first letter of the category name -->
          {{ title.charAt(0).toUpperCase() + title.slice(1) }}
        </h2>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CategoryCard",
  components: {},
    props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>