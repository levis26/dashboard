<template>
    <div class="technical-chart-card">
      <div class="card-header">
        <ion-icon :icon="icon" class="card-icon"></ion-icon>
        <h3>{{ title }}</h3>
        <ion-badge v-if="infoText" color="medium" class="info-badge">
          <ion-icon :icon="informationCircle"></ion-icon>
        </ion-badge>
      </div>
      <ApexMixedChart 
        :series="series" 
        :type="type" 
        :colors="colors" 
        :y-title="yTitle"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import ApexMixedChart from '@/components/ApexMixedChart.vue';
  import { informationCircle } from 'ionicons/icons';
  
  defineProps<{
    title: string;
    icon: string;
    series: any[];
    type: string;
    colors: string[];
    yTitle?: string;
    infoText?: string;
  }>();
  </script>
  
  <style scoped>
  .technical-chart-card {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .card-icon {
    font-size: 1.5rem;
    color: var(--ion-color-primary);
  }
  </style>