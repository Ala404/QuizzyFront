<template>
  <div class="text-gray-500 w-full">
    <h2 class="font-bold text-2xl"
    :class="{'text-right' : $i18n.locale === 'ar'}"
    >{{ categ_name.charAt(0).toUpperCase() + categ_name.slice(1) }} Quiz</h2>
    <p class="mt-1 mb-4"
    :class="{'text-right' : $i18n.locale === 'ar'}"
    >{{ $t('quizDetails.readInstructions') }}</p>

    <section class="quiz-general flex w-full gap-12 justify-center"
    :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
    >
      <img
        :src="this.category.categ_image"
        alt="quiz-img"
        class="w-1/2 rounded-lg object-cover"
      />

      <div class="quiz-data w-1/2 flex flex-col gap-12">
        <div class="date flex w-full gap-32"
        :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
        >
          <h3 class="text-xl font-bold">{{ $t('quizDetails.date') }}</h3>
          <p class="text-lg">{{ date }}</p>
        </div>

        <div class="date flex w-full gap-32"
        :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
        >
          <h3 class="text-xl font-bold">{{ $t('quizDetails.timeLimit') }}</h3>
          <p class="text-lg">{{ time }} Mins</p>
        </div>

        <div class="date flex w-full gap-32"
        :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
        >
          <h3 class="text-xl font-bold">{{ $t('quizDetails.attempts') }}</h3>
          <p class="text-lg">once</p>
        </div>

        <div class="date flex w-full gap-32"
        :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
        >
          <h3 class="text-xl font-bold">{{ $t('quizDetails.points') }}</h3>
          <p class="text-lg">{{ points }}</p>
        </div>
      </div>
    </section>

    <section class="instructions mt-12">
      <div class="date w-full"
     
      >
        <h3 class="text-xl font-bold mb-4"
        :class="{'text-right' : $i18n.locale === 'ar'}"
        >{{ $t('quizDetails.instructions') }}</h3>
        <p class="text-lg leading-8"
        :class="{'text-right' : $i18n.locale === 'ar'}"
        >
          {{ $t('quizDetails.quizConsists') }}
          <br>
          {{ $t('quizDetails.timing') }}
          <br>
          {{ $t('quizDetails.answers') }}
          <br>
          {{ $t('quizDetails.cheating') }}
        </p>
      </div>
    </section>
    <!--Start Quiz button-->
    <div class="flex justify-center gap-12 mt-12"
    :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
    >
      <router-link to="/categories">
        <button
          class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary hover:bg-white hover:text-primary transition duration-300 ease-in-out"
        >
          {{ $t('quizDetails.backButton') }}
        </button>
      </router-link>

      <router-link :to="`/quiz/${this.quiz_id}/difficulty`" class="ml-auto"
      :class="{'mr-auto ml-0' : $i18n.locale === 'ar'}"
      >
        <button
          class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary  hover:bg-white hover:text-primary transition duration-300 ease-in-out"
        >
          {{ $t('quizDetails.startQuizButton') }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizDetailsView",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      date: "3/26/2023",
      time: "25",
      points: 100,
      instructions: "",
      quiz_id: 0,
      category: {},
      categ_name: "",
    };
  },
  async mounted() {
    //get quiz details from api

    await axios
      .get(`/categories/${this.id}`)
      .then((response) => {
        this.category = response.data;
        this.categ_name = this.category.categ_name;
        console.log(this.category.categ_id);
        this.getQuizId();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getQuizId() {
      axios
        .get(`/categories/${this.category.categ_id}/quiz`)
        .then((response) => {
          this.quiz_id = response.data.quiz_id;
          console.log(this.quiz_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>