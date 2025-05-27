<template>
    <div class="error-distribution-chart">
      <div class="chart-header">
        <h3>Distribución de Errores</h3>
        <ion-badge color="medium" class="info-badge">
          <ion-icon :icon="alertCircleOutline" />
          <span>Últimas 24 horas</span>
        </ion-badge>
      </div>
      
      <ApexMixedChart 
        :series="chartSeries"
        type="bar"
        :colors="colors"
        :chartOptions="chartOptions"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { alertCircleOutline } from 'ionicons/icons';
  
  const props = defineProps<{
    errorData: Array<{
      type: string;
      count: number;
      severity: 'low' | 'medium' | 'high' | 'critical';
    }>;
    colors?: string[];
  }>();
  
  const chartSeries = computed(() => [{
    name: 'Errores',
    data: props.errorData.map(error => error.count)
  }]);
  
  const chartOptions = computed(() => ({
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false
        }
      }
    },
    xaxis: {
      categories: props.errorData.map(error => error.type),
      labels: {
        style: {
          colors: '#6c757d'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Cantidad de errores',
        style: {
          color: '#6c757d'
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 8,
        columnWidth: '70%'
      }
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} ocurrencias`
      }
    }
  }));
  </script>
  
  <style scoped>
  .error-distribution-chart {
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