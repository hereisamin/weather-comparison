<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props:{
    label : Array,
    chart : Array,
    time : Array,
  },
  data(){
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'nearest'
        },
      },
    }
  },
  mounted() {
    this.renderChart({
      labels: this.time,
      datasets:[
          {
            label: this.label[0],
            data: this.chart.first,
            pointRadius: 0,
            backgroundColor : 'rgba(0, 0, 0, 0)',
            borderColor : 'rgb(148, 18, 18, 1)'
          },
          {
            label: this.label[1],
            data: this.chart.second,
            pointRadius: 0,
            backgroundColor : 'rgba(0, 0, 0, 0)',
            borderColor : 'rgb(20, 148, 18, 1)'
          },
      ]
    }, this.chartOptions);
  }
}
</script>

