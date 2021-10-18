<template>
  <div>
    <Header :isActive="this.showRegModal"></Header>
    <div v-if="this.pageAvailable === 'unavailable'">
      Site is taken. If you are the owner, Enter your password to continue {WHEN
      MODAL CLOSED DECRYPT DATA}
    </div>
    <div v-if="this.pageAvailable === 'available'">
      Page is available,Enter password to create your site {THIS WILL BE IN
      MODAL}
      <button class="btn btn-blue" @click.prevent="visibleModal()">
        Register
      </button>

      <!-- Modal Background -->
      <div v-if="showRegModal" class="moda">
        <!-- Modal -->
        <div
          v-if="showRegModal"
          class="bg-white rounded-xl shadow-2xl p-6 w-6/12 mx-10"
        >
          <!-- Title -->
          <span class="font-bold block text-2xl mb-3"
            >🍺 Choose a password
          </span>
          <label class="block">
            <span class="text-gray-700">Password</span>
          </label>
          <input
            type="password"
            class="form-input px-4 py-3 rounded-full border border-gray-300"
            v-model="pass"
          />
          <label class="block">
            <span class="text-gray-700">Confirm Password</span>
          </label>
          <input
            type="password"
            class="form-input px-4 py-3 rounded-full border border-gray-300"
            v-model="conpass"
          />
          <label v-if="this.passError !== ''" class="inline-flex items-center">
            <span class="ml-2">{{ this.passError }}</span>
          </label>

          <!-- Buttons -->
          <div class="text-right space-x-5 mt-5">
            <button @click="checkPass()" class="btn btn-blue">Submit</button>
            <button @click="hideModal()" class="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.pageAvailable === 'show'">DATA</div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = params.slug;
    return { slug };
  },
  data() {
    return {
      posts: null,
      pageAvailable: "unknown",
      showRegModal: false,
      pass: "",
      conpass: "",
      passError: "",
    };
  },
  async fetch() {
    this.posts = await fetch(
      `https://no-password-store.netlify.app/.netlify/functions/fauna-crud/${this.slug}`
    )
      .then((res) => res.json())
      .catch((e) => console.log(``));
    if (this.posts?.data?.length) {
      this.pageAvailable = "unavailable";
    } else {
      this.pageAvailable = "available";
    }
  },
  methods: {
    visibleModal() {
      this.showRegModal = true;
    },
    hideModal() {
      this.showRegModal = false;
    },
    checkPass() {
      if (this.pass === this.conpass) {
        this.passError = "";
        this.showRegModal = false;
        this.pageAvailable = "show";
        this.createSite();
      } else {
        this.passError = "Password dont match";
      }
    },
    async createSite() {
      const ip = await this.$axios.$post(
        `https://no-password-store.netlify.app/.netlify/functions/fauna-crud/create`,
        { siteid: this.slug, data: [{ text: "" }] }
      );
      console.log(ip);
    },
  },
};
// https://jsonkeeper.com/b/MAM3
</script>

<style>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
.moda {
  @apply bg-blue-700;
  @apply fixed;
  @apply text-gray-500;
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply overflow-auto;
  @apply z-50;
  @apply bg-black bg-opacity-40;
  @apply left-0;
  @apply right-0;
  @apply top-0;
  @apply bottom-0;
}
</style>
