<template>
  <select @change="emitData" v-model="chosenData" class="w-1/3 h-8 rounded-md cursor-pointer">
    <option value="Select City" disabled selected > Select City </option>
    <template v-for="(station, index) in stations" >
      <option v-if=" station.name == disabled " disabled :value="station.name" > {{ station.name }} </option>
      <option v-else :value="station.name" > {{ station.name }} </option>
    </template>
  </select>
</template>

<script>
export default {
name: "selectList",
  props:{
    stations:Array,
    disabled:String,
  },
  data(){
    return{
      chosenData:'Select City',
    }
  },
  methods:{
    emitData(event){
      this.$emit('selectData', this.chosenData)
    }
  },
}
</script>

<style scoped>

</style>
