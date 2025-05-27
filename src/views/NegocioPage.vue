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
                :chartOptions="{ horizontal: true }"
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
                :chartOptions="{
                  labels: categoriesLabels,
                  dataLabels: {
                    enabled: true,
                    style: {
                      fontSize: '12px'
                    },
                    formatter: function (val) {
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
                }"
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
                :chartOptions="{
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
                      formatter: function (val, opts) {
                        return `<strong>${val} ventas</strong><br>
                               <span style='color:${opts.color}'>${opts.seriesName}</span>`;
                      }
                    }
                  }
                }"
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

// Datos para los gráficos
const topProductsSeries = ref([{
  name: 'Ventas',
  data: [120, 98, 85, 72, 65].map((v, i) => ({
    x: `Producto ${i+1}`,
    y: v
  }))
}]);

const topCustomersSeries = ref([{
  name: 'Compras',
  data: [15, 12, 10, 8, 7].map((v, i) => ({
    x: `Cliente ${i+1}`,
    y: v
  }))
}]);

const monthlySalesSeries = ref([{
  name: 'Ventas',
  data: [
    { x: '2023-01-01', y: 2300 },
    { x: '2023-02-01', y: 3100 },
    { x: '2023-03-01', y: 2750 },
    { x: '2023-04-01', y: 2900 },
    { x: '2023-05-01', y: 4200 },
    { x: '2023-06-01', y: 3800 },
    { x: '2023-07-01', y: 4100 }
  ]
}]);

const categoriesSeries = ref([35, 25, 20, 15, 10, 5]);
const categoriesLabels = ref(['Hombres', 'Mujeres', 'Camisetas', 'Pantalones', 'Vestidos', 'Sombreros']);

const products = ref([
  'Camiseta Basic',
  'Pantalón Jogger',
  'Chaqueta Denim',
  'Vestido Midi',
  'Zapatillas Urban'
]);

const discountComparisonData = ref([
  { x: 'En oferta', y: 'Camiseta Basic', z: 65 },
  { x: 'En oferta', y: 'Pantalón Jogger', z: 59 },
  { x: 'En oferta', y: 'Chaqueta Denim', z: 80 },
  { x: 'En oferta', y: 'Vestido Midi', z: 81 },
  { x: 'En oferta', y: 'Zapatillas Urban', z: 56 },
  { x: 'Sin oferta', y: 'Camiseta Basic', z: 35 },
  { x: 'Sin oferta', y: 'Pantalón Jogger', z: 41 },
  { x: 'Sin oferta', y: 'Chaqueta Denim', z: 20 },
  { x: 'Sin oferta', y: 'Vestido Midi', z: 19 },
  { x: 'Sin oferta', y: 'Zapatillas Urban', z: 44 }
]);

const discountComparisonSeries = ref([{
  name: 'Ventas',
  data: [
    { x: 'Camiseta Basic', y: 65, z: 1 },
    { x: 'Pantalón Jogger', y: 59, z: 2 },
    { x: 'Chaqueta Denim', y: 80, z: 3 },
    { x: 'Vestido Midi', y: 81, z: 4 },
    { x: 'Zapatillas Urban', y: 56, z: 5 },
    { x: 'Camiseta Basic', y: 35, z: 1 },
    { x: 'Pantalón Jogger', y: 41, z: 2 },
    { x: 'Chaqueta Denim', y: 20, z: 3 },
    { x: 'Vestido Midi', y: 19, z: 4 },
    { x: 'Zapatillas Urban', y: 44, z: 5 }
  ]
}]);

const expansionData = ref([
  { name: "Spain", value: 25000 },
  { name: "France", value: 18000 },
  { name: "Germany", value: 22000 },
  { name: "Italy", value: 15000 },
  { name: "Portugal", value: 12000 },
  { name: "United Kingdom", value: 20000 },
  { name: "Netherlands", value: 10000 }
]);
</script>

<style scoped>
.dashboard-grid {
  margin-top: 16px;
  height: 100%;
}

.dashboard-row {
  margin-bottom: 20px;
  height: auto;
}

.chart-box {
  background: var(--ion-color-light);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.chart-box h3 {
  margin: 0 0 1rem 0;
  color: var(--ion-color-primary);
  font-size: 1.1rem;
}

/* Ajustes responsivos */
@media (min-width: 992px) {
  .dashboard-row {
    height: 400px;
  }
  
  .chart-box {
    min-height: 350px;
  }
}

@media (max-width: 991px) {
  .dashboard-row {
    height: auto;
  }
  
  .chart-box {
    margin-bottom: 20px;
    min-height: 300px;
  }
}
</style>