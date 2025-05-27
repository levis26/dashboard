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
      <ion-grid class="technical-grid">
        <!-- Fila 1: Tiempo de Respuesta y Usuarios Concurrentes -->
        <ion-row class="metrics-row">
          <ion-col size="12" size-md="6" class="chart-col">
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
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="6" class="chart-col">
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
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: Almacenamiento y Errores -->
        <ion-row class="system-health-row">
          <ion-col size="12" size-md="4" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Almacenamiento</div>
                <ion-icon :icon="server" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <div class="storage-info">
                  <CircularStorageChart 
                    :storage-percentage="storageUsage"
                    :theme-color="'#ffd43b'"
                    :total-capacity="10000"
                  />
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="8" class="chart-col">
            <div class="chart-card">
              <div class="chart-card-header">
                <div class="chart-card-title">Distribución de Errores</div>
                <ion-icon :icon="bug" class="chart-card-icon"></ion-icon>
              </div>
              <div class="chart-card-content">
                <ApexMixedChart 
                  :series="[{
                    name: 'Errores',
                    data: errorTypesSeries.map((e: ErrorData) => ({
                      x: e.type,
                      y: e.count
                    }))
                  }]"
                  type="bar"
                  :colors="errorTypesSeries.map((e: ErrorData) => e.color)"
                  :chartOptions="{
                    chart: {
                      height: 200,
                      type: 'bar',
                      toolbar: {
                        show: false
                      }
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                        columnWidth: '60%',
                        borderRadius: 4,
                        distributed: true
                      }
                    },
                    dataLabels: {
                      enabled: true,
                      formatter: function(val: number) {
                        return val + ' errores';
                      },
                      style: {
                        fontSize: '12px',
                        colors: ['#fff']
                      }
                    },
                    legend: {
                      show: false
                    },
                    xaxis: {
                      categories: errorTypesSeries.map((e: ErrorData) => e.type),
                      labels: {
                        style: {
                          fontSize: '12px'
                        }
                      }
                    },
                    yaxis: {
                      title: {
                        text: 'Cantidad de errores'
                      }
                    },
                    tooltip: {
                      y: {
                        formatter: function(val: number) {
                          return val + ' errores';
                        }
                      }
                    }
                  }"
                />
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
                    chart: {
                      height: 200
                    }
                  }"
                />
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
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonIcon 
} from '@ionic/vue';
import { 
  speedometer, 
  people, 
  server, 
  bug, 
  codeWorking, 
  hardwareChip, 
  cloudUpload, 
  cloudDownload 
} from 'ionicons/icons';
import ApexMixedChart from '@/components/ApexMixedChart.vue';
import CircularStorageChart from '@/components/CircularStorageChart.vue';

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
  pie: {
    chart: {
      height: number;
    };
    labels: string[];
    dataLabels: {
      enabled: boolean;
      formatter: (val: number) => string;
    };
    legend: {
      position: string;
      fontSize: string;
      markers: {
        width: number;
        height: number;
        radius: number;
      };
    };
  };
  treemap: {
    chart: {
      height: number;
    };
    plotOptions: {
      treemap: {
        distributed: boolean;
        enableShades: boolean;
      };
    };
    dataLabels: {
      formatter: (text: string, op: any) => string[];
    };
  };
  donut: {
    chart: {
      height: number;
    };
    labels: string[];
    dataLabels: {
      enabled: boolean;
      formatter: (val: number) => string;
    };
    legend: {
      position: string;
      fontSize: string;
      markers: {
        width: number;
        height: number;
        radius: number;
      };
    };
    plotOptions: {
      pie: {
        donut: {
          size: string;
          labels: {
            show: boolean;
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
            total: {
              show: boolean;
              label: string;
              fontSize: string;
              fontWeight: number;
              formatter: () => string;
            };
          };
        };
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
  { type: 'Base de datos', count: 15, severity: 'critical', color: '#845ef7' }
]);

const storageUsage = ref(92.5);
const storageCapacity = ref(128);

// Datos de almacenamiento por tipo
const storageData = ref([
  {
    name: 'Base de datos',
    value: 45.8,
    color: '#845ef7'
  },
  {
    name: 'Imágenes',
    value: 28.3,
    color: '#20c997'
  },
  {
    name: 'Logs',
    value: 12.4,
    color: '#ff922b'
  },
  {
    name: 'Backups',
    value: 6.0,
    color: '#fcc419'
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
  pie: {
    chart: {
      height: 150
    },
    labels: storageData.value.map(item => item.name),
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + ' GB';
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    }
  },
  treemap: {
    chart: {
      height: 200
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    },
    dataLabels: {
      formatter: function(text: string, op: any) {
        return [text, op.value + ' errores']
      }
    }
  },
  donut: {
    chart: {
      height: 250
    },
    labels: ['Usado', 'Libre'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%';
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
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
              offsetY: 10,
              formatter: function (val: number) {
                return ((val * Number(storageCapacity)) / 100).toFixed(1) + ' GB';
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600,
              formatter: function () {
                return storageCapacity + ' GB';
              }
            }
          }
        }
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
  padding: 8px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.technical-grid {
  --ion-grid-padding: 8px;
  --ion-grid-column-padding: 8px;
  height: 100%;
}

.metrics-row,
.system-health-row,
.api-traffic-row {
  height: calc(33.33vh - 16px);
  margin-bottom: 16px;
}

.chart-col {
  height: 100%;
  padding: 8px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-color-medium-shade);
}

.chart-card-icon {
  font-size: 1.25rem;
  color: var(--ion-color-primary);
  padding: 6px;
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 6px;
}

.chart-card-content {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storage-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
}

.storage-gauge {
  flex: 1;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storage-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
}

.storage-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.storage-total,
.storage-used,
.storage-free {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.storage-icon {
  font-size: 1.25rem;
  color: var(--ion-color-primary);
  padding: 0.25rem;
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 6px;
}

.storage-info-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.storage-info-text .label {
  font-size: 0.75rem;
  color: var(--ion-color-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.storage-info-text .value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.storage-breakdown {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .metrics-row,
  .system-health-row,
  .api-traffic-row {
    height: auto;
    min-height: 300px;
  }

  .chart-col {
    margin-bottom: 16px;
  }

  .storage-info {
    min-height: 300px;
  }
}
</style>