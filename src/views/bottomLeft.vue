<template>
  <div id="bottomLeft">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">数据统计图</span>
        </div>
      </div>
      <div>
        <bottomLeftChart ref="bottomLeftChartState"/>
        <!-- <bottomLeftChartState ref="bottomLeftChartState" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import bottomLeftChart from "@/components/echart/bottom/bottomLeftChart";
// import bottomLeftChartState from "@/components/echart/bottom/bottomLeftChartState";
export default {
  data() {
    return {};
  },
  components: {
    bottomLeftChart,
    // bottomLeftChartState,
  },
  mounted() {
    this.changeTiming();

  },
  methods: {
        changeTiming() {
      setInterval(() => {
        this.fetchSystemSum(); //获取-状态
      }, 3000);
    },
    async fetchSystemSum() {
      const { data } = await this.$http.get("getDataByName?name=GROUP_HAN_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        this.$refs.bottomLeftChartState.refresh(dataList);
      }
    },
  },
};
</script>

<style lang="scss">
#bottomLeft {
  padding: 0.3rem 0.2rem;
  height: 6.5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 6.0625rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
}
</style>