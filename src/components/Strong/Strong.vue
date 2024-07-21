<script setup lang="ts">
import _ from 'lodash'
import { computed, ref, watch, type Ref } from 'vue'
import { parseAndCleanData } from '@/common/utils/CsvUtils'
import Graph from '../graph/Graph.vue'
import type { Log } from './types/Log'
import type { ParseResult } from 'papaparse'

const props = defineProps<{
  file: File
}>()

const parsedCsv: Ref<ParseResult<Log> | undefined> = ref(undefined)
watch(
  () => props.file,
  async (newVal) => {
    parsedCsv.value = await parseAndCleanData(newVal)
  },
  { immediate: true }
)

const exerciseNames = computed(() =>
  _.chain(parsedCsv.value?.data)
    .map((row: Log) => row.exerciseName)
    .uniq()
    .sort()
    .value()
)
const selectedExerciseName = ref('Deadlift (Barbell)')
const exerciseData = computed(() =>
  _.filter(parsedCsv.value?.data, (log: Log) => log.exerciseName == selectedExerciseName.value)
)
</script>

<template>
  <div class="section">
    <h2>Exercise graph</h2>
    <label for="exerciseName">
      Select your exercise:
      <select id="exerciseName" v-model="selectedExerciseName">
        <option v-for="option in exerciseNames" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
    <Graph :data="exerciseData" :exercise-name="selectedExerciseName"></Graph>
  </div>
</template>

<style scoped>
.section {
  padding: 10px;
}
</style>
