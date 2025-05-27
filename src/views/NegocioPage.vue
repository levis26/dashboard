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

      <!-- Grid principal del Dashboard -->
      <ion-grid class="dashboard-grid">
        <!-- Fila 1: 2 Columnas -->
        <ion-row class="dashboard-row">
          <ion-col size="12" size-lg="6">
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
          <ion-col size="12" size-lg="6">
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

        <!-- Fila 2: 2 Columnas -->
        <ion-row class="dashboard-row">
          <ion-col size="12" size-lg="8">
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
          <ion-col size="12" size-lg="4">
            <div class="chart-box">
              <h3>Categorías más vendidas</h3>
              <div class="categories-container">
                <div class="categories-chart">
                  <ApexMixedChart 
                    :series="categoriesSeries" 
                    type="donut"
                    :colors="categoriesData.map(c => c.color)"
                    :chartOptions="{
                      labels: categoriesLabels,
                      dataLabels: {
                        enabled: true,
                        style: {
                          fontSize: '12px',
                          fontWeight: 600
                        },
                        formatter: function (val: number) {
                          return val + '%';
                        }
                      },
                      legend: {
                        position: 'bottom',
                        fontSize: '12px',
                        horizontalAlign: 'center',
                        markers: {
                          width: 12,
                          height: 12,
                          radius: 6
                        },
                        itemMargin: {
                          horizontal: 10,
                          vertical: 5
                        }
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: '65%',
                            labels: {
                              show: true,
                              name: {
                                show: true,
                                fontSize: '16px',
                                fontWeight: 600,
                                offsetY: -10
                              },
                              value: {
                                show: true,
                                fontSize: '24px',
                                fontWeight: 700,
                                offsetY: 5,
                                formatter: function (val: number) {
                                  return val + '%';
                                }
                              },
                              total: {
                                show: true,
                                label: 'Total',
                                fontSize: '16px',
                                fontWeight: 600,
                                formatter: function (w: any) {
                                  return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0) + '%';
                                }
                              }
                            }
                          }
                        }
                      },
                      chart: {
                        height: 350
                      },
                      stroke: {
                        width: 0
                      },
                      responsive: [{
                        breakpoint: 480,
                        options: {
                          chart: {
                            height: 300
                          },
                          legend: {
                            fontSize: '10px'
                          }
                        }
                      }]
                    }"
                  />
                </div>
                <div class="categories-details">
                  <div class="categories-header">
                    <span class="label">Categoría</span>
                    <span class="label">Ventas</span>
                    <span class="label">Crecimiento</span>
                  </div>
                  <div class="categories-list">
                    <div v-for="category in categoriesData" :key="category.name" class="category-item">
                      <div class="category-info">
                        <div class="color-dot" :style="{ backgroundColor: category.color }"></div>
                        <span class="name">{{ category.name }}</span>
                      </div>
                      <span class="value">{{ category.items }} items</span>
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

        <!-- Fila 3: 2 Columnas -->
        <ion-row class="dashboard-row">
          <ion-col size="12" size-lg="6">
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
          <ion-col size="12" size-lg="6">
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
  margin-top: 16px;
  height: 100%;
  --ion-grid-padding: 16px;
  --ion-grid-column-padding: 16px;
}

.dashboard-row {
  margin-bottom: 24px;
  height: auto;
}

.chart-box {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.chart-box h3 {
  margin: 0 0 1.5rem 0;
  color: var(--ion-color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-box h3::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background: var(--ion-color-primary);
  border-radius: 2px;
}

/* Ajustes responsivos */
@media (min-width: 992px) {
  .dashboard-row {
    height: 450px;
  }
  
  .chart-box {
    min-height: 400px;
  }
}

@media (max-width: 991px) {
  .dashboard-row {
    height: auto;
  }
  
  .chart-box {
    margin-bottom: 24px;
    min-height: 350px;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-box {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Estilos para el contenido del gráfico */
:deep(.apexcharts-canvas) {
  background: transparent !important;
}

:deep(.apexcharts-tooltip) {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
}

:deep(.apexcharts-legend) {
  padding: 8px !important;
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(4px);
  border-radius: 8px !important;
}

:deep(.apexcharts-grid line) {
  stroke: rgba(0, 0, 0, 0.05) !important;
}

:deep(.apexcharts-xaxis line),
:deep(.apexcharts-yaxis line) {
  stroke: rgba(0, 0, 0, 0.1) !important;
}

:deep(.apexcharts-text) {
  font-family: inherit !important;
}

/* Estilos para el mapa */
:deep(.echarts-map) {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

:deep(.echarts-map-tooltip) {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  padding: 12px !important;
}

.categories-container {
  display: flex;
  gap: 1.5rem;
  height: 100%;
  max-height: 400px;
  overflow: hidden;
}

.categories-chart {
  flex: 1;
  min-width: 250px;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.categories-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
  max-width: 50%;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.categories-details::-webkit-scrollbar {
  width: 6px;
}

.categories-details::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.categories-details::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.categories-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.75rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  font-weight: 600;
  color: var(--ion-color-medium);
  position: sticky;
  top: 0;
  z-index: 1;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 40px;
}

.category-item:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: translateX(4px);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.category-info .name {
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.category-item .value {
  font-weight: 600;
  color: var(--ion-color-dark);
}

.category-item .growth {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.growth.positive {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.growth.negative {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

@media (max-width: 991px) {
  .categories-container {
    flex-direction: column;
    gap: 1rem;
    max-height: none;
  }

  .categories-chart,
  .categories-details {
    width: 100%;
    max-width: 100%;
  }

  .categories-chart {
    min-height: 300px;
  }
}
</style>