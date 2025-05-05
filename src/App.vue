<script setup lang="ts">
import axios from 'axios';
import { ref, type Ref, watch } from 'vue';
import { useElementSize } from '@vueuse/core';
import Strong from '@/components/Strong/Strong.vue';
import { sampleFileUrl } from '@/common/constants/GlobalConstants';

const header: Ref<any | null> = ref(null);
const body: Ref<HTMLBodyElement | null> = ref(null);
const file: Ref<File | null> = ref(null);

watch(header, (val: any | null) => {
  const height = useElementSize(val!.$refs.topAppBar).height;
  body.value!.style.paddingTop = height.value + 10 + 'px';
});

// TODO: add type
function handleUpload(files: { sourceFile: File }[]) {
  file.value = files[0].sourceFile;
}

function handleSampleUpload() {
  axios(sampleFileUrl, { responseType: 'blob' }).then((res) => {
    const sampleFile = new File([res.data], 'strong4932826597537696438.csv', {
      type: 'text/plain '
    });
    file.value = sampleFile;
  });
}
</script>

<template>
  <ui-top-app-bar ref="header" title="Strong Visualiser" type="0">
    <h1>Strong Visualiser</h1>
  </ui-top-app-bar>
  <div ref="body" class="app-body">
    <div class="container">
      <label for="fileInput" :class="$theme.getTextClassOnDark('primary')"
        >Upload the exported csv file from the Strong app</label
      >
      <ui-file inputId="fileInput" accept="text/csv" @change="handleUpload"></ui-file>
      <label for="sampleInput" :class="$theme.getTextClassOnDark('primary')"
        >Or click on this button to upload a sample file</label
      >
      <ui-button type="text" raised=true @click="handleSampleUpload"
        >Upload sample file</ui-button
      >
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
