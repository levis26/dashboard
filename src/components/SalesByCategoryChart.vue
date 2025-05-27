<template>
  <div class="sales-category-chart">
    <div class="chart-header">
      <h3>Ventas por Categoría</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="trendingUpOutline" />
        <span>Último mes</span>
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
import { trendingUpOutline } from 'ionicons/icons';

const props = defineProps<{
  salesData: Array<{
    category: string;
    sales: number;
    target: number;
  }>;
}>();

const chartSeries = computed(() => [
  {
    name: 'Ventas Reales',
    type: 'bar',
    data: props.salesData.map(data => data.sales)
  },
  {
    name: 'Meta',
    type: 'line',
    data: props.salesData.map(data => data.target)
  }
]);

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
      borderRadius: 4
    }
  },
  colors: ['#4CAF50', '#2196F3'],
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
    }
  },
  xaxis: {
    categories: props.salesData.map(data => data.category),
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
    shared: true,
    intersect: false,
    y: {
      formatter: function (val: number) {
        return val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
}));
</script>

<style scoped>
.sales-category-chart {
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