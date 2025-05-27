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
              <ApexMixedChart 
                :series="categoriesSeries" 
                type="donut"
                :colors="['#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#009688', '#ff5722']"
                :chartOptions="chartOptions"
              />
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
</style>