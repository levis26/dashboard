<template>
  <div class="concurrent-users-chart">
    <div class="chart-header">
      <h3>Usuarios Concurrentes</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="peopleOutline" />
        <span>Activos</span>
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
import { peopleOutline } from 'ionicons/icons';

interface UserData {
  time: string;
  users: number;
  sessions: number;
}

const props = defineProps<{
  userData: UserData[];
}>();

const chartSeries = computed(() => [
  {
    name: 'Usuarios',
    type: 'line',
    data: props.userData.map(item => item.users)
  },
  {
    name: 'Sesiones',
    type: 'area',
    data: props.userData.map(item => item.sessions)
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
      gradientToColors: ['#4CAF50'],
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0.2
    }
  },
  colors: ['#4CAF50', '#2196F3'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: props.userData.map(item => item.time),
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
        text: 'Usuarios',
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
    },
    {
      opposite: true,
      title: {
        text: 'Sesiones',
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
.concurrent-users-chart {
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