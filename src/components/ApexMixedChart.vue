<template>
  <div class="chart-container">
    <vapexChart
      :options="chartOptions"
      :series="series"
      height="100%"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import vapexChart from 'vue3-apexcharts';

const props = defineProps({
  series: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    default: 'line'
  },
  labels: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => []
  },
  strokeWidth: {
    type: Array,
    default: () => [0, 2, 5]
  },
  yTitle: {
    type: String,
    default: ''
  },
  xTitle: {
    type: String,
    default: ''
  }
});

const chartOptions = computed(() => ({
  chart: {
    type: props.type,
    height: 350,
    toolbar: {
      show: true
    }
  },
  stroke: {
    width: props.strokeWidth,
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      horizontal: props.type === 'bar' && props.chartOptions?.horizontal,
      columnWidth: '50%',
      borderRadius: 4
    }
  },
  colors: props.colors.length ? props.colors : undefined,
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: 'vertical',
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: props.labels,
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    title: {
      text: props.xTitle
    }
  },
  yaxis: {
    title: {
      text: props.yTitle
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y: number) {
        if (typeof y !== 'undefined') {
          return y.toFixed(0) + (props.yTitle ? ' ' + props.yTitle : '');
        }
        return y;
      }
    }
  },
  ...props.chartOptions
}));
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  background: var(--ion-color-light);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>