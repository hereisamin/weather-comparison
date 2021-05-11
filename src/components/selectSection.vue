<template>
  <div class="text-center mt-8">
    <loading v-if="loading"/>

    <div class="select-none">
      <h1 class="text-blue-900 text-lg font-bold mb-0">Select the City Please</h1>
      <p class="text-blue-800 text-sm mt-0">You can select one city to check or two cities to compare</p>
    </div>

    <div class="mt-4">
      <select-list :stations="stations" :disabled="cities[1]" v-on:selectData="setFirstCity"/>
      <span class="p-4 font-bold text-xl text-blue-900">VS</span>
      <select-list :stations="stations" :disabled="cities[0]" v-on:selectData="setSecondCity"/>
    </div>

    <range-bar v-if="timesData.length>0" :times="timesData" :temps="temperatures" :cities="cities"/>

    <div v-else class="p-16 bg-blue-300 text-blue-400 shadow-sm mt-10 rounded-md font-bold  ">
      <h1 class="text-3xl">Welcome To Weather Station</h1>
      <h2 class="text-xl">You Can Check and Compare Weathers Easier Now</h2>
    </div>

    <line-chart v-if="timesData.length>0"  :chart="temperatures" :time="timesData" :label="cities" class="py-7 mt-10"/>
  </div>
</template>

<script>
import axios from "axios";
import RangeBar from "@/components/rangeBar";
import LineChart from "@/components/lineChart";
import Loading from "@/components/loading";
import SelectList from "@/components/selectList";

export default {
  name: "selectSection",
  components: {SelectList, Loading, LineChart, RangeBar},
  props:{
    stations:Array,
  },
  data(){
    return {
      loading:false,
      cities:[],
      timesData:[],
      chartTemp:[],
      temperatures:[
        {first  : []},
        {second : []},
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  methods:{
    setFirstCity(value){
      this.cities[0]=value;
      this.getFromApi(value, 1)
    },
    setSecondCity(value){
      this.cities[1]=value;
      this.getFromApi(value)
    },
    async getFromApi(cityName, selectNo){
      this.loading=true;
      this.timesData=[];
      var lon=false;
      var lat=false;
      var temp=[];
      this.stations.forEach(d=>{
        if (d.name == cityName){
          lon=d.lon;
          lat=d.lat;
        }
      });
      const {data} = await axios.get('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'+lon+'/lat/'+lat+'/data.json');
      data.timeSeries.forEach(d => {
        this.timesData.push(d.validTime.slice(2, 16).replace('T', ', '));
        d.parameters.forEach(t => {
          if (t.name=="t")
            temp.push(t.values[0])
          this.chartTemp.push(t.values[0])
        });
      });
      if (selectNo){
        this.temperatures.first = temp;
      }else {
        this.temperatures.second = temp;
      }
      this.loading=false;
      //console.log('firstData: '+this.temperatures.first+' secondData: '+this.temperatures.second);
    },
  },
}
</script>

<style scoped>

</style>
