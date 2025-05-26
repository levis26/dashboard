<template>
  <VEChart class="gauge-chart" :option="options" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import VEChart from "vue-echarts";
import { GaugeChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { TooltipComponent, TitleComponent } from "echarts/components";
import { ref, watchEffect, computed } from "vue";

use([GaugeChart, CanvasRenderer, TooltipComponent, TitleComponent]);

const props = defineProps<{ 
  value: number, 
  title?: string,
  min?: number,
  max?: number,
  colors?: Array<[number, string]>,
  unit?: string
}>();

const options = computed(() => ({
  title: {
    text: props.title || 'KPI',
    left: 'center',
    top: '10%',
    textStyle: {
      color: '#8C8C8C',
      fontSize: 14
    }
  },
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      radius: '95%',
      min: props.min || 0,
      max: props.max || 100,
      axisLine: {
        lineStyle: {
          width: 20,
          color: props.colors || [
            [0.2, "#ff4d4d"],
            [0.69, "#ffa500"],
            [1, "#4caf50"],
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        },
        length: '60%'
      },
      axisTick: {
        distance: -20,
        length: 4,
        lineStyle: {
          color: '#fff',
          width: 1
        }
      },
      splitLine: {
        distance: -20,
        length: 20,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      axisLabel: {
        color: 'inherit',
        distance: 28,
        fontSize: 15,
        formatter: function (value: number) {
          return value % 20 === 0 ? value + (props.unit || '') : '';
        }
      },
      detail: {
        valueAnimation: true,
        formatter: `{value}${props.unit || ''}`,
        color: 'inherit',
        fontSize: 25,
        offsetCenter: [0, '20%']
      },
      data: [
        {
          value: props.value
        }
      ]
    }
  ]
}));
</script>

<style scoped>
.gauge-chart {
  min-height: 300px;
  width: 100%;
}
</style>