<template>
    <div 
      class="kpi-card" 
      :class="[`theme-${theme}`, { 'pulse-animation': pulse }]"
      @mouseenter="pulse = true"
      @mouseleave="pulse = false"
    >
      <div class="card-header">
        <div class="icon-container">
          <ion-icon :icon="icon" class="card-icon"></ion-icon>
        </div>
        <h3 class="card-title">{{ title }}</h3>
      </div>
      
      <div class="card-value">{{ value }}</div>
      
      <div class="card-trend" :class="trendClass">
        <span class="trend-arrow">{{ trendArrow }}</span>
        <span class="trend-value">{{ Math.abs(trend) }}%</span>
      </div>
      
      <div class="card-footer">
        <span class="card-description">{{ description }}</span>
      </div>
      
      <div class="progress-bar">
        <div class="progress-fill" :style="progressStyle"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { computed, ref } from 'vue';
  
  const props = defineProps({
    title: { type: String, required: true },
    value: { type: String, required: true },
    trend: { type: Number, required: true },
    description: { type: String, required: true },
    icon: { type: Object, required: true },
    theme: { type: String, default: 'blue' },
    reverseTrend: { type: Boolean, default: false }
  });
  
  const pulse = ref(false);
  
  const trendArrow = computed(() => {
    if (props.trend > 0) return '↑';
    if (props.trend < 0) return '↓';
    return '→';
  });
  
  const trendClass = computed(() => {
    const isPositive = props.reverseTrend ? props.trend < 0 : props.trend > 0;
    const isNegative = props.reverseTrend ? props.trend > 0 : props.trend < 0;
    
    return {
      'trend-positive': isPositive,
      'trend-negative': isNegative,
      'trend-neutral': props.trend === 0
    };
  });
  
  const progressStyle = computed(() => {
    const percentage = Math.min(Math.abs(props.trend) * 2, 100);
    return { width: `${percentage}%` };
  });
  </script>
  
  <style scoped>
  .kpi-card {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    overflow: hidden;
    border: 1px solid var(--ion-color-light-shade);
  }
  
  .kpi-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
  
  .pulse-animation {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .icon-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
  }
  
  .card-icon {
    font-size: 1.5rem;
  }
  
  .card-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ion-color-dark);
  }
  
  .card-value {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0.5rem 0;
    color: var(--ion-color-dark);
  }
  
  .card-trend {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .trend-positive {
    background-color: rgba(76, 175, 80, 0.15);
    color: #4CAF50;
  }
  
  .trend-negative {
    background-color: rgba(244, 67, 54, 0.15);
    color: #F44336;
  }
  
  .trend-neutral {
    background-color: rgba(255, 193, 7, 0.15);
    color: #FFC107;
  }
  
  .trend-arrow {
    margin-right: 0.25rem;
    font-weight: bold;
  }
  
  .card-footer {
    margin-top: 0.5rem;
  }
  
  .card-description {
    font-size: 0.9rem;
    color: var(--ion-color-medium);
  }
  
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--ion-color-light-shade);
  }
  
  .progress-fill {
    height: 100%;
    transition: width 1s ease-out;
  }
  
  /* Temas de colores */
  .theme-purple .icon-container,
  .theme-purple .progress-fill {
    background-color: #9C27B0;
    color: white;
  }
  
  .theme-blue .icon-container,
  .theme-blue .progress-fill {
    background-color: #2196F3;
    color: white;
  }
  
  .theme-green .icon-container,
  .theme-green .progress-fill {
    background-color: #4CAF50;
    color: white;
  }
  
  .theme-orange .icon-container,
  .theme-orange .progress-fill {
    background-color: #FF9800;
    color: white;
  }
  
  .theme-red .icon-container,
  .theme-red .progress-fill {
    background-color: #F44336;
    color: white;
  }
  
  .theme-teal .icon-container,
  .theme-teal .progress-fill {
    background-color: #009688;
    color: white;
  }
  
  .theme-yellow .icon-container,
  .theme-yellow .progress-fill {
    background-color: #FFEB3B;
    color: var(--ion-color-dark);
  }
  
  .theme-indigo .icon-container,
  .theme-indigo .progress-fill {
    background-color: #3F51B5;
    color: white;
  }
  </style>