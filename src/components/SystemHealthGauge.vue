<!-- SystemHealthGauge.vue -->
<template>
    <div class="system-health-gauge">
      <EchartsGauge 
        :value="value" 
        :max="max" 
        :colors="[[0.7, '#4caf50'], [0.9, '#ff9800'], [1, '#f44336']]"
        :unit="unit"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import EchartsGauge from '@/components/EchartsGauge.vue';
  
  defineProps<{
    value: number;
    max: number;
    unit: string;
  }>();
  </script>