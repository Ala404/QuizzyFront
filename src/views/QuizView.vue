


<script>
import axios from "axios";

export default {
  name: "QuizView",
  data() {
    return {
      id: this.$route.params.id,
      difficulty: this.$route.params.diff,
      currentQuestionIndex: 0,
      myanswers: [],
      remainingTime: 2 * 60,
      btnText: "Next",
      showModal: false,
      submited: false,
      questions: [],
      answers: [],
      idQuestion: 0,
      score: 0,
      showCongratsModal: false,
      persantage: 0,
      id_categ: 0,
      categ_name: "",
      correctAnswersCount: 0,
    };
  },

  methods: {
    increment() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;

        // this.fetchAnswers(); // fetch answers for the next question
        console.log(this.currentQuestionIndex);
      } else if (this.btnText == "Submit") {
        this.showModal = true;
      }
    },
    decrement() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        if (this.btnText == "Submit") {
          this.btnText = "Next";
        }
        console.log(this.currentQuestionIndex);
      }
    },

    startCountdown() {
      // if (
      //     this.currentQuestionIndex == this.questions.length - 1  &&
      //     this.btnText == "Next"
      //   ) {
      //     this.btnText = "Submit";
      //     console.log(this.myanswers);
      //   }

      const countdownInterval = setInterval(() => {
        if (this.remainingTime > 0 && !this.submited) {
          this.remainingTime--;
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    },
    calculateScore() {
      for (let i = 0; i < this.myanswers.length; i++) {
        const selectedAnswer = this.myanswers[i];

        for (let j = 0; j < this.answers.length; j++) {
          if (this.answers[j].text === selectedAnswer) {
            this.score += this.answers[j].points;
            if (this.answers[j].is_correct) this.correctAnswersCount++;

            console.log("score is :", this.score);
          }
        }
      }
    },

    async submitQuiz() {
      this.calculateScore();
      var minutes = Math.floor(this.remainingTime / 60);
      var seconds = this.remainingTime % 60;
      var formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;

      //  await axios
      //     .post(`quizresults/`, {
      //       quiz: this.id,
      //       user: 1,
      //       score: this.score,
      //       //Use one of these formats instead: hh:mm[:ss[.uuuuuu]].
      //       fastest_time: formattedTime,
      //       correct_answers: this.correctAnswersCount,
      //     })
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });

      this.submited = true;
      if (this.showModal == true) {
        this.showModal = false;
        this.showCongratsModal = true;
      }
      this.compareAnswersAfterSubmit();
    },
    compareAnswersAfterSubmit() {
      const correctAnswers = this.answers.filter((answer) => answer.is_correct);

      console.log("current answer:", correctAnswers);
      for (let i = 0; i < this.myanswers.length; i++) {
        if (this.myanswers.includes(correctAnswers[i].text)) {
          this.persantage += 1;
        }
      }
    },

    // async fetchAnswers(questionID) {
    //   if (questionID) {

    //   }
    // },
  },
  async mounted() {
    this.startCountdown();

    await axios
      .get(`/quizzes/${this.id}/questions/${this.difficulty}`)
      .then((response) => {
        this.questions = response.data;
        if (this.questions.length == 1) {
          this.btnText = "Submit";
        }
        this.idQuestion = this.questions[this.currentQuestionIndex].id_question;

        console.log(this.questions);
        console.log(this.questions[this.currentQuestionIndex].question_image);

        // Initialize answers array for the first question
        this.fetchAnswers(this.idQuestion); // Fetch answers for the first question
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`/quiz/${this.id}/answers/`)
      .then((response) => {
        this.answers = response.data;
        console.log(this.answers);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`/quizzes/${this.id}/`)
      .then((response) => {
        this.id_categ = response.data.category;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`/categories/${this.id_categ}/`)
      .then((response) => {
        this.categ_name = response.data.categ_name;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // computed: {
  //   idQuestion() {
  //     return this.questions[this.currentQuestionIndex].id_question;
  //   },
  // },
  // watch: {
  //   currentQuestionIndex(newIndex) {
  //     this.fetchAnswers(this.questions[newIndex].id_question);
  //   },
  // },
};
</script>




<template>
  <!-- no quiz message if no quiz -->
  <div
    v-if="questions.length == 0"
    class="flex flex-col justify-around items-center h-96"
  >
    <p class="text-2xl font-semibold text-gray-400 mt-24">
      Oops! No quiz available
    </p>
    <!-- back to home button -->
    <router-link to="/categories">
      <button
        class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary hover:bg-white hover:text-primary transition duration-300 ease-in-out"
      >
        Back
      </button>
    </router-link>
  </div>

  <div class="text-gray-500 w-full" v-show="questions.length">
    <div class="flex w-full justify-between">
      <h2 class="font-bold text-2xl">
        {{ categ_name.charAt(0).toUpperCase() + categ_name.slice(1) }} Quiz
      </h2>
      <!--count up timer till 30 minutes-->
      <div class="timer">
        <p class="text-3xl font-medium">
          Time
          <span
            :class="{
              'text-red-500': remainingTime < 60,
              'text-green-500': remainingTime > 60,
            }"
            >{{ Math.floor(remainingTime / 60) }}:{{ remainingTime % 60 }}</span
          >
          Mins
        </p>
      </div>
    </div>

    <p class="mt-1 mb-4">Answer the question below</p>

    <section class="quiz-general flex w-full gap-12 justify-center">
      <img
        v-if="
          questions[currentQuestionIndex] &&
          questions[currentQuestionIndex].question_image
        "
        :src="this.questions[this.currentQuestionIndex].question_image"
        alt="quiz-img"
        class="w-1/2 rounded-lg object-cover"
      />

      <div class="quiz-data w-1/2 flex flex-col gap-12">
        <div class="date flex flex-col w-full gap-32">
          <h3 class="text-xl font-bold">
            Question {{ currentQuestionIndex + 1 }}/{{ this.questions.length }}
          </h3>
          <p
            class="text-lg"
            v-if="questions && questions[currentQuestionIndex]"
          >
            {{ this.questions[this.currentQuestionIndex].text }}
          </p>
        </div>
      </div>
    </section>

    <section class="instructions mt-12">
      <div class="date w-full">
        <h3 class="text-xl font-bold mb-4">Choose answer:</h3>
        <!-- 4 choices using v-for -->
        <div
          v-for="answer in answers"
          :key="answer.text"
          class="flex flex-col mb-4"
        >
          <div
            class="flex items-center gap-8"
            v-if="
              answer.question == questions[currentQuestionIndex].id_question
            "
          >
            <label>
              <input
                type="radio"
                name="answer"
                :value="answer.text"
                v-model="myanswers[currentQuestionIndex]"
              />
              {{ answer.text }}
            </label>
            <!-- display correct answer or wrong answer -->
            <div class="answer-feedback">
              <p
                v-if="
                  (submited &&
                    myanswers[currentQuestionIndex] === answer.text &&
                    !answer.is_correct) ||
                  (submited && answer.is_correct)
                "
                :class="{
                  'text-red-500': !answer.is_correct,
                  'text-green-500': answer.is_correct,
                }"
              >
                {{ answer.is_correct ? "Correct Answer" : "Wrong Answer" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--Start Quiz button-->
    <div class="start-quiz flex justify-between mt-12 w-full">
      <!--back button-->

      <button
        v-if="currentQuestionIndex > 0"
        class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary hover:bg-white hover:text-primary transition duration-300 ease-in-out"
        @click="decrement()"
      >
        Back
      </button>

      <button
        class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary ml-auto hover:bg-white hover:text-primary transition duration-300 ease-in-out"
        @click="increment()"
        v-show="!submited || btnText === 'Next'"
      >
        {{ btnText }}
      </button>
    </div>

    <!-- submit dialog popup -->

    <transition name="scale-up">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div
          class="pass-popup bg-white w-1/3 p-4 rounded-2xl shadow py-24 px-8"
        >
          <div
            class="bg-slate-700 drop-shadow-lg p-8 mx-auto w-20 h-20 rounded-full mb-12"
          >
            <i class="fa-solid fa-question text-2xl text-white"></i>
          </div>
          <p class="text-lg text-center mb-4">
            Are you sure you want to submit?
          </p>

          <div class="flex justify-end mt-20 px-8">
            <button
              class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary hover:bg-white hover:text-primary transition duration-300 ease-in-out"
              @click="showModal = false"
            >
              No
            </button>

            <button
              class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary ml-auto hover:bg-white hover:text-primary transition duration-300 ease-in-out"
              @click="submitQuiz"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="scale-up">
      <div
        v-if="showCongratsModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div
          class="pass-popup bg-white w-1/3 p-4 rounded-2xl shadow py-24 px-8"
        >
          <div
            class="bg-slate-700 drop-shadow-lg p-8 mx-auto w-20 h-20 rounded-full mb-12"
          >
            <i class="fa-solid fa-question text-2xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-center mb-4 text-black">
            Congratulations! You have completed the quiz.
          </h3>
          <p class="text-lg text-center mb-4">
            You scored {{ (this.persantage / this.questions.length) * 100 }} %
          </p>

          <div class="flex justify-center mt-20 px-8">
            <button
              class="bg-primary text-white font-bold py-3 px-6 rounded-3xl border-2 border-primary hover:bg-white hover:text-primary transition duration-300 ease-in-out"
              @click="showCongratsModal = false"
            >
              Review Quiz
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<style>
/*animation for modal*/

.scale-up-enter-active {
  animation: scale-up-enter 0.3s ease-out;
}

.scale-up-leave-active {
  animation: scale-up-leave 0.3s ease-out;
}

@keyframes scale-up-enter {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scale-up-leave {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>