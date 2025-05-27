<template>
    <div class="technical-chart-card">
      <div class="card-header">
        <ion-icon :icon="icon" class="card-icon"></ion-icon>
        <h3>{{ title }}</h3>
        <div class="header-actions">
          <ion-badge v-if="infoText" color="medium" class="info-badge">
            <ion-icon :icon="informationCircle"></ion-icon>
          </ion-badge>
          <ion-button fill="clear" size="small" @click="toggleRealTime">
            <ion-icon :icon="realTime ? pause : play" class="action-icon"></ion-icon>
          </ion-button>
        </div>
      </div>
      <div class="chart-container">
        <ApexMixedChart 
          :series="series" 
          :type="type" 
          :colors="colors" 
          :y-title="yTitle"
          :chartOptions="chartOptions"
        />
        <div v-if="infoText" class="info-tooltip">
          {{ infoText }}
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { defineProps, ref, computed } from 'vue';
  import ApexMixedChart from '@/components/ApexMixedChart.vue';
  import { informationCircle, pause, play } from 'ionicons/icons';
  
  const props = defineProps<{
    title: string;
    icon: string;
    series: any[];
    type: string;
    colors: string[];
    yTitle?: string;
    infoText?: string;
  }>();

  const realTime = ref(true);

  const chartOptions = computed(() => ({
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 4,
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toLocaleString();
      },
      style: {
        fontSize: '12px',
        fontWeight: 500
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 8
      }
    },
    tooltip: {
      enabled: true,
      followCursor: true,
      y: {
        formatter: function (val: number) {
          return val.toLocaleString() + (props.yTitle ? ' ' + props.yTitle : '');
        }
      }
    },
    xaxis: {
      type: 'category',
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '12px'
        }
      },
      title: {
        text: props.yTitle,
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
      title: {
        text: props.yTitle,
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        formatter: function (val: number) {
          return val.toLocaleString();
        }
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '12px'
    }
  }));

  const toggleRealTime = () => {
    realTime.value = !realTime.value;
  };
  </script>

  <style scoped>
  .technical-chart-card {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .technical-chart-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card-icon {
    font-size: 1.5rem;
    color: var(--ion-color-primary);
  }

  .action-icon {
    font-size: 1.2rem;
  }

  .chart-container {
    position: relative;
    height: 100%;
  }

  .info-tooltip {
    position: absolute;
    bottom: -2rem;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 4px;
    font-size: 0.85rem;
    text-align: center;
  }
  </style>