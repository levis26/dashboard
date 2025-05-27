<template>
  <div class="product-performance-chart">
    <div class="chart-header">
      <h3>Rendimiento de Productos</h3>
      <ion-badge color="medium" class="info-badge">
        <ion-icon :icon="analyticsOutline" />
        <span>Top 5 Productos</span>
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
import { analyticsOutline } from 'ionicons/icons';

const props = defineProps<{
  productData: Array<{
    name: string;
    sales: number;
    stock: number;
    rating: number;
  }>;
}>();

const chartSeries = computed(() => [
  {
    name: 'Ventas',
    type: 'bar',
    data: props.productData.map(data => data.sales)
  },
  {
    name: 'Stock',
    type: 'bar',
    data: props.productData.map(data => data.stock)
  },
  {
    name: 'Rating',
    type: 'line',
    data: props.productData.map(data => data.rating)
  }
]);

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'bar',
    stacked: false,
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
  colors: ['#4CAF50', '#2196F3', '#FFC107'],
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toLocaleString();
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
  yaxis: [
    {
      title: {
        text: 'Cantidad',
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
    {
      opposite: true,
      title: {
        text: 'Rating',
        style: {
          color: '#6c757d'
        }
      },
      min: 0,
      max: 5,
      labels: {
        formatter: function (val: number) {
          return val.toFixed(1);
        }
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: [
      {
        formatter: function (val: number) {
          return val.toLocaleString() + ' unidades';
        }
      },
      {
        formatter: function (val: number) {
          return val.toLocaleString() + ' unidades';
        }
      },
      {
        formatter: function (val: number) {
          return val.toFixed(1) + ' estrellas';
        }
      }
    ]
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
}));
</script>

<style scoped>
.product-performance-chart {
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