<script setup lang="ts">
import { ref, type Ref, onMounted, watch } from 'vue'
import Strong from '@/components/Strong/Strong.vue'
import { useElementSize } from '@vueuse/core';

onMounted(function() {
  // TODO: Need a type for header.value
});
const header = ref(null);
const body = ref(null);

let height: { value: any; };
// console.log(header.value.$refs.topAppBar);
watch(header, () => {
  height = useElementSize(header.value.$refs.topAppBar).height;
  console.log(height.value);
  console.log(body.value);
  body.value.style.paddingTop = (height.value + 10) + 'px';
});


// TODO: add type
function handleUpload(files) {
    file.value = files[0].sourceFile;
}

const file: Ref<File | null> = ref(null)
</script>

<template>
  <ui-top-app-bar ref="header" title="Strong Visualiser" type="0">
    <h1>Strong Visualiser</h1>
  </ui-top-app-bar>
  <div ref="body" class="app-body">
    <div class="container">
        <label for="fileInput" :class="$theme.getTextClassOnDark('primary')">Upload the exported csv file from the Strong app</label>
        <ui-file inputId="fileInput" accept="text/csv" @change="handleUpload"></ui-file>
    </div>
    <div class="section">
      <Strong :file="file" v-if="file"></Strong>
    </div>
  </div>
</template>

<style scoped>
label {
  margin-right: 10px;
}

.app-body {
  padding: 0 24px;
}

.section {
  margin: 20px 0;
}
</style>