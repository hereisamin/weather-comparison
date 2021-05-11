<template>
  <div class="container max-w-screen-lg min-h-screen mt-5 mb-5 bg-blue-200 rounded-lg shadow-lg p-7">
    <head-content/>
    <select-section :stations="stations"/>
  </div>
</template>

<script>

import HeadContent from "@/components/headContent";
import SelectSection from "@/components/selectSection";
export default {
  name: 'App',
  components: {
    SelectSection,
    HeadContent
  },
  data(){
    return {
      isLoading: false,
      stations : [
        { name: 'Uppsala',    lat:59.86,  lon:17.64},
        { name: 'Umeå',       lat:63.8,   lon:20.26},
        { name: 'Stockholm',  lat:59.33,  lon:18.06},
        { name: 'Lund',       lat:55.7,   lon:13.12},
        { name: 'Kiruna',     lat:67.967, lon:20.309},
      ],
    }
  },
}
</script>

