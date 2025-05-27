<template>
  <div class="storage-usage-chart">
    <div class="chart-header">
      <h3>Uso del Almacenamiento</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="hardwareChipOutline" />
        <span>Servidor</span>
      </ion-badge>
    </div>
    
    <ApexMixedChart 
      :series="chartSeries"
      type="donut"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { hardwareChipOutline } from 'ionicons/icons';

const props = defineProps<{
  storageData: {
    used: number;
    total: number;
    breakdown: Array<{
      type: string;
      size: number;
    }>;
  };
}>();

const chartSeries = computed(() => props.storageData.breakdown.map(item => item.size));

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 350
  },
  labels: props.storageData.breakdown.map(item => item.type),
  colors: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(1) + '%';
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 600,
            color: '#6c757d'
          },
          value: {
            show: true,
            fontSize: '16px',
            fontWeight: 600,
            color: '#212529',
            formatter: function (val: number) {
              return (val * props.storageData.total / 100).toFixed(1) + ' GB';
            }
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '14px',
            fontWeight: 600,
            color: '#6c757d',
            formatter: function () {
              return props.storageData.total + ' GB';
            }
          }
        }
      }
    }
  },
  legend: {
    position: 'bottom',
    fontSize: '12px',
    labels: {
      colors: '#6c757d'
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return (val * props.storageData.total / 100).toFixed(1) + ' GB';
      }
    }
  }
}));
</script>

<style scoped>
.storage-usage-chart {
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