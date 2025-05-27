<template>
  <div class="customer-age-chart">
    <div class="chart-header">
      <h3>Distribución de Clientes por Edad</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="peopleOutline" />
        <span>Base de clientes</span>
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
import { peopleOutline } from 'ionicons/icons';

const props = defineProps<{
  ageData: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Clientes',
  data: props.ageData.map(data => data.count)
}]);

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'bar',
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
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4,
      distributed: true
    }
  },
  colors: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#F44336'],
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toLocaleString();
    }
  },
  xaxis: {
    categories: props.ageData.map(data => data.range),
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6c757d'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Número de Clientes',
      style: {
        color: '#6c757d'
      }
    },
    labels: {
      formatter: function (val: number) {
        return val.toLocaleString();
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number, { dataPointIndex }: { dataPointIndex: number }) {
        return `${val} clientes (${props.ageData[dataPointIndex].percentage}%)`;
      }
    }
  }
}));
</script>

<style scoped>
.customer-age-chart {
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