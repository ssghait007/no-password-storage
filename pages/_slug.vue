<template>
  <div>
    <Header :isActive="this.showRegModal"></Header>
    <div v-if="this.pageAvailable === 'unavailable'">
      Site is taken. If you are the owner, Enter your password to continue
      <button class="btn btn-blue" @click.prevent="visibleModal('login')">
        Login
      </button>
      <div v-if="showLoginModal" class="moda">
        <!-- Modal -->
        <div
          v-if="showLoginModal"
          class="bg-white rounded-xl shadow-2xl p-6 w-6/12 mx-10"
        >
          <!-- Title -->
          <span class="font-bold block text-2xl mb-3">🍺 Login </span>
          <label class="block">
            <span class="text-gray-700">Password</span>
          </label>
          <input
            type="password"
            class="form-input px-4 py-3 rounded-full border border-gray-300"
            v-model="password"
          />

          <!-- Buttons -->
          <div class="text-right space-x-5 mt-5">
            <button @click="Login()" class="btn btn-blue">Submit</button>
            <button @click="hideModal('login')" class="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.pageAvailable === 'available'">
      Page is available,Enter password to create your site {THIS WILL BE IN
      MODAL}
      <button class="btn btn-blue" @click.prevent="visibleModal('reg')">
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
            <button @click="hideModal('reg')" class="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.pageAvailable === 'show'">
      <textarea v-model="textData" placeholder="add multiple lines"></textarea>
      <button @click="updateData()" class="btn btn-blue">Update</button>
    </div>
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
      showLoginModal: false,
      pass: "",
      conpass: "",
      passError: "",
      password: "",
      textData: "",
    };
  },
  async fetch() {
    const resp = await fetch(
      `https://no-password-store.netlify.app/.netlify/functions/fauna-crud/${this.slug}`
    )
      .then((res) => res.json())
      .catch((e) => console.log(``));
    if (resp?.data?.length) {
      this.pageAvailable = "unavailable";
      this.posts = resp.data[0];
      this.textData = this.posts.data.data[0].text;
    } else {
      this.pageAvailable = "available";
    }
  },
  methods: {
    visibleModal(id) {
      id === "reg" && (this.showRegModal = true);
      id === "login" && (this.showLoginModal = true);
    },
    hideModal(id) {
      id === "reg" && (this.showRegModal = false);
      id === "login" && (this.showLoginModal = false);
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
    async updateData() {
      const ip = await this.$axios.$put(
        `https://no-password-store.netlify.app/.netlify/functions/fauna-crud/${this.posts.ref["@ref"].id}`,
        { siteid: this.slug, data: [{ text: this.textData }] }
      );
    },
    Login() {
      console.log("decrypting data");
      this.pageAvailable = "show";
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
