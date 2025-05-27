<template>
  <div class="monthly-sales-chart">
    <div class="chart-header">
      <h3>Ventas Mensuales</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="calendarOutline" />
        <span>Últimos 12 meses</span>
      </ion-badge>
    </div>
    
    <ApexMixedChart 
      :series="chartSeries"
      type="line"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { calendarOutline } from 'ionicons/icons';

const props = defineProps<{
  salesData: Array<{
    month: string;
    sales: number;
    orders: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Ventas',
  data: props.salesData.map(data => data.sales)
}, {
  name: 'Pedidos',
  data: props.salesData.map(data => data.orders)
}]);

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  colors: ['#4CAF50', '#2196F3'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: props.salesData.map(data => data.month),
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6c757d'
      }
    }
  },
  yaxis: [{
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
  }, {
    opposite: true,
    title: {
      text: 'Pedidos',
      style: {
        color: '#6c757d'
      }
    }
  }],
  tooltip: {
    shared: true,
    intersect: false,
    y: [{
      formatter: function (val: number) {
        return val.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
      }
    }, {
      formatter: function (val: number) {
        return val + ' pedidos';
      }
    }]
  }
}));
</script>

<style scoped>
.monthly-sales-chart {
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