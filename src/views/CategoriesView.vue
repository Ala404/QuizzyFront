<template>
 <div class="text-gray-500 w-full">
    <h2 class="font-bold text-2xl"
    :class="{ 'text-right': $i18n.locale === 'ar' }"
    >{{ $t('categories.selectTopic') }}</h2>
    <p class="mt-1 mb-4"
    :class="{ 'text-right': $i18n.locale === 'ar' }"
    >{{ $t('categories.featuredCategories') }}</p>

    <div class="categories-cards grid grid-cols-5 overflow-hidden gap-8 w-full"

    >
      <!-- display only 15 categories -->
      <CategoryCard
        v-for="category in categories"
        :key="category.categ_name"
        :title="category.categ_name"
        :id="category.categ_id"
        :img="category.categ_image"
      >
      </CategoryCard>
    </div>
    <!--More Categories button-->

    <!-- back to home button -->
  </div>
</template>

<script>
import CategoryCard from "../components/CategoryCard.vue";
import axios from "axios";

export default {
  name: "CategoriesView",
  components: { CategoryCard },
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    //get categories from api

    await axios
      .get("/categories/")
      .then((response) => {
        this.categories = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>


<style>
</style>