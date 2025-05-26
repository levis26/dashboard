<template>
    <VEChart class="map-chart" :option="mapOptions" autoresize />
  </template>
  
  <script setup lang="ts">
  import { ref, watchEffect, onMounted } from 'vue';
  import { use } from 'echarts/core';
  import VEChart from 'vue-echarts';
  import { MapChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { TooltipComponent, VisualMapComponent, TitleComponent, ToolboxComponent } from 'echarts/components';
  import * as echarts from 'echarts';
  
  // Importación directa del JSON
  import europeGeoJson from '@/assets/europe.geo.json';
  
  use([MapChart, CanvasRenderer, TooltipComponent, VisualMapComponent, TitleComponent, ToolboxComponent]);
  
  const props = defineProps<{
    title?: string;
    subtitle?: string;
    data: { name: string; value: number }[];
    mapName?: string;
  }>();
  
  const mapOptions = ref({});
  
  onMounted(() => {
    if (props.mapName === 'europe') {
      echarts.registerMap("europe", europeGeoJson, {
        Iceland: {
          left: -20,
          top: 65,
          width: 12
        }
      });
    }
  });
  
  watchEffect(() => {
    mapOptions.value = {
      title: {
        text: props.title,
        subtext: props.subtitle,
        left: "left",
        textStyle: {
          color: "#8C8C8C",
          fontSize: 16,
          fontWeight: "bold"
        },
        subtextStyle: {
          color: "#8C8C8C",
        },
      },
      toolbox: {
        show: true,
        left: 'right',
        top: 'top',
        feature: {
          dataView: {
            readOnly: false,
            backgroundColor: "#1E1E1E",
            textareaColor: "#1E1E1E",
            textColor:"#8C8C8C",
            buttonColor:"#071c49",
            lang: ['Datos', 'Cerrar', 'Actualizar'],
          },
          restore: {},
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: "item",
        formatter: params => {
          return `${params.name}<br/>${params.seriesName}: ${params.value}`;
        }
      },
      visualMap: {
        min: Math.min(...props.data.map(item => item.value)),
        max: Math.max(...props.data.map(item => item.value)),
        left: "left",
        top: "bottom",
        text: ["Más", "Menos"],
        textStyle: { color: "#B9B8CE" },
        calculable: true,
        inRange: { 
          color: ["#e0f3f8", "#74add1", "#4575b4"] 
        },
        outOfRange: {
          color: ['rgba(200, 200, 200, 0.2)']
        }
      },
      series: [
        {
          name: "Expansión",
          type: "map",
          map: props.mapName || "europe",
          roam: true,
          emphasis: {
            label: { show: true },
            itemStyle: {
              areaColor: '#74add1',
              borderWidth: 1
            }
          },
          itemStyle: {
            areaColor: 'rgba(128, 128, 128, 0.5)',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 0.5
          },
          data: props.data,
        },
      ],
    };
  });
  </script>
  
  <style scoped>
  .map-chart {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
  </style>