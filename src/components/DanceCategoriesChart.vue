<template>
  <div class="dance-categories-chart">
    <div class="chart-header">
      <h3>Categorías más Vendidas</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="pulseOutline" />
        <span>Ropa para Bailarines</span>
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
import { pulseOutline } from 'ionicons/icons';

const props = defineProps<{
  categoryData: Array<{
    name: string;
    sales: number;
    percentage: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Ventas',
  data: props.categoryData.map(data => data.sales)
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
      borderRadius: 8,
      distributed: true
    }
  },
  colors: [
    '#FF1493', // Deep Pink
    '#FF69B4', // Hot Pink
    '#FF00FF', // Magenta
    '#C71585', // Medium Violet Red
    '#DB7093'  // Pale Violet Red
  ],
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
    },
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  xaxis: {
    categories: props.categoryData.map(data => data.name),
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6c757d'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Ventas',
      style: {
        color: '#6c757d'
      }
    },
    labels: {
      formatter: function (val: number) {
        return val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number, { dataPointIndex }: { dataPointIndex: number }) {
        return `${val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })} (${props.categoryData[dataPointIndex].percentage}%)`;
      }
    }
  }
}));
</script>

<style scoped>
.dance-categories-chart {
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