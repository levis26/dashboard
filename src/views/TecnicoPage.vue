<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>📊 Dashboard Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding technical-content">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">⚙️ Métricas Técnicas</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Sistema de Grid Mejorado -->
      <ion-grid class="technical-grid">
        <!-- Fila 1: Métricas Principales -->
        <ion-row class="metrics-row">
          <ion-col size="12" size-lg="6" class="chart-col">
            <TechnicalChartCard 
              title="Tiempo de Respuesta" 
              icon="speedometer"
              :series="responseTimeSeries"
              type="line"
              :colors="['#ff6b6b']"
              y-title="ms"
              info-text="Latencia promedio del servidor en los últimos 7 días"
            />
          </ion-col>
          
          <ion-col size="12" size-lg="6" class="chart-col">
            <TechnicalChartCard 
              title="Concurrencia de Usuarios" 
              icon="people"
              :series="concurrentUsersSeries"
              type="area"
              :colors="['#4dabf7']"
              y-title="usuarios"
              info-text="Picos de usuarios simultáneos por franja horaria"
            />
          </ion-col>
        </ion-row>

        <!-- Fila 2: Salud del Sistema -->
        <ion-row class="system-health-row">
          <ion-col size="12" size-lg="4" class="chart-col">
            <SystemHealthGauge 
              title="Almacenamiento"
              :value="storageUsage"
              :max="storageCapacity"
              unit="GB"
              status-color="#ffd43b"
              usage-label="Espacio Utilizado"
            />
          </ion-col>
          
          <ion-col size="12" size-lg="8" class="chart-col">
            <ErrorDistributionChart 
              :error-data="errorTypesSeries"
              :colors="['#ff6b6b', '#f06595', '#cc5de8', '#845ef7']"
            />
          </ion-col>
        </ion-row>

        <!-- Fila 3: Tráfico API -->
        <ion-row class="api-traffic-row">
          <ion-col size="12" class="chart-col">
            <APITrafficMonitor 
              :series="apiRequestsSeries"
              :colors="['#20c997', '#94d82d', '#fcc419', '#ff922b']"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonButtons, IonContent, IonHeader, 
  IonMenuButton, IonPage, IonTitle, IonToolbar, 
  IonGrid, IonRow, IonCol 
} from '@ionic/vue';
import TechnicalChartCard from '@/components/TechnicalChartCard.vue';
import SystemHealthGauge from '@/components/SystemHealthGauge.vue';
import ErrorDistributionChart from '@/components/ErrorDistributionChart.vue';
import APITrafficMonitor from '@/components/APITrafficMonitor.vue';

// Datos mejorados con estructura tipada
interface ChartDataPoint {
  x: string;
  y: number;
}

const responseTimeSeries = ref([
  {
    name: 'Latencia',
    data: [
      { x: '09:00', y: 120 },
      { x: '10:00', y: 115 },
      { x: '11:00', y: 110 },
      { x: '12:00', y: 95 },
      { x: '13:00', y: 105 },
      { x: '14:00', y: 110 },
      { x: '15:00', y: 115 },
      { x: '16:00', y: 120 },
      { x: '17:00', y: 115 },
      { x: '18:00', y: 85 },
      { x: '19:00', y: 90 },
      { x: '20:00', y: 85 },
      { x: '21:00', y: 75 }
    ]
  }
]);

const concurrentUsersSeries = ref([
  {
    name: 'Usuarios concurrentes',
    data: [
      { x: 'Lunes', y: 150 },
      { x: 'Martes', y: 230 },
      { x: 'Miércoles', y: 180 },
      { x: 'Jueves', y: 210 },
      { x: 'Viernes', y: 190 },
      { x: 'Sábado', y: 160 },
      { x: 'Domingo', y: 140 }
    ]
  }
]);

const errorTypesSeries = ref([
  { type: '404 - Página no encontrada', count: 15, severity: 'medium', color: '#f06595' },
  { type: '500 - Error interno', count: 8, severity: 'high', color: '#ff6b6b' },
  { type: 'Autenticación', count: 12, severity: 'high', color: '#cc5de8' },
  { type: 'Base de datos', count: 5, severity: 'critical', color: '#845ef7' },
  { type: 'Timeout', count: 3, severity: 'medium', color: '#4dabf7' },
  { type: 'Validación', count: 7, severity: 'low', color: '#20c997' }
]);

const storageUsage = ref(82.5);
const storageCapacity = ref(128);

const apiRequestsSeries = ref({
  endpoints: [
    { name: 'Autenticación', path: '/login', color: '#20c997' },
    { name: 'Carrito', path: '/cart', color: '#94d82d' },
    { name: 'Búsqueda', path: '/search', color: '#fcc419' },
    { name: 'Productos', path: '/products', color: '#ff922b' }
  ],
  data: [2450, 1820, 3150, 2780]
});
</script>

<style scoped>
.technical-content {
  --background: #f8f9fa;
}

.technical-grid {
  margin-top: 1rem;
  gap: 1.5rem;
}

.chart-col {
  padding: 0.75rem;
  height: 100%;
}

.metrics-row {
  min-height: 400px;
}

.system-health-row {
  min-height: 350px;
}

.api-traffic-row {
  min-height: 300px;
}

@media (max-width: 991px) {
  .chart-col {
    padding: 0.5rem;
  }
  
  .metrics-row,
  .system-health-row,
  .api-traffic-row {
    min-height: auto;
    gap: 1rem;
  }
}

/* Animaciones suaves */
.chart-col {
  transition: transform 0.3s ease;
}

.chart-col:hover {
  transform: translateY(-5px);
}

/* Mejoras de accesibilidad */
[class*="-row"] {
  scroll-margin-top: 80px;
}
</style>