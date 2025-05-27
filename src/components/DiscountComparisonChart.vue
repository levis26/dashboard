<template>
  <div class="discount-comparison-chart">
    <div class="chart-header">
      <h3>Ventas con/sin Descuento</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="pricetagOutline" />
        <span>Comparativa</span>
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
import { pricetagOutline } from 'ionicons/icons';

const props = defineProps<{
  comparisonData: Array<{
    category: string;
    withDiscount: number;
    withoutDiscount: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Con Descuento',
  data: props.comparisonData.map(data => data.withDiscount)
}, {
  name: 'Sin Descuento',
  data: props.comparisonData.map(data => data.withoutDiscount)
}]);

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 350,
    stacked: false,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4
    }
  },
  colors: ['#FF5722', '#2196F3'],
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
    categories: props.comparisonData.map(data => data.category),
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
  }
}));
</script>

<style scoped>
.discount-comparison-chart {
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