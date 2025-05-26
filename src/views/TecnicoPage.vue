<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>📈 Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🚀 Técnico</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Grid principal del Dashboard -->
      <ion-grid class="dashboard-grid">
        <!-- Fila 1: 2 Columnas -->
        <ion-row class="ion-row-1">
          <ion-col size="12" size-lg="6">
            <div class="box">
              <h3>Tiempo de respuesta del servidor</h3>
              <ApexMixedChart 
                :series="responseTimeSeries" 
                type="line"
                :colors="['#ff5722']"
                yTitle="ms"
              />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="6">
            <div class="box">
              <h3>Usuarios concurrentes</h3>
              <ApexMixedChart 
                :series="concurrentUsersSeries" 
                type="area"
                :colors="['#2196f3']"
                yTitle="usuarios"
              />
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: 2 Columnas -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-lg="6">
            <div class="box">
              <h3>Errores del sistema</h3>
              <ApexMixedChart 
                :series="errorTypesSeries" 
                type="bar"
                :colors="['#f44336', '#e91e63', '#9c27b0', '#673ab7']"
              />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="6">
            <div class="box">
              <h3>Uso de almacenamiento</h3>
              <EchartsGauge 
                :value="storageUsage" 
                :max="storageCapacity"
                :colors="[[0.5, '#4caf50'], [0.8, '#ff9800'], [1, '#f44336']]"
                unit="GB"
              />
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 3: 1 Columna -->
        <ion-row class="ion-row-3">
          <ion-col size="12">
            <div class="box">
              <h3>Peticiones a la API</h3>
              <ApexMixedChart 
                :series="apiRequestsSeries" 
                type="bar"
                :colors="['#607d8b', '#009688', '#8bc34a', '#ffc107']"
                yTitle="peticiones"
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
import EchartsGauge from '@/components/EchartsGauge.vue';

// Datos mock para demostración
const responseTimeSeries = ref([{
  name: 'Tiempo respuesta',
  data: [
    { x: '2023-01-01', y: 120 },
    { x: '2023-02-01', y: 95 },
    { x: '2023-03-01', y: 110 },
    { x: '2023-04-01', y: 85 },
    { x: '2023-05-01', y: 75 },
    { x: '2023-06-01', y: 70 },
    { x: '2023-07-01', y: 65 }
  ]
}]);

const concurrentUsersSeries = ref([{
  name: 'Usuarios',
  data: [
    { x: '08:00', y: 50 },
    { x: '10:00', y: 120 },
    { x: '12:00', y: 210 },
    { x: '14:00', y: 180 },
    { x: '16:00', y: 150 },
    { x: '18:00', y: 90 },
    { x: '20:00', y: 60 }
  ]
}]);

const errorTypesSeries = ref([
  { name: '404', data: 15 },
  { name: '500', data: 8 },
  { name: 'Login', data: 12 },
  { name: 'Pago', data: 5 }
]);

const storageUsage = ref(75);
const storageCapacity = ref(100);

const apiRequestsSeries = ref([{
  name: 'Login',
  data: [1200, 1150, 1300, 1250, 1400]
}, {
  name: 'Carrito',
  data: [850, 900, 950, 1000, 1100]
}, {
  name: 'Búsqueda',
  data: [2000, 2100, 2200, 2300, 2400]
}, {
  name: 'Productos',
  data: [1800, 1900, 2000, 2100, 2200]
}]);
</script>

<style scoped>
/* Estilos similares a NegocioPage.vue */
.box {
  background: var(--ion-color-light);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.box h3 {
  margin-top: 0;
  color: var(--ion-color-primary);
}

.dashboard-grid {
  margin-top: 16px;
  height: 100%;
}

.ion-row-1,
.ion-row-2,
.ion-row-3 {
  margin-bottom: 16px;
  height: 100%;
}

@media (min-width: 992px) {  
  ion-grid { height: 100%; }
  .ion-row-1 { height: 30%; max-height: 30%; }
  .ion-row-2 { height: 40%; max-height: 40%; }
  .ion-row-3 { height: 30%; max-height: 30%; }
}
</style>