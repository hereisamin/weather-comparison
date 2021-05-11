<template>
  <div class="mt-10">
    <p class="text-blue-800 font-bold select-none">Time Bar</p>
    <div>
      <label for="range" class="text-blue-700 text-sm p-2 select-none">From: {{ times[0] }}</label>
      <input id="range"  type="range" min="0" :max="times.length-1" step="1" v-model="rangeVal" class="w-1/2 h-5 rounded-lg rangeInput cursor-pointer overflow-hidden appearance-none bg-blue-300 h-4 w-128 shadow-md"  />
      <span class="text-blue-700 text-sm p-2 select-none">To: {{ times[(times.length-1)] }}</span>
    </div>
    <div class="flex justify-center mt-7">
      <div class="bg-gray-100 w-1/2 p-3 rounded-md shadow-sm place-items-center">
        <span class="text-blue-800 font-bold text-lg select-none">{{ times[rangeVal] }}</span>
      </div>
    </div>
      <div class="grid grid-cols-2 gap-1 mt-7">
        <div><weather-card v-if="temps.first"   :city="cities[0]" :temp="temps.first[rangeVal]" :temps="temps.first" /></div>
        <div><weather-card v-if="temps.second"  :city="cities[1]" :temp1="temps.second[rangeVal]" :temps="temps.second" :select="select" /></div>
      </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/weatherCard";
export default {
  name: "rangeBar",
  components: {WeatherCard},
  props:{
    cities:Array,
    times:Array,
    temps:Array,
  },
  data(){
    return {
    rangeVal : 0,
      select : true,
    }
  },
  methods:{
  },
  computed: {
    firstSelectedTemp: function () {
      return this.temps.first[this.rangeVal]
    },
    secondSelectedTemp: function () {
      return this.temps.second[this.rangeVal]
    }
  }
}
</script>

<style scoped>
  .rangeInput:focus{
    outline: none;
  }
  .rangeInput::-webkit-slider-thumb{
    width: 20px;
    box-shadow: black ;
    border: 2px solid dodgerblue;
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    cursor: pointer;
    background: #FFF;
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 100%;
  }
</style>
