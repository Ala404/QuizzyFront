<template>
  <div class="text-gray-500 w-full">
    <h2
      class="font-bold text-2xl"
      :class="{ 'text-right': $i18n.locale === 'ar' }"
    >
      Difficulty level
    </h2>
    <p class="mt-1 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">
      Choose a level to play with
    </p>

    <div class="w-full flex p-24 justify-around items-center text-lg ">
     <router-link :to="`/quiz/${this.quiz_id}/difficulty/Easy`">
          <button class="bg-lime-600 outline-none py-12 p-20 rounded-3xl text-white drop-shadow-lg"
          >Easy</button>
     </router-link>
     <router-link :to="`/quiz/${this.quiz_id}/difficulty/Medium`">
          <button class="bg-orange-400 outline-none py-12 px-20 rounded-3xl text-white drop-shadow-lg"
          >Medium</button>
     </router-link>
      <router-link :to="`/quiz/${this.quiz_id}/difficulty/Hard`">
          <button class="bg-red-400 outline-none py-12 px-20 rounded-3xl text-white drop-shadow-lg"
          >Hard</button>
      </router-link>
    </div>

    <div class="flex justify-center gap-12 mt-12"
    :class="{'flex-row-reverse' : $i18n.locale === 'ar'}"
    >
      <router-link :to="`/quiz/${this.quiz_id}/difficulty`">
        <button
          class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary hover:bg-white hover:text-primary transition duration-300 ease-in-out"
        >
          Back
        </button>
      </router-link>

      <router-link :to="`/quiz/${this.quiz_id}`" class="ml-auto"
      :class="{'mr-auto ml-0' : $i18n.locale === 'ar'}"
      >
        <button
          class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary  hover:bg-white hover:text-primary transition duration-300 ease-in-out"
        >
          Start Quiz
        </button>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
    name: "DifficultyView",
    data() {
        return {
            quiz_id: this.$route.params.id,
            difficulty: ['Easy', 'Medium', 'Hard'],
        };
    },
};
</script>

<style>
</style>