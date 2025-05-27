<template>
  <div class="api-traffic-chart">
    <div class="chart-header">
      <h3>Tráfico de API</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="pulseOutline" />
        <span>Últimas 24h</span>
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
import { pulseOutline } from 'ionicons/icons';

interface TrafficData {
  timestamp: string;
  requests: number;
  errors: number;
}

const props = defineProps<{
  trafficData: TrafficData[];
}>();

const chartSeries = computed(() => [
  {
    name: 'Peticiones',
    type: 'line',
    data: props.trafficData.map(item => item.requests)
  },
  {
    name: 'Errores',
    type: 'column',
    data: props.trafficData.map(item => item.errors)
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
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 4
    }
  },
  colors: ['#2196F3', '#dc3545'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: props.trafficData.map(item => item.timestamp),
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
        text: 'Peticiones',
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
        text: 'Errores',
        style: {
          color: '#dc3545'
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
.api-traffic-chart {
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