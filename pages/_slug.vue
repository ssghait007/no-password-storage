<template>
  <div>
    <h1>{{ this.slug }}</h1>
    <div v-if="!this.available">
      Site is taken. If you are the owner, Enter your password to continue {WHEN
      MODAL CLOSED DECRYPT DATA}
    </div>
    <div v-else>
      Page is available,Enter password to create your site {THIS WILL BE IN
      MODAL}
      <button class="btn btn-blue" @click.prevent="visibleModal()">
        Register
      </button>

      <!-- Modal Background -->
      <div v-if="showModal" class="moda">
        <!-- Modal -->
        <div
          v-if="showModal"
          class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10"
          @click="hideModal()"
        >
          <!-- Title -->
          <span class="font-bold block text-2xl mb-3"
            >🍺 Beer, beer, beer
          </span>

          <!-- Buttons -->
          <div class="text-right space-x-5 mt-5">
            <button @click="hideModal()" class="btn btn-blue">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  data() {
    return {
      posts: [],
      available: false,
      showModal: false,
    }
  },
  async fetch() {
    console.log('FETCH CALLED' + `https://jsonkeeper.com/b/${this.slug}`)
    this.posts = await fetch(`https://jsonkeeper.com/b/${this.slug}`)
      .then((res) => res.json())
      .catch((e) => console.log(``))
    console.log('posts', this.posts)
    if (!this.posts || this.posts?.error == 'not_found') {
      console.log('Page is available')
      this.available = true
    }
  },
  methods: {
    visibleModal() {
      console.log('LDK', this.showModal)
      this.showModal = !this.showModal
    },
    hideModal() {
      console.log('LDK', this.showModal)
      this.showModal = false
    },
  },
}
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
