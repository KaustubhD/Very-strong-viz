<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Strong from '@/components/Strong/Strong.vue'

function handleUpload(ev: Event) {
  const eventTarget = ev.target as HTMLInputElement
  if (eventTarget && eventTarget.files && eventTarget.files.length > 0) {
    file.value = eventTarget.files[0]
  }
}

const file: Ref<File | null> = ref(null)
</script>

<template>
  <header>
    <h1>Strong Visualiser</h1>
  </header>
  <div class="center">
    <label for="fileInput">Upload the exported csv file from the Strong app</label>
    <br />
    <input id="fileInput" type="file" v-on:change="handleUpload" />
  </div>
  <Strong :file="file" v-if="file"></Strong>
</template>

<style scoped>
h1 {
  text-align: center;
}

.center {
  text-align: center;
}
</style>
