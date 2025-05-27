<template>
  <div class="top-customers-chart">
    <div class="chart-header">
      <h3>Clientes más Frecuentes</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="peopleOutline" />
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
import { peopleOutline } from 'ionicons/icons';

const props = defineProps<{
  customerData: Array<{
    name: string;
    orders: number;
    totalSpent: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Pedidos',
  data: props.customerData.map(data => data.orders)
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
      horizontal: false,
      columnWidth: '55%',
      distributed: true,
      borderRadius: 4
    }
  },
  colors: [
    '#00BCD4',
    '#009688',
    '#3F51B5',
    '#673AB7',
    '#E91E63'
  ],
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val;
    },
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  xaxis: {
    categories: props.customerData.map(data => data.name),
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6c757d'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Número de Pedidos',
      style: {
        color: '#6c757d'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number, { dataPointIndex }: { dataPointIndex: number }) {
        const customer = props.customerData[dataPointIndex];
        return `${val} pedidos (${customer.totalSpent.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })})`;
      }
    }
  }
}));
</script>

<style scoped>
.top-customers-chart {
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