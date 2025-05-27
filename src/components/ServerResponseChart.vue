<template>
  <div class="server-response-chart">
    <div class="chart-header">
      <h3>Tiempo de Respuesta</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="speedometerOutline" />
        <span>Servidor</span>
      </ion-badge>
    </div>
    
    <ApexMixedChart 
      :series="chartSeries"
      type="line"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { speedometerOutline } from 'ionicons/icons';

interface ResponseData {
  time: string;
  responseTime: number;
  requests: number;
}

const props = defineProps<{
  responseData: ResponseData[];
}>();

const chartSeries = computed(() => [
  {
    name: 'Tiempo de respuesta',
    type: 'line',
    data: props.responseData.map(item => item.responseTime)
  },
  {
    name: 'Peticiones',
    type: 'area',
    data: props.responseData.map(item => item.requests)
  }
]);

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  stroke: {
    width: [2, 0],
    curve: 'smooth'
  },
  fill: {
    type: ['solid', 'gradient'],
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#2196F3'],
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0.2
    }
  },
  colors: ['#2196F3', '#4CAF50'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: props.responseData.map(item => item.time),
    labels: {
      style: {
        colors: '#6c757d',
        fontSize: '12px'
      }
    }
  },
  yaxis: [
    {
      title: {
        text: 'ms',
        style: {
          color: '#2196F3'
        }
      },
      labels: {
        style: {
          colors: '#6c757d',
          fontSize: '12px'
        }
      }
    },
    {
      opposite: true,
      title: {
        text: 'Peticiones',
        style: {
          color: '#4CAF50'
        }
      },
      labels: {
        style: {
          colors: '#6c757d',
          fontSize: '12px'
        }
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val: number) {
        return val.toLocaleString();
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '12px',
    labels: {
      colors: '#6c757d'
    }
  }
}));
</script>

<style scoped>
.server-response-chart {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.info-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
}
</style> 