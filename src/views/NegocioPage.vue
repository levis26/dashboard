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

      <div class="dashboard-container">
        <!-- Fila 1: Productos y Clientes -->
        <div class="dashboard-row">
          <div class="chart-box">
            <h3>Productos más vendidos</h3>
            <ApexMixedChart 
              :series="topProductsSeries" 
              type="bar"
              :chartOptions="chartOptions"
              :colors="['#4caf50']"
            />
          </div>
          <div class="chart-box">
            <h3>Clientes más frecuentes</h3>
            <ApexMixedChart 
              :series="topCustomersSeries" 
              type="area"
              :colors="['#2196f3']"
            />
          </div>
        </div>

        <!-- Fila 2: Ventas y Categorías -->
        <div class="dashboard-row">
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
          <div class="chart-box">
            <h3>Categorías más vendidas</h3>
            <div class="categories-container">
              <div class="categories-chart">
                <CategoriesSunburstChart 
                  :categories-data="categoriesData" 
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
        </div>

        <!-- Fila 3: Ofertas y Expansión -->
        <div class="dashboard-row">
          <div class="chart-box">
            <h3>Productos en oferta vs. sin oferta</h3>
            <ApexMixedChart 
              :series="discountComparisonSeries"
              type="heatmap"
              :chartOptions="{
                chart: {
                  type: 'heatmap',
                  height: 350,
                  toolbar: { show: false }
                },
                xaxis: {
                  type: 'category',
                  categories: products,
                  labels: {
                    style: { colors: '#666', fontSize: '12px' }
                  }
                },
                yaxis: {
                  type: 'category',
                  categories: ['En oferta', 'Sin oferta'],
                  title: { text: 'Estado' },
                  labels: {
                    style: { colors: '#666', fontSize: '12px' }
                  }
                },
                plotOptions: {
                  heatmap: {
                    colorScale: {
                      ranges: [
                        { from: 0, to: 30, color: '#607d8b' },
                        { from: 31, to: 70, color: '#ff5722' },
                        { from: 71, to: 100, color: '#e91e63' }
                      ]
                    },
                    distributed: true,
                    enableShades: true,
                    shadeIntensity: 0.5
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function(val: any) {
                    return val.value || '';
                  },
                  style: {
                    colors: ['#fff'],
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }
                },
                tooltip: {
                  enabled: true,
                  y: {
                    formatter: function(val: string, opts: any) {
                      if (opts && opts.value) {
                        const percentage = Math.round((opts.value / 100) * 100);
                        return `<strong>${opts.value} ventas (${percentage}%)</strong><br>
                               <span style='color:${opts.color}'>${val}</span>`;
                      }
                      return '';
                    }
                  }
                },
                legend: { show: false }
              }"
            />
          </div>
          <div class="chart-box">
            <h3>Expansión Kinisi en Europa</h3>
            <EchartsMap 
              :data="expansionData"
              :mapName="'europe'"
              title="Expansión Kinisi"
              subtitle="Presencia en países europeos"
            />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import ApexMixedChart from '@/components/ApexMixedChart.vue';
import EchartsMap from '@/components/EchartsMap.vue';
import CategoriesSunburstChart from '@/components/CategoriesSunburstChart.vue';

// Interfaces
interface ChartDataPoint {
  x: string;
  y: number;
}

interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
}

interface TooltipOptions {
  value: number;
  color: string;
  seriesName?: string;
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
    { x: 'Leotardos Premium', y: 85 },
    { x: 'Mallas Ballet', y: 95 },
    { x: 'Zapatillas Jazz', y: 105 },
    { x: 'Tops Danza', y: 75 },
    { x: 'Faldas Ballet', y: 90 },
    { x: 'Accesorios', y: 65 }
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

const discountComparisonSeries = ref([
  {
    name: 'Ventas',
    data: [
      [0, 0, 85],
      [0, 1, 35],
      [1, 0, 92],
      [1, 1, 28],
      [2, 0, 78],
      [2, 1, 22],
      [3, 0, 65],
      [3, 1, 25],
      [4, 0, 88],
      [4, 1, 32],
      [5, 0, 72],
      [5, 1, 18]
    ]
  }
]);

// Mapping for x and y axes
const productMapping = {
  0: 'Leotardos Premium',
  1: 'Mallas Ballet',
  2: 'Zapatillas Jazz',
  3: 'Tops Danza',
  4: 'Faldas Ballet',
  5: 'Accesorios'
};

const statusMapping = {
  0: 'En oferta',
  1: 'Sin oferta'
};

const expansionData = ref([
  { name: 'Spain', value: 100, status: 'active' },
  { name: 'France', value: 85, status: 'active' },
  { name: 'Italy', value: 70, status: 'active' },
  { name: 'Germany', value: 55, status: 'active' },
  { name: 'United Kingdom', value: 40, status: 'planned' },
  { name: 'Portugal', value: 35, status: 'active' },
  { name: 'Netherlands', value: 60, status: 'active' },
  { name: 'Belgium', value: 45, status: 'active' },
  { name: 'Switzerland', value: 30, status: 'planned' },
  { name: 'Austria', value: 25, status: 'planned' },
  { name: 'Greece', value: 20, status: 'planned' },
  { name: 'Poland', value: 15, status: 'planned' },
  { name: 'Czech Republic', value: 10, status: 'planned' },
  { name: 'Ireland', value: 12, status: 'planned' },
  { name: 'Denmark', value: 8, status: 'planned' },
  { name: 'Sweden', value: 6, status: 'planned' },
  { name: 'Norway', value: 4, status: 'planned' },
  { name: 'Finland', value: 3, status: 'planned' }
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
      type: "category",
      labels: {
        style: {
          colors: '#666'
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

// Actualizar las opciones del heatmap
const heatmapOptions = {
  chart: {
    type: 'heatmap',
    height: 350,
    toolbar: {
      show: false
    }
  },
  xaxis: {
    type: "category",
    categories: products,
    labels: {
      style: {
        colors: '#666',
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    type: 'category',
    categories: ['En oferta', 'Sin oferta'],
    title: {
      text: 'Estado'
    },
    labels: {
      style: {
        colors: '#666',
        fontSize: '12px'
      }
    }
  },
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [
          { from: 0, to: 30, color: '#607d8b' },
          { from: 31, to: 70, color: '#ff5722' },
          { from: 71, to: 100, color: '#e91e63' }
        ]
      },
      distributed: true,
      enableShades: true,
      shadeIntensity: 0.5
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function(val: any) {
      if (val && val.value) {
        return val.value;
      }
      return '';
    },
    style: {
      colors: ['#fff'],
      fontSize: '12px',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val: string, opts: any) {
        if (opts && opts.value) {
          const percentage = Math.round((opts.value / 100) * 100);
          return `<strong>${opts.value} ventas (${percentage}%)</strong><br>
                 <span style='color:${opts.color}'>${val}</span>`;
        }
        return '';
      }
    }
  },
  legend: {
    show: false
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
.dashboard-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.dashboard-row {
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
}

.chart-box {
  flex: 1 1 45%;
  min-width: 300px;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  z-index: 1;
  min-height: 300px;
}

.chart-box h3 {
  margin: 0 0 4px 0;
  color: var(--ion-color-primary);
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.chart-box h3::before {
  content: '';
  display: inline-block;
  width: 2px;
  height: 12px;
  background: var(--ion-color-primary);
  border-radius: 1px;
}

.categories-container {
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
  min-height: 0;
}

.categories-chart,
.categories-details {
  flex: 1 1 45%;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.categories-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  overflow: auto;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4px;
  align-items: center;
  padding: 2px 4px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  font-size: 0.75rem;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

.color-dot {
  width: 6px;
  height: 6px;
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
  font-size: 0.7rem;
}

.category-item .growth {
  font-weight: 600;
  padding: 1px 2px;
  border-radius: 2px;
  font-size: 0.65rem;
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
    grid-template-columns: 1fr;
  }

  .chart-box {
    min-height: 250px;
  }
}
@media (max-width: 1024px) {
  .dashboard-row {
    gap: 0.75rem;
  }
  
  .chart-box {
    flex: 1 1 100%;
    min-width: 100%;
  }
  
  .categories-container {
    flex-direction: column;
  }
  
  .categories-chart,
  .categories-details {
    flex: 1 1 100%;
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0.5rem;
  }
  
  .chart-box {
    padding: 0.75rem;
  }
  
  .chart-box h3 {
    font-size: 1.1rem;
  }
  
  .name {
    font-size: 0.9rem;
  }
  
  .value,
  .growth {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .chart-box h3 {
    font-size: 1rem;
  }
  
  .name {
    font-size: 0.85rem;
  }
  
  .value,
  .growth {
    font-size: 0.8rem;
    min-width: 70px;
  }
}
</style>