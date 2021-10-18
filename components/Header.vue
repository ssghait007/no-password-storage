<template>
  <header class="bg-gray-100">
    <nav class="flex items-center justify-between p-6 h-20 bg-white shadow-sm">
      <nuxt-link to="/">
        <div
          class="
            py-5
            px-3
            rounded-full
            bg-gradient-to-r
            from-indigo-700
            to-blue-500
            text-sm text-white
            font-semibold
            shadow-lg
            hover:cursor-pointer hover:shadow-lg
          "
        >
          NPAS
        </div>
      </nuxt-link>
      <ul>
        <li class="space-x-5 text-xl">
          <button class="btn btn-blue">Reload</button>
          <button class="btn btn-blue">Save</button>
          <button class="btn btn-blue">Change password</button>
          <button class="btn btn-blue">Delete</button>
        </li>
        <div class="sm:hidden space-y-1 hover:cursor-pointer">
          <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
          <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
          <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
        </div>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style>
.btn {
  @apply font-bold py-2 px-4 rounded;
  disabled: opacity-50;
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
