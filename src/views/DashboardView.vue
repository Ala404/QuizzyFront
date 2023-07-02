<template>
  <div class="home text-gray-500">
    <!--my progress-->
    <section
      class="flex w-full mx-4 gap-12 mb-24 max-lg:flex-col max-lg:items-center"
      :class="{'flex-row-reverse' : this.$i18n.locale == 'ar'}"
    >
      <img
        src="../../public/img/profile-avatar.jpg"
        alt="avatar"
        class="object-fit w-64 h-56 rounded-2xl drop-shadow-md"
      />

      <div class="child-2 flex flex-col flex-1 gap-6 max-lg:items-center"
      
      >
        <div :class="{ 'text-right': $i18n.locale === 'ar' }">
          <h2 class="font-bold text-2xl">{{ username }}</h2>
          <p class="max-lg:text-center">
            {{ $t("dashboard.points") }}: {{ points }}
          </p>
        </div>

        <div
          class="empty-line relative h-4 w-4/5 my-4 bg-gray-200 rounded-full"
          :class="{ 'left-0 ml-auto rotate-180': $i18n.locale === 'ar' }"
        >
          <span
            class="fill-line absolute -top-4 left-0 h-4 w-1/2 my-4 bg-gray-400 rounded-full"
            
          ></span>
        </div>

        <div class="w-4/5 flex justify-between gap-8"
        :class="{ 'flex-row-reverse ml-auto': $i18n.locale === 'ar' }"
        >
          <div class="flex gap-2"
          :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
          >
            <span
              class="p-4 drop-shadow-lg bg-white rounded-lg max-lg:pt-6 max-lg:px-4"
              ><i class="fa-sharp fa-solid fa-flag text-2xl"></i
            ></span>
            <div class="flex-col"
            :class="{ 'flex-row-reverse text-right': $i18n.locale === 'ar' }"
            >
              <h2 class="font-bold text-2xl">
                {{ quizPassed}}</h2>
              <p>
                {{ $t("dashboard.quizPassedDesc") }}
              </p>
            </div>
          </div>

          <div class="flex gap-2"
          :class="{ 'flex-row-reverse text-right': $i18n.locale === 'ar' }"
          >
            <span
              class="p-4 drop-shadow-lg bg-white rounded-lg max-lg:pt-6 max-lg:px-4"
              ><i class="fa-solid fa-clock text-2xl"></i
            ></span>
            <div class="flex-col">
              <h2 class="font-bold text-2xl">{{ fastestTime }}min</h2>
              <p>{{ $t("dashboard.fastestTimeDesc") }}</p>
            </div>
          </div>

          <div class="flex gap-2"
          :class="{ 'flex-row-reverse text-right': $i18n.locale === 'ar' }"
          >
            <span
              class="p-4 drop-shadow-lg bg-white rounded-lg max-lg:pt-6 max-lg:px-4"
              ><i class="fa-sharp fa-solid fa-circle-check text-2xl"></i
            ></span>
            <div class="flex-col">
              <h2 class="font-bold text-2xl">{{ correctAnswers }}</h2>
              <p>{{ $t("dashboard.correctAnswersDesc") }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--my achievements medals featured categories-->
    <section class="flex w-full max-lg:flex-col max-lg:gap-12"
    :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
    >
      <div
        class="achievements text-secondary flex w-1/2 mr-12 flex-wrap max-lg:w-full"
      >
        <div class="flex justify-between w-full"
        :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
        >
          <h2 class="font-bold text-2xl">{{ $t("dashboard.achievements") }}</h2>
          <div
            class="empty-line relative h-4 w-1/2 mt-2 bg-gray-200 rounded-full"
            :class="{ ' mr-auto rotate-180': $i18n.locale === 'ar' }"
          >
            <span
              class="fill-line absolute top-0 left-0 h-4 w-1/2 bg-gray-400 rounded-full"
            ></span>
          </div>
        </div>

        <div class="medals w-full bg-white drop-shadow-lg rounded-2xl p-32">
          {{ $t("dashboard.noAchievements") }}
          <hr class="mb-4" />
          <p class="text-center w-full text-primary cursor-pointer">
            {{ $t("dashboard.viewAll") }}
          </p>
        </div>
      </div>

      <div
        class="featured-categories text-secondary flex w-1/2 items-center flex-wrap max-lg:w-full max-lg:pt-8"
        :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
      >

      
  
 
        <div
          class="flex justify-between w-full px-6 items-center max-lg:mb-4 max-lg:px-0"
          :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
        >
        
          <h2 class="font-bold text-2xl">
            {{ $t("dashboard.featuredCategories") }}
          </h2>
          <router-link to="/categories">
            <p class="text-center text-primary cursor-pointer">
              {{ $t("dashboard.viewAll") }}
            </p>
          </router-link>
          
        </div>

        <div
          class="categories w-full flex flex-wrap drop-shadow-lg rounded-2xl p-12 gap-12 relative max-lg:gap-4 max-lg:p-0 max-lg:justify-between"
        >
        <!--diplay no categories if there are no categories-->
      <div v-if="categories.length === 0" class="w-full drop-shadow-none p-24">
        <h1 class="font-medium text-lg text-center ">{{ $t('dashboard.nofeaturedCategories') }}</h1>
               
        </div>
          <CategoryCard
            v-for="category in categories"
            :key="category.categ_name"
            :title="category.categ_name"
            :id="category.categ_id"
            :img="category.categ_image"
          ></CategoryCard>
        </div>
      </div>
      
    </section>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import CategoryCard from "../components/CategoryCard.vue";

export default {
  name: "HomeView",
  components: {
    CategoryCard,
  },
  data() {
    return {
      username: 'Ala Eddine Kazzouz',
      quizresults: {},
      correctAnswers: 0,
      quizPassed: 0,
      points: 0,
      fastestTime:"30:00",
      categories: [],
    };
  },
  methods: {
  
  },
  async mounted() {
    await axios
      .get("/categories")
      .then((response) => {
        for (let i = 0; i < 4; i++) {
          this.categories.push(response.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

      await axios
      .get("/quizresults/")
      .then((response) => {
        this.quizresults = response.data;
        this.quizresults.forEach((element) => {
          if (element.user === 1) {
            this.quizPassed++;
            this.correctAnswers += element.correct_answers;
            this.points += element.score;
            if (element.fastest_time < this.fastestTime) {
              this.fastestTime = element.fastest_time;
            }
          }
         

        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
