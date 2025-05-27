<template>
    <div class="error-distribution-chart">
      <div class="chart-header">
        <h3>Distribución de Errores</h3>
        <ion-badge color="medium" class="info-badge">
          <ion-icon :icon="warningOutline" />
          <span>Sistema</span>
        </ion-badge>
      </div>
      
      <ApexMixedChart 
        :series="chartSeries"
        type="bar"
        :chartOptions="chartOptions"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { warningOutline } from 'ionicons/icons';
  
  interface ErrorData {
    type: string;
    count: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }
  
  const props = defineProps<{
    errorData: ErrorData[];
  }>();
  
  const chartSeries = computed(() => [{
    name: 'Errores',
    data: props.errorData.map(item => item.count)
  }]);
  
  const chartOptions = computed(() => ({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    colors: props.errorData.map(item => {
      switch (item.severity) {
        case 'critical': return '#dc3545';
        case 'high': return '#fd7e14';
        case 'medium': return '#ffc107';
        case 'low': return '#20c997';
        default: return '#6c757d';
      }
    }),
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString();
      },
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: props.errorData.map(item => item.type),
      labels: {
        style: {
          colors: '#6c757d',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6c757d',
          fontSize: '12px'
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' errores';
        }
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