<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🚀 Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🚀 Negocio</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid class="dashboard-grid">
        <!-- Fila 1: Productos y Clientes -->
        <ion-row class="dashboard-row">
          <ion-col size="12" size-md="6">
            <div class="chart-box">
              <h3>Productos más vendidos</h3>
              <ApexMixedChart 
                :series="topProductsSeries" 
                type="bar"
                :chartOptions="chartOptions"
                :colors="['#4caf50']"
              />
            </div>
          </ion-col>
          <ion-col size="12" size-md="6">
            <div class="chart-box">
              <h3>Clientes más frecuentes</h3>
              <ApexMixedChart 
                :series="topCustomersSeries" 
                type="area"
                :colors="['#2196f3']"
              />
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: Ventas y Categorías -->
        <ion-row class="dashboard-row">
          <ion-col size="12" size-md="8">
            <div class="chart-box">
              <h3>Ventas mensuales</h3>
              <ApexMixedChart 
                :series="monthlySalesSeries" 
                type="line"
                :colors="['#ff9800']"
                yTitle="€"
                :strokeWidth="[3]"
              />
            </div>
          </ion-col>
          <ion-col size="12" size-md="4">
            <div class="chart-box">
              <h3>Categorías más vendidas</h3>
              <div class="categories-container">
                <div class="categories-chart">
                  <ApexMixedChart 
                    :series="categoriesSeries" 
                    type="donut"
                    :colors="categoriesData.map(c => c.color)"
                    :chartOptions="{
                      ...chartOptions.donut,
                      chart: {
                        height: 200
                      }
                    }"
                  />
                </div>
                <div class="categories-details">
                  <div class="categories-list">
                    <div v-for="category in categoriesData" :key="category.name" class="category-item">
                      <div class="category-info">
                        <div class="color-dot" :style="{ backgroundColor: category.color }"></div>
                        <span class="name">{{ category.name }}</span>
                      </div>
                      <span class="value">{{ category.items }}</span>
                      <span class="growth" :class="{ 'positive': category.growth.startsWith('+'), 'negative': category.growth.startsWith('-') }">
                        {{ category.growth }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 3: Ofertas y Expansión -->
        <ion-row class="dashboard-row">
          <ion-col size="12" size-md="6">
            <div class="chart-box">
              <h3>Productos en oferta vs. sin oferta</h3>
              <ApexMixedChart 
                :series="discountComparisonSeries"
                type="heatmap"
                :colors="['#607d8b', '#ff5722']"
                :chartOptions="chartOptions"
              />
            </div>
          </ion-col>
          <ion-col size="12" size-md="6">
            <div class="chart-box">
              <h3>Expansión Kinisi en Europa</h3>
              <EchartsMap 
                :data="expansionData"
                :mapName="'europe'"
                title="Expansión Kinisi"
                subtitle="Presencia en países europeos"
              />
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import ApexMixedChart from '@/components/ApexMixedChart.vue';
import EchartsMap from '@/components/EchartsMap.vue';

// Interfaces
interface ChartDataPoint {
  x: string;
  y: number;
}

interface ExpansionData {
  country: string;
  value: number;
  status: 'active' | 'planned' | 'inactive';
}

// Datos para los gráficos
const topProductsSeries = ref([{
  name: 'Ventas',
  data: [
    { x: 'Leotardos Premium', y: 245 },
    { x: 'Mallas Ballet', y: 198 },
    { x: 'Zapatillas Jazz', y: 185 },
    { x: 'Tops Danza', y: 172 },
    { x: 'Faldas Ballet', y: 165 }
  ]
}]);

const topCustomersSeries = ref([{
  name: 'Compras',
  data: [
    { x: 'María García', y: 28 },
    { x: 'Ana Martínez', y: 25 },
    { x: 'Laura Sánchez', y: 22 },
    { x: 'Carmen López', y: 20 },
    { x: 'Isabel Ruiz', y: 18 }
  ]
}]);

const monthlySalesSeries = ref([{
  name: 'Ventas',
  data: [
    { x: '2023-01-01', y: 12500 },
    { x: '2023-02-01', y: 15800 },
    { x: '2023-03-01', y: 14200 },
    { x: '2023-04-01', y: 16800 },
    { x: '2023-05-01', y: 19200 },
    { x: '2023-06-01', y: 17500 }
  ]
}]);

const categoriesLabels = [
  'Ballet Clásico',
  'Jazz Moderno',
  'Contemporáneo',
  'Hip Hop',
  'Flamenco',
  'Otros'
];

const categoriesSeries = ref([{
  name: 'Ventas por categoría',
  data: [35, 28, 20, 12, 4, 1]
}]);

const categoriesData = ref([
  {
    name: 'Ballet Clásico',
    value: 35,
    color: '#e91e63',
    items: 245,
    growth: '+12%'
  },
  {
    name: 'Jazz Moderno',
    value: 28,
    color: '#9c27b0',
    items: 198,
    growth: '+8%'
  },
  {
    name: 'Contemporáneo',
    value: 20,
    color: '#3f51b5',
    items: 142,
    growth: '+15%'
  },
  {
    name: 'Hip Hop',
    value: 12,
    color: '#2196f3',
    items: 85,
    growth: '+5%'
  },
  {
    name: 'Flamenco',
    value: 4,
    color: '#009688',
    items: 28,
    growth: '-2%'
  },
  {
    name: 'Otros',
    value: 1,
    color: '#ff5722',
    items: 7,
    growth: '+3%'
  }
]);

const products = [
  'Leotardos Premium',
  'Mallas Ballet',
  'Zapatillas Jazz',
  'Tops Danza',
  'Faldas Ballet',
  'Accesorios'
];

const discountComparisonSeries = ref([{
  name: 'Ventas',
  data: [
    { x: 'Leotardos Premium', y: 'En oferta', value: 85 },
    { x: 'Leotardos Premium', y: 'Sin oferta', value: 45 },
    { x: 'Mallas Ballet', y: 'En oferta', value: 95 },
    { x: 'Mallas Ballet', y: 'Sin oferta', value: 35 },
    { x: 'Zapatillas Jazz', y: 'En oferta', value: 105 },
    { x: 'Zapatillas Jazz', y: 'Sin oferta', value: 25 },
    { x: 'Tops Danza', y: 'En oferta', value: 75 },
    { x: 'Tops Danza', y: 'Sin oferta', value: 40 },
    { x: 'Faldas Ballet', y: 'En oferta', value: 90 },
    { x: 'Faldas Ballet', y: 'Sin oferta', value: 30 },
    { x: 'Accesorios', y: 'En oferta', value: 65 },
    { x: 'Accesorios', y: 'Sin oferta', value: 35 }
  ]
}]);

const expansionData = ref([
  { name: 'España', value: 100 },
  { name: 'Francia', value: 85 },
  { name: 'Italia', value: 70 },
  { name: 'Alemania', value: 55 },
  { name: 'Reino Unido', value: 40 },
  { name: 'Portugal', value: 35 }
]);

// Configuración mejorada para los gráficos
const chartOptions = {
  bar: {
    horizontal: true,
    dataLabels: {
      position: 'bottom',
      style: {
        fontSize: '12px',
        colors: ['#333']
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        barHeight: '70%',
        dataLabels: {
          position: 'bottom'
        }
      }
    }
  },
  area: {
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    }
  },
  line: {
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    }
  },
  donut: {
    labels: categoriesLabels,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px'
      },
      formatter: function (val: number) {
        return val + '%';
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      horizontalAlign: 'center'
    },
    chart: {
      height: 300
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 250
        },
        legend: {
          fontSize: '10px'
        }
      }
    }]
  },
  heatmap: {
    xaxis: {
      type: 'category',
      categories: products,
      title: {
        text: 'Prendas'
      },
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      type: 'category',
      categories: ['En oferta', 'Sin oferta'],
      title: {
        text: 'Estado'
      }
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            { from: 0, to: 20, color: '#607d8b' },
            { from: 21, to: 60, color: '#ff5722' },
            { from: 61, to: 100, color: '#e91e63' }
          ]
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val: string, opts: any) {
          return `<strong>${val} ventas</strong><br>
                 <span style='color:${opts.color}'>${opts.seriesName}</span>`;
        }
      }
    }
  }
};

// Función para formatear moneda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};
</script>

<style scoped>
.dashboard-grid {
  height: 100%;
  --ion-grid-padding: 8px;
  --ion-grid-column-padding: 8px;
}

.dashboard-row {
  margin-bottom: 16px;
  height: calc(33.33vh - 16px);
}

.chart-box {
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-box h3 {
  margin: 0 0 8px 0;
  color: var(--ion-color-primary);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-box h3::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 16px;
  background: var(--ion-color-primary);
  border-radius: 2px;
}

.categories-container {
  display: flex;
  gap: 1rem;
  height: 100%;
}

.categories-chart {
  flex: 1;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.categories-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 8px;
  align-items: center;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  font-size: 0.8rem;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.category-item .name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-item .value {
  font-weight: 600;
  text-align: right;
}

.category-item .growth {
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.75rem;
  text-align: center;
}

.growth.positive {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.growth.negative {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

@media (max-width: 768px) {
  .dashboard-row {
    height: auto;
    min-height: 300px;
  }
  
  .chart-box {
    margin-bottom: 16px;
  }
}
</style>