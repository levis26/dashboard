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

    <ion-content :fullscreen="true" class="technical-content">
      <div class="technical-header">
        <h1>Dashboard Técnico</h1>
        <p>Monitoreo en tiempo real del rendimiento y salud del sistema</p>
      </div>

      <ion-grid class="technical-grid">
        <!-- Fila 1: Tiempo de Respuesta y Usuarios Concurrentes -->
        <ion-row class="metrics-row">
          <ion-col size="12" size-lg="6" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Tiempo de Respuesta</div>
                <ion-icon :icon="speedometer" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <ApexMixedChart 
                  :series="responseTimeSeries"
                  type="line"
                  :colors="['#ff6b6b']"
                  y-title="ms"
                  :chartOptions="chartOptions.line"
                />
              </div>
              <div class="chart-card-footer">
                <p>Latencia promedio del servidor en los últimos 7 días</p>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-lg="6" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Usuarios Concurrentes</div>
                <ion-icon :icon="people" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <ApexMixedChart 
                  :series="concurrentUsersSeries"
                  type="area"
                  :colors="['#4dabf7']"
                  y-title="usuarios"
                  :chartOptions="chartOptions.area"
                />
              </div>
              <div class="chart-card-footer">
                <p>Picos de usuarios simultáneos por franja horaria</p>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: Uso de Almacenamiento y Errores -->
        <ion-row class="system-health-row">
          <ion-col size="12" size-lg="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Almacenamiento</div>
                <ion-icon :icon="server" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <div class="storage-info">
                  <div class="storage-gauge">
                    <ApexMixedChart 
                      :series="[{
                        name: 'Uso',
                        data: [storageUsage]
                      }]"
                      type="radialBar"
                      :colors="['#ffd43b']"
                      :chartOptions="{
                        ...chartOptions.gauge,
                        plotOptions: {
                          radialBar: {
                            startAngle: -135,
                            endAngle: 135,
                            hollow: {
                              size: '70%',
                              background: '#fff',
                              image: undefined,
                              imageOffsetX: 0,
                              imageOffsetY: 0,
                              position: 'front',
                              dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24
                              }
                            },
                            track: {
                              background: '#f1f1f1',
                              strokeWidth: '97%',
                              margin: 5,
                              dropShadow: {
                                enabled: true,
                                top: 2,
                                left: 0,
                                blur: 4,
                                opacity: 0.15
                              }
                            },
                            dataLabels: {
                              name: {
                                show: true,
                                fontSize: '16px',
                                fontWeight: 600,
                                offsetY: 0,
                                color: '#333'
                              },
                              value: {
                                show: true,
                                fontSize: '28px',
                                fontWeight: 700,
                                offsetY: 0,
                                color: '#333',
                                formatter: function (val: number) {
                                  return val + '%';
                                }
                              }
                            }
                          }
                        }
                      }"
                    />
                  </div>
                  <div class="storage-details">
                    <div class="storage-summary">
                      <div class="storage-total">
                        <ion-icon :icon="hardwareChip" class="storage-icon"></ion-icon>
                        <div class="storage-info-text">
                          <span class="label">Capacidad Total</span>
                          <span class="value">{{ storageCapacity }} GB</span>
                        </div>
                      </div>
                      <div class="storage-used">
                        <ion-icon :icon="cloudUpload" class="storage-icon"></ion-icon>
                        <div class="storage-info-text">
                          <span class="label">Espacio Usado</span>
                          <span class="value">{{ (storageCapacity * storageUsage / 100).toFixed(1) }} GB</span>
                        </div>
                      </div>
                      <div class="storage-free">
                        <ion-icon :icon="cloudDownload" class="storage-icon"></ion-icon>
                        <div class="storage-info-text">
                          <span class="label">Espacio Libre</span>
                          <span class="value">{{ (storageCapacity * (100 - storageUsage) / 100).toFixed(1) }} GB</span>
                        </div>
                      </div>
                    </div>
                    <div class="storage-breakdown">
                      <h4>Desglose por Tipo</h4>
                      <div class="storage-items">
                        <div v-for="item in storageData" :key="item.name" class="storage-item">
                          <div class="storage-item-header">
                            <div class="storage-item-info">
                              <ion-icon :icon="item.icon" class="storage-item-icon" :style="{ color: item.color }"></ion-icon>
                              <span class="name">{{ item.name }}</span>
                            </div>
                            <span class="growth" :class="{ 'positive': item.growth.startsWith('+'), 'negative': item.growth.startsWith('-') }">
                              {{ item.growth }}
                            </span>
                          </div>
                          <div class="storage-item-progress">
                            <div class="progress-bar">
                              <div class="progress-fill" :style="{ width: (item.value / storageCapacity * 100) + '%', backgroundColor: item.color }"></div>
                            </div>
                            <span class="value">{{ item.value }} GB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-card-footer">
                <p>Espacio de almacenamiento utilizado: {{ storageUsage }}%</p>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-lg="8" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Distribución de Errores</div>
                <ion-icon :icon="bug" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <ApexMixedChart 
                  :series="[{
                    name: 'Errores',
                    data: errorTypesSeries.map((e: ErrorData) => e.count)
                  }]"
                  type="bar"
                  :colors="errorTypesSeries.map((e: ErrorData) => e.color)"
                  :chartOptions="{
                    ...chartOptions.bar,
                    xaxis: {
                      categories: errorTypesSeries.map((e: ErrorData) => e.type),
                      labels: {
                        style: {
                          fontSize: '12px'
                        }
                      }
                    }
                  }"
                />
              </div>
              <div class="chart-card-footer">
                <p>Distribución de errores por tipo y severidad</p>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 3: Tráfico API -->
        <ion-row class="api-traffic-row">
          <ion-col size="12" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Tráfico de API</div>
                <ion-icon :icon="codeWorking" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <ApexMixedChart 
                  :series="apiRequestsSeries"
                  type="line"
                  :colors="apiRequestsSeries.map((s: ApiRequestData) => s.color)"
                  :chartOptions="{
                    ...chartOptions.line,
                    stroke: {
                      curve: 'smooth',
                      width: 2
                    },
                    markers: {
                      size: 4
                    }
                  }"
                />
              </div>
              <div class="chart-card-footer">
                <p>Tráfico de llamadas API por endpoint</p>
              </div>
            </div>
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
  IonGrid, IonRow, IonCol, IonIcon 
} from '@ionic/vue';
import { 
  speedometer, people, server, bug, codeWorking, hardwareChip, cloudUpload, cloudDownload 
} from 'ionicons/icons';
import ApexMixedChart from '@/components/ApexMixedChart.vue';

// Interfaces
interface ChartDataPoint {
  x: string;
  y: number;
}

interface ErrorData {
  type: string;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  color: string;
}

interface ApiRequestData {
  name: string;
  data: ChartDataPoint[];
  color: string;
}

// Configuración mejorada para los gráficos
interface ChartOptions {
  line: {
    stroke: {
      curve: string;
      width: number;
    };
    markers: {
      size: number;
      hover: {
        size: number;
      };
    };
    tooltip: {
      y: {
        formatter: (val: number) => string;
      };
    };
  };
  area: {
    fill: {
      type: string;
      gradient: {
        shadeIntensity: number;
        opacityFrom: number;
        opacityTo: number;
        stops: number[];
      };
    };
    stroke: {
      curve: string;
      width: number;
    };
    tooltip: {
      y: {
        formatter: (val: number) => string;
      };
    };
  };
  gauge: {
    min: number;
    max: number;
    plotOptions: {
      radialBar: {
        startAngle: number;
        endAngle: number;
        hollow: {
          size: string;
        };
        dataLabels: {
          name: {
            show: boolean;
            fontSize: string;
            fontWeight: number;
            offsetY: number;
          };
          value: {
            show: boolean;
            fontSize: string;
            fontWeight: number;
            offsetY: number;
            formatter: (val: number) => string;
          };
        };
      };
    };
  };
  bar: {
    distributed: boolean;
    dataLabels: {
      position: string;
      style: {
        fontSize: string;
        colors: string[];
      };
    };
    plotOptions: {
      bar: {
        borderRadius: number;
        horizontal: boolean;
        columnWidth: string;
      };
    };
  };
}

// Datos
const responseTimeSeries = ref([{
  name: 'Latencia',
  data: [
    { x: '09:00', y: 85 },
    { x: '10:00', y: 92 },
    { x: '11:00', y: 88 },
    { x: '12:00', y: 95 },
    { x: '13:00', y: 82 },
    { x: '14:00', y: 78 },
    { x: '15:00', y: 85 },
    { x: '16:00', y: 92 },
    { x: '17:00', y: 88 },
    { x: '18:00', y: 75 },
    { x: '19:00', y: 82 },
    { x: '20:00', y: 78 },
    { x: '21:00', y: 72 }
  ]
}]);

const concurrentUsersSeries = ref([{
  name: 'Usuarios concurrentes',
  data: [
    { x: 'Lunes', y: 250 },
    { x: 'Martes', y: 320 },
    { x: 'Miércoles', y: 280 },
    { x: 'Jueves', y: 310 },
    { x: 'Viernes', y: 290 },
    { x: 'Sábado', y: 260 },
    { x: 'Domingo', y: 240 }
  ]
}]);

const errorTypesSeries = ref<ErrorData[]>([
  { type: '404 - Página no encontrada', count: 25, severity: 'medium', color: '#f06595' },
  { type: '500 - Error interno', count: 18, severity: 'high', color: '#ff6b6b' },
  { type: 'Autenticación', count: 22, severity: 'high', color: '#cc5de8' },
  { type: 'Base de datos', count: 15, severity: 'critical', color: '#845ef7' },
  { type: 'Timeout', count: 13, severity: 'medium', color: '#4dabf7' },
  { type: 'Validación', count: 17, severity: 'low', color: '#20c997' }
]);

const storageUsage = ref(92.5);
const storageCapacity = ref(128);

// Datos de almacenamiento por tipo
const storageData = ref([
  {
    name: 'Base de datos',
    value: 45.8,
    color: '#845ef7',
    icon: 'server',
    growth: '+5.2%'
  },
  {
    name: 'Imágenes',
    value: 28.3,
    color: '#20c997',
    icon: 'image',
    growth: '+12.8%'
  },
  {
    name: 'Logs',
    value: 12.4,
    color: '#ff922b',
    icon: 'document-text',
    growth: '+3.5%'
  },
  {
    name: 'Backups',
    value: 6.0,
    color: '#fcc419',
    icon: 'save',
    growth: '-1.2%'
  }
]);

const apiRequestsSeries = ref<ApiRequestData[]>([
  {
    name: 'Autenticación',
    data: [
      { x: '09:00', y: 3450 },
      { x: '12:00', y: 3300 },
      { x: '15:00', y: 3500 },
      { x: '18:00', y: 3200 }
    ],
    color: '#20c997'
  },
  {
    name: 'Carrito',
    data: [
      { x: '09:00', y: 2820 },
      { x: '12:00', y: 2900 },
      { x: '15:00', y: 2750 },
      { x: '18:00', y: 2850 }
    ],
    color: '#94d82d'
  },
  {
    name: 'Búsqueda',
    data: [
      { x: '09:00', y: 4150 },
      { x: '12:00', y: 4200 },
      { x: '15:00', y: 4050 },
      { x: '18:00', y: 4100 }
    ],
    color: '#fcc419'
  },
  {
    name: 'Productos',
    data: [
      { x: '09:00', y: 3780 },
      { x: '12:00', y: 3850 },
      { x: '15:00', y: 3700 },
      { x: '18:00', y: 3800 }
    ],
    color: '#ff922b'
  }
]);

// Configuración mejorada para los gráficos
const chartOptions: ChartOptions = {
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
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' ms';
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
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' usuarios';
        }
      }
    }
  },
  gauge: {
    min: 0,
    max: 100,
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '60%'
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '16px',
            fontWeight: 600,
            offsetY: 0
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 700,
            offsetY: 0,
            formatter: function (val: number) {
              return val + '%';
            }
          }
        }
      }
    }
  },
  bar: {
    distributed: true,
    dataLabels: {
      position: 'top',
      style: {
        fontSize: '12px',
        colors: ['#333']
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '70%'
      }
    }
  }
};

// Función para formatear números
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-ES').format(value);
};
</script>

<style scoped>
.technical-content {
  background: var(--ion-color-light);
  padding: 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.technical-grid {
  --ion-grid-padding: 0;
  width: 100%;
  flex-grow: 1;
}

.technical-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.technical-header h1 {
  font-size: 1.75rem;
  color: var(--ion-color-primary);
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.technical-header h1::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 24px;
  background: var(--ion-color-primary);
  border-radius: 2px;
}

.technical-header p {
  color: var(--ion-color-medium);
  font-size: 1rem;
  margin: 0.75rem 0 0;
  padding-left: 16px;
}

.metrics-row,
.system-health-row,
.api-traffic-row {
  min-height: 350px;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.api-traffic-row {
  min-height: 300px;
  margin-top: 1.5rem;
}

.chart-col {
  position: relative;
  padding: 0.75rem;
  transition: all 0.3s ease;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-col:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.chart-card {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chart-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ion-color-medium-shade);
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-card-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background: var(--ion-color-primary);
  border-radius: 2px;
}

.chart-card-icon {
  font-size: 1.5rem;
  color: var(--ion-color-primary);
  padding: 8px;
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 8px;
}

.chart-card-content {
  flex-grow: 1;
  position: relative;
  min-height: 250px;
}

.chart-card-footer {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-card-footer p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--ion-color-medium);
  display: flex;
  align-items: center;
  gap: 6px;
}

.chart-card-footer p::before {
  content: 'ℹ️';
  font-size: 1rem;
}

/* Estilos para los gráficos */
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

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-col {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Responsive design */
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
  
  .chart-card {
    padding: 1rem;
  }
  
  .chart-card-title {
    font-size: 1.1rem;
  }
  
  .chart-card-content {
    min-height: 200px;
  }
}

/* Mejoras de accesibilidad */
[class*="-row"] {
  scroll-margin-top: 80px;
}

/* Gradientes sutiles */
.chart-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(32, 201, 151, 0.03), rgba(32, 201, 151, 0.01));
  pointer-events: none;
}

.storage-info {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  height: 100%;
  padding: 1rem;
  max-height: 400px;
  overflow: hidden;
}

.storage-gauge {
  flex: 1;
  min-width: 200px;
  max-width: 40%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storage-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 60%;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.storage-details::-webkit-scrollbar {
  width: 6px;
}

.storage-details::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.storage-details::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.storage-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.storage-total,
.storage-used,
.storage-free {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  transition: all 0.3s ease;
  min-height: 60px;
}

.storage-total:hover,
.storage-used:hover,
.storage-free:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.storage-icon {
  font-size: 1.5rem;
  color: var(--ion-color-primary);
  padding: 0.5rem;
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 8px;
}

.storage-info-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.storage-info-text .label {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.storage-info-text .value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.storage-breakdown {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  padding: 1rem;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.storage-breakdown h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.02);
  padding: 0.5rem 0;
  z-index: 1;
}

.storage-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.storage-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 50px;
}

.storage-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.storage-item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.storage-item .name {
  font-size: 0.85rem;
  color: var(--ion-color-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.storage-item-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  overflow: hidden;
  min-width: 0;
}

.storage-item .value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ion-color-medium);
  min-width: 60px;
  text-align: right;
  white-space: nowrap;
}

.growth {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
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
  .storage-info {
    flex-direction: column;
    gap: 1.5rem;
    max-height: none;
  }

  .storage-gauge {
    width: 100%;
    max-width: 100%;
    min-height: 250px;
  }

  .storage-details {
    width: 100%;
    max-width: 100%;
  }

  .storage-summary {
    grid-template-columns: 1fr;
  }
}
</style>