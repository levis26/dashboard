<template>
  <div ref="chartContainer" class="storage-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  storagePercentage: {
    type: Number,
    required: true
  },
  themeColor: {
    type: String,
    required: true
  }
});

const chartContainer = ref<HTMLDivElement>();
let chart: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartContainer.value) return;
  
  chart = echarts.init(chartContainer.value);
  
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 100,
        splitNumber: 4,
        center: ['50%', '50%'],
        radius: '90%',
        
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [1, props.themeColor]
            ]
          }
        },
        
        axisTick: {
          show: false
        },
        
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#fff'
          }
        },
        
        axisLabel: {
          show: false
        },
        
        pointer: {
          show: false
        },
        
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          offsetCenter: [0, '0%'],
          fontSize: 24,
          color: props.themeColor
        },
        
        data: [{
          value: props.storagePercentage
        }]
      }
    ]
  };

  chart.setOption(option);
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', () => chart?.resize());
});

onUnmounted(() => {
  window.removeEventListener('resize', () => chart?.resize());
  chart?.dispose();
});
</script>

<style scoped>
.storage-chart {
  width: 100%;
  height: 120px;
}
</style>
