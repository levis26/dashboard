<template>
  <div class="expansion-map-chart">
    <div class="chart-header">
      <h3>Expansión en Europa</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="locationOutline" />
        <span>Presencia</span>
      </ion-badge>
    </div>
    
    <div class="map-container">
      <ApexMixedChart 
        :series="chartSeries"
        type="area"
        :chartOptions="chartOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { locationOutline } from 'ionicons/icons';

const props = defineProps<{
  expansionData: Array<{
    country: string;
    sales: number;
    stores: number;
  }>;
}>();

const chartSeries = computed(() => [{
  name: 'Ventas',
  data: props.expansionData.map(data => data.sales)
}, {
  name: 'Tiendas',
  data: props.expansionData.map(data => data.stores)
}]);

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  colors: ['#9C27B0', '#E91E63'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: props.expansionData.map(data => data.country),
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
        return val.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
      }
    }
  }, {
    opposite: true,
    title: {
      text: 'Tiendas',
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
        return val.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
      }
    }, {
      formatter: function (val: number) {
        return val + ' tiendas';
      }
    }]
  }
}));
</script>

<style scoped>
.expansion-map-chart {
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

.map-container {
  height: calc(100% - 3rem);
}
</style> 