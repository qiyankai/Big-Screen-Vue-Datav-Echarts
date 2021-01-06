<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="chart-area"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">建议提交分布</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width: 5px; height: 100%" />
          </div>
        </div>
      </div>
      <div style="flex-grow: 1;">
        <!-- <bottomRightChart /> -->
        <bottomRightChart ref="centerChart1" />
      </div>
    </div>
  </div>
</template>

<script>
// import bottomRightChart from "@/components/echart/bottom/bottomRightChart";
import bottomRightChart from "@/components/echart/bottom/bottomRightChartMap";
export default {
  data() {
    return {};
  },
  components: {
    // bottomRightChart
    bottomRightChart
  },
  mounted() {
    this.setTimer();
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.fetchProposalSubmit(); //获取-数字板数据
      }, 3000);
    },
    async fetchProposalSubmit() {
      const { data } = await this.$http.get("getDataByName?name=GROUP_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      var resultList = new Array();
      if (status === 200) {
        for (var i = dataList.length - 1; i >= 0; i--) {
          var item = { name: "怀柔区", value: 38 };
          item.name = dataList[i].X0;
          item.value = dataList[i].COUNT;
          resultList.push(item);
        }
        this.$refs.centerChart1.refresh(resultList);
      }
    }
  }
};
</script>

<style lang="scss">
#bottomRight {
  padding: 0.2rem 0 0 0.1rem;
  height: 100%;
  width: 100%;
  // height: 6.5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    display: flex;
    flex-direction: column;
    height: 100%;
    // height: 6.1875rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  } //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
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