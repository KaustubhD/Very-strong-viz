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
    .map((exercise: string) => ({ label: exercise, value: exercise }))
    .value()
)
const selectedExerciseName = ref('Deadlift (Barbell)')
const exerciseData = computed(() =>
  _.filter(parsedCsv.value?.data, (log: Log) => log.exerciseName == selectedExerciseName.value)
)
</script>

<template>
    <h4 :class="[$tt('headline4'), $theme.getTextClassOnDark('primary')]">Exercise graph</h4>
    <ui-select id="exerciseName" v-model="selectedExerciseName" :options="exerciseNames">
      Select your exercise
    </ui-select>
    <Graph :data="exerciseData" :exercise-name="selectedExerciseName"></Graph>
</template>

<style scoped>
.section {
  padding: 10px;
}
h4 {
  margin: 10px 0;
}
</style>
