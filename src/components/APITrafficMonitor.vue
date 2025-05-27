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
    series: {
      endpoints: string[];
      data: number[];
    };
    colors?: string[];
  }>();
  
  const activePeriod = ref<'24h' | '7d' | '30d'>('24h');
  const timePeriods = ['24h', '7d', '30d'];
  
  const formattedSeries = computed(() => 
    props.series.endpoints.map((endpoint, index) => ({
      name: endpoint,
      data: props.series.data.map(value => value * (index + 1))
    }))
  );
  
  const chartOptions = computed(() => ({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      labels: {
        style: {
          colors: '#6c757d'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Peticiones por minuto',
        style: {
          color: '#6c757d'
        }
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    markers: {
      size: 5,
      hover: {
        size: 7
      }
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