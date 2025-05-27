<template>
    <div class="api-traffic-monitor">
      <div class="monitor-header">
        <h3>Tráfico de API</h3>
        <div class="time-filter">
          <ion-chip 
            v-for="period in timePeriods" 
            :key="period" 
            :color="activePeriod === period ? 'primary' : 'medium'"
            @click="activePeriod = period"
          >
            {{ period }}
          </ion-chip>
        </div>
      </div>
  
      <ApexMixedChart 
        :series="formattedSeries"
        type="line"
        :colors="colors"
        :chartOptions="chartOptions"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { IonChip } from '@ionic/vue';
  
  const props = defineProps<{
    series: Array<{
      name: string;
      data: Array<{ x: string; y: number }>;
      color: string;
    }>;
    colors?: string[];
  }>();
  
  const activePeriod = ref<'24h' | '7d' | '30d'>('24h');
  const timePeriods = ['24h', '7d', '30d'];
  
  const formattedSeries = computed(() => 
    props.series.map(series => ({
      name: series.name,
      data: series.data.map(point => point.y),
      color: series.color
    }))
  );
  
const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px'
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  xaxis: {
    type: 'category',
    categories: props.series[0].data.map(point => point.x),
    labels: {
      rotate: -45,
      rotateAlways: true,
      style: {
        fontSize: '12px'
      }
    },
    title: {
      text: 'Hora',
      style: {
        fontSize: '14px'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Solicitudes',
      style: {
        fontSize: '14px'
      }
    },
    labels: {
      formatter: function (val: number) {
        return val.toLocaleString();
      }
    }
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val: number) {
        return val.toLocaleString() + ' solicitudes';
      }
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'center',
    fontSize: '12px'
  },
  grid: {
    borderColor: '#e9ecef'
  }
}));
  </script>
  
  <style scoped>
  .api-traffic-monitor {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    height: 100%;
  }
  
  .monitor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .time-filter {
    display: flex;
    gap: 0.5rem;
  }
  
  ion-chip {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  ion-chip:hover {
    transform: translateY(-2px);
  }
  </style>