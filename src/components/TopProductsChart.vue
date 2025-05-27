<template>
  <div class="top-products-chart">
    <div class="chart-header">
      <h3>Productos más Vendidos</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="trendingUpOutline" />
        <span>Top 5</span>
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
  productData: Array<{
    name: string;
    sales: number;
    quantity: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Ventas',
  data: props.productData.map(data => data.sales)
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
      horizontal: true,
      barHeight: '70%',
      distributed: true,
      borderRadius: 4
    }
  },
  colors: [
    '#4CAF50',
    '#2196F3',
    '#FFC107',
    '#9C27B0',
    '#FF5722'
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
    categories: props.productData.map(data => data.name),
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6c757d'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6c757d'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number, { dataPointIndex }: { dataPointIndex: number }) {
        const product = props.productData[dataPointIndex];
        return `${val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })} (${product.quantity} unidades)`;
      }
    }
  }
}));
</script>

<style scoped>
.top-products-chart {
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