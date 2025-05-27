<template>
  <div ref="chartContainer" class="sunburst-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { computed } from 'vue';

const props = defineProps({
  categoriesData: {
    type: Array,
    required: true
  }
});

const chartContainer = ref<HTMLDivElement>();
let chart: echarts.ECharts | null = null;

const chartData = computed(() => {
  return {
    name: 'Categorías',
    children: props.categoriesData.map(category => ({
      name: category.name,
      value: category.value,
      itemStyle: {
        color: category.color
      },
      children: [
        {
          name: 'Productos',
          value: category.items,
          itemStyle: {
            color: lightenColor(category.color, 0.3)
          }
        },
        {
          name: 'Crecimiento',
          value: Math.abs(Number(category.growth.replace(/[^0-9.-]+/g, ''))),
          itemStyle: {
            color: category.growth.startsWith('+') 
              ? lightenColor(category.color, 0.6) 
              : darkenColor(category.color, 0.3)
          }
        }
      ]
    }))
  };
});

const initChart = () => {
  if (!chartContainer.value) return;
  
  chart = echarts.init(chartContainer.value);
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        if (params.data.name === 'Categorías') {
          return '';
        }
        return `${params.data.name}: ${params.data.value}%`;
      }
    },
    series: [
      {
        type: 'sunburst',
        radius: [0, '100%'],
        center: ['50%', '50%'],
        sort: null,
        emphasis: {
          focus: 'ancestor'
        },
        levels: [
          {},
          {
            r0: '15%',
            r: '35%',
            itemStyle: {
              borderWidth: 2
            }
          },
          {
            r0: '35%',
            r: '65%',
            itemStyle: {
              borderWidth: 2
            }
          },
          {
            r0: '65%',
            r: '100%',
            label: {
              rotate: 'radial'
            }
          }
        ],
        data: [chartData.value]
      }
    ]
  };

  chart.setOption(option);
};

const lightenColor = (color: string, amount: number) => {
  const hex = color.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `#${(
    0x1000000 +
    Math.round((r + amount * 255) * (1 - amount)) * 0x10000 +
    Math.round((g + amount * 255) * (1 - amount)) * 0x100 +
    Math.round((b + amount * 255) * (1 - amount))
  ).toString(16).substring(1)}`;
};

const darkenColor = (color: string, amount: number) => {
  const hex = color.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `#${(
    0x1000000 +
    Math.round((r - amount * 255) * (1 + amount)) * 0x10000 +
    Math.round((g - amount * 255) * (1 + amount)) * 0x100 +
    Math.round((b - amount * 255) * (1 + amount))
  ).toString(16).substring(1)}`;
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
.sunburst-chart {
  width: 100%;
  height: 300px;
}
</style>
