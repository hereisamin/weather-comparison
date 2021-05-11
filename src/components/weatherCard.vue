<template>
  <div class="flex items-center justify-center select-none">
    <div class="flex flex-col bg-white rounded p-7 w-full max-w-xs">
      <div v-if="select" class="font-bold text-xl text-chartColor-second ">{{ city }}</div>
      <div v-else class="font-bold text-xl text-chartColor-first ">{{ city }}</div>
      <div class="mt-6 self-center inline-flex items-center justify-center">
          <canvas v-if="select" class="chartjs1-gauge"/>
          <canvas v-else class="chartjs-gauge"/>
      </div>
      <div class="flex flex-row items-center justify-center mt-6">
        <template v-if="temp || temp1" >
          <div v-if="select" class="font-medium text-6xl text-chartColor-second">{{ temp1 }}°</div>
          <div v-else class="font-medium text-6xl text-chartColor-first">{{ temp }}°</div>
        </template>
        <template v-else >
          <div v-if="select" class="font-medium text-6xl text-chartColor-second">N/A°</div>
          <div v-else class="font-medium text-6xl text-chartColor-first">N/A°</div>
        </template>
        <div class="flex flex-col items-center ml-6">
          <div class="mt-1">
            <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
            <span class="text-sm font-light text-gray-500">min: {{ max }}</span>
          </div>
          <div>
            <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
            <span class="text-sm font-light text-gray-500">max: {{ min }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "weatherCard",
  components: {},
  props:{
    select:Boolean,
    city:String,
    temp:Number,
    temp1:Number,
    temps :Array
  },
  mounted() {
  if (this.temp){
    this.showGauge(this.temp, 0)
  }
  if (this.temp1){
    this.showGauge(this.temp1, 1)
  }
  },
  computed: {
    min: function () {
      return Math.max.apply(Math, this.temps);
    },
    max: function () {
      return Math.min.apply(Math, this.temps);
    }
  },
  methods:{
  showGauge(val, element){
    var tem = 40 - val;
    var rest = 80 - tem;
    if (element){
      var ctx = document.getElementsByClassName("chartjs1-gauge");
    }else{
      var ctx = document.getElementsByClassName("chartjs-gauge");
    }
    var chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["-40°", "+40°"],
        datasets: [{
          weight:0.1,
          label: "Temperature",
          data: [tem, rest],
          backgroundColor: [
            "rgb(54, 162, 235, 0.6)",
            "rgb(255, 205, 86, 0.6)",
          ]
        }]
      },
      options: {
        animation:{
          animateRotate:false,
        },
        circumference: 0.5*Math.PI,
        rotation: 0.5*Math.PI,
        cutoutPercentage: 10, // precent
        plugins: {
          datalabels: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: '#ffffff',
          }
        },
        legend: {
          display: true
        },
      }
    });
  },
  },
  watch: {
    temp : function (val) {
      this.showGauge(val, 0)
    },
    temp1 : function (val) {
      this.showGauge(val, 1)
    },
  }
}
</script>

<style scoped>

</style>
