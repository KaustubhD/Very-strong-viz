<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData
} from 'chart.js'
import _ from 'lodash'
import { Line } from 'vue-chartjs'
import { options } from './ChartOptions'
import type { Log } from '../Strong/types/Log'
import { graphModes } from './GraphModes'
import { computed, ref, type Ref, type ComputedRef } from 'vue'

const props = defineProps<{
  data: Log[]
  exerciseName: string
}>()

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const graphMode: Ref<string> = ref('volume');
const propName: ComputedRef<string> = computed(() => {
  switch (graphMode.value) {
    case 'volume':
    default: {
      return 'volume'
    }
    case 'maxVolumeInOneSet': {
      return 'maxSetVolume'
    }
  }
})
const aggregated = computed(() =>
  _.chain(props.data)
    .groupBy('date')
    .map(
      (x) =>
        _.reduce(
          x,
          (acc: Log | undefined, xx: Log) => {
            const setVolume = (xx.weight || 0) * (xx.reps || 0)
            if (!acc) {
              return { ...xx, volume: setVolume, maxSetVolume: setVolume }
            } else {
              const setVolume = (xx.weight || 0) * (xx.reps || 0)
              acc.volume += setVolume
              acc.maxSetVolume = Math.max(acc.maxSetVolume, setVolume)
              return acc
            }
          },
          undefined
        ) as Log
    )
    .value()
)

const graphData: ComputedRef<ChartData<'line'>> = computed(() => ({
  labels: _.map(aggregated.value, (log: Log) => new Date(log.date).toDateString().slice(4)),
  datasets: [
    {
      label: propName.value,
      backgroundColor: '#f8f8f8',
      borderColor: '#f8f8f8',
      pointRadius: 2,
      borderWidth: 1,
      tension: 0.1,
      fill: false,
      data: _.map(aggregated.value, propName.value)
    }
  ]
}))
</script>

<template>
  <ui-select id="graphMode" v-model="graphMode" :options="graphModes">
    Select graph type
  </ui-select>
  <div class="graph-container">
    <Line :data="graphData" :options="options" />
  </div>
</template>

<style scoped>
.graph-container {
  height: 500px;
  width: 100%;
}
</style>
