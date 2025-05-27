<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🎯 KPIs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🎯 KPIs</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Sección de KPIs de Negocio -->
      <section class="kpi-section">
        <h2 class="section-title">
          <ion-icon :icon="rocketOutline" class="section-icon"></ion-icon>
          KPIs de Negocio
        </h2>
        <div class="kpi-grid">
          <KpiCard 
            v-for="kpi in businessKpis" 
            :key="kpi.title"
            :title="kpi.title"
            :value="kpi.value"
            :trend="kpi.trend"
            :description="kpi.description"
            :icon="kpi.icon"
            :theme="kpi.theme"
          />
        </div>
      </section>

      <!-- Sección de KPIs Técnicos -->
      <section class="kpi-section">
        <h2 class="section-title">
          <ion-icon :icon="speedometerOutline" class="section-icon"></ion-icon>
          KPIs Técnicos
        </h2>
        <div class="kpi-grid">
          <KpiCard 
            v-for="kpi in techKpis" 
            :key="kpi.title"
            :title="kpi.title"
            :value="kpi.value"
            :trend="kpi.trend"
            :description="kpi.description"
            :icon="kpi.icon"
            :theme="kpi.theme"
            :reverse-trend="kpi.reverseTrend"
            :is-storage-kpi="kpi.isStorageKpi"
            :storage-percentage="kpi.storagePercentage"
          />
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/vue';
import { rocketOutline, speedometerOutline, cashOutline, peopleOutline, cartOutline, timerOutline, serverOutline, bugOutline, statsChartOutline } from 'ionicons/icons';
import { ref } from 'vue';
import KpiCard from '@/components/KpiCard.vue';

const businessKpis = ref([
  {
    title: 'Total de ventas',
    value: '12.432 €',
    trend: 5.2,
    description: '+1.250 € vs mes anterior',
    icon: cashOutline,
    theme: 'purple'
  },
  {
    title: 'Usuarios activos',
    value: '1.124',
    trend: 8.7,
    description: 'Nuevos registros: 145',
    icon: peopleOutline,
    theme: 'blue'
  },
  {
    title: 'Pedidos completados',
    value: '987',
    trend: 3.4,
    description: 'Tasa de éxito: 98.5%',
    icon: cartOutline,
    theme: 'green'
  },
  {
    title: 'Abandono carrito',
    value: '23%',
    trend: -2.1,
    description: 'Mejorando mes a mes',
    icon: statsChartOutline,
    theme: 'orange'
  }
]);

const techKpis = ref([
  {
    title: 'Almacenamiento',
    value: '1.2 TB',
    trend: 75,
    description: 'Espacio utilizado: 75%',
    icon: serverOutline,
    theme: 'blue',
    isStorageKpi: true,
    storagePercentage: 75
  },
  {
    title: 'Tiempo de carga',
    value: '1.8s',
    trend: -15,
    description: 'Optimización reciente',
    icon: timerOutline,
    theme: 'red',
    reverseTrend: true
  },
  {
    title: 'Disponibilidad',
    value: '99.95%',
    trend: 0.1,
    description: 'Tiempo operativo',
    icon: serverOutline,
    theme: 'teal'
  },
  {
    title: 'Errores críticos',
    value: '3',
    trend: -50,
    description: 'Reducción importante',
    icon: bugOutline,
    theme: 'yellow',
    reverseTrend: true
  },
  {
    title: 'Peticiones API',
    value: '1.2M',
    trend: 12,
    description: 'Aumento de tráfico',
    icon: statsChartOutline,
    theme: 'indigo'
  }
]);
</script>

<style scoped>
.kpi-section {
  margin-bottom: 2.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  color: var(--ion-color-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--ion-color-light-shade);
}

.section-icon {
  margin-right: 0.75rem;
  font-size: 1.8rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>