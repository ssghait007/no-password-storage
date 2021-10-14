<template>
  <div>
    No password storage app
    <br /><br />
    Choose your page
    <br /><br />
    <div class="mb-3 pt-0">
      <input
        type="text"
        placeholder="Placeholder"
        v-model="pageName"
        class="
          px-3
          py-3
          placeholder-blueGray-300
          text-blueGray-600
          relative
          bg-white bg-white
          rounded
          text-sm
          border-0
          shadow
          outline-none
          focus:outline-none focus:ring
          w-full
        "
      />
    </div>
    <nuxt-link :to="pageName">
      <button class="btn btn-blue">Go</button>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      pageName: '',
    }
  },
})
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
</style>
