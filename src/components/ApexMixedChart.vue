<template>
  <div class="chart-container">
    <apexchart
      :options="computedChartOptions"
      :series="series"
      height="100%"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import apexchart from 'vue3-apexcharts'; // Asegúrate de que el import sea 'apexchart' y no 'vapexChart'

const props = defineProps({
  series: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    default: 'line'
  },
  labels: { // Esta prop se podría usar para etiquetas explícitas del eje X
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => []
  },
  strokeWidth: {
    type: Array,
    default: () => [2] // Valor por defecto de 2 para el grosor de línea si no se especifica
  },
  yTitle: {
    type: String,
    default: ''
  },
  xTitle: {
    type: String,
    default: ''
  },
  chartOptions: { // Propiedad para fusionar opciones adicionales
    type: Object,
    default: () => ({})
  }
});

const computedChartOptions = computed(() => {
  let xaxisConfig: any = {};

  // Determinar el tipo de eje X dinámicamente
  // 1. Si se pasan 'labels' explícitamente (ej. para un gráfico de barras como ErrorDistributionChart)
  if (props.labels && props.labels.length > 0) {
    xaxisConfig = {
      type: 'category',
      categories: props.labels,
      title: { text: props.xTitle }
    };
  }
  // 2. Si la serie tiene la estructura { x: '...', y: ... } (ej. responseTimeSeries, concurrentUsersSeries)
  else if (
    props.series &&
    props.series.length > 0 &&
    props.series[0].data &&
    Array.isArray(props.series[0].data) &&
    props.series[0].data.every((item: any) => typeof item === 'object' && 'x' in item)
  ) {
    xaxisConfig = {
      type: 'category', // Usamos 'category' para strings como '09:00' o 'Lunes'
      categories: props.series[0].data.map((item: any) => item.x),
      title: { text: props.xTitle }
    };
  }
  // 3. Por defecto, asumir 'datetime' si no se ajusta a los anteriores
  else {
    xaxisConfig = {
      type: 'datetime', // Mantener 'datetime' como fallback si se esperan fechas/horas reales
      title: { text: props.xTitle }
    };
  }

  return {
    chart: {
      type: props.type,
      height: '100%', // Usar '100%' para que el gráfico se ajuste al contenedor
      toolbar: {
        show: true
      },
      animations: { // Propiedades de animaciones de TechnicalChartCard
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      zoom: { // Zoom para líneas
        enabled: props.type === 'line'
      }
    },
    stroke: {
      width: props.strokeWidth,
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        horizontal: props.type === 'bar' && (props.chartOptions?.plotOptions?.bar?.horizontal || false),
        columnWidth: '50%',
        borderRadius: 4,
        distributed: true // Esto es importante para que ErrorDistributionChart use los colores individuales
      }
    },
    colors: props.colors.length ? props.colors : undefined,
    fill: {
      opacity: [0.85, 0.25, 1], // Ajusta la opacidad para el área o relleno
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    // labels: props.labels, // Las etiquetas ahora se manejan en xaxis.categories
    markers: {
      size: 4, // El tamaño de los marcadores en las líneas
      hover: {
        size: 6
      }
    },
    xaxis: xaxisConfig, // Configuración dinámica del eje X
    yaxis: {
      title: {
        text: props.yTitle
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: number) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + (props.yTitle ? ' ' + props.yTitle : '');
          }
          return y;
        }
      }
    },
    grid: {
      borderColor: '#e9ecef', // Asegura un color de grid visible
      strokeDashArray: 4, // Añade un patrón de puntos al grid
    },
    // Fusiona cualquier opción adicional pasada por el componente padre
    ...props.chartOptions
  };
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  /* Eliminar o ajustar el background si el chart tiene su propio fondo transparente */
  background: white; /* Cambiado de var(--ion-color-light) a blanco para evitar opacidad */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra más suave */
}
</style>