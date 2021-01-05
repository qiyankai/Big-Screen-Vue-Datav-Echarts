<template>
  <div id="centreRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2">建议分配系统分析</span>
      </div>
      <div class="d-flex jc-center body-box" style="margin-top: 0">
        <dv-capsule-chart :config="config" ref="capsule" style="width: 100%; height: 4.5rem" />
        <!-- <dv-conical-column-chart :config="config" ref="capsule" style="width: 100%; height: 2rem" /> -->
        <!-- <centreLeft1Chart ref="centreLeft1Chart" /> -->

        <!-- ---------------------------------------- -->
        <!-- <centreRight2Chart1></centreRight2Chart1> -->
      </div>
    </div>
  </div>
</template>

<script>
// import centreRight2Chart1 from "@/components/echart/centreRight2/centreRight2Chart1";
// import centreLeft1Chart from "@/components/echart/centerLeft2/centreLeft1Chart";

export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "市检察院",
            value: 12,
          },
          {
            name: "市高法",
            value: 213,
          },
          {
            name: "市政府系统",
            value: 222,
          },
          {
            name: "市委系统",
            value: 331,
          },
          {
            name: "市人大系统",
            value: 22,
          },{
            name: "中央垂直管理单位",
            value: 22,
          },
        ],
        unit: "件",
        showValue:true
      },
    };
  },
  components: {
    // centreLeft1Chart,
    // centreRight2Chart1,
  },
  mounted() {
    this.setTimer();
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.fetchProposalSubmit(); //获取-系统情况分析数据
        // this.fetchSystemSum(); //获取-系统情况分析数据
      }, 3000);
    },
    async fetchSystemSum() {
      const { data } = await this.$http.get("getDataByName?name=SYSTEM_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        this.$refs.centreLeft1Chart.refresh(dataList);
      }
    },
    async fetchProposalSubmit() {
      const { data } = await this.$http.get("getDataByName?name=SYSTEM_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      var dataRes = new Array();
      if (status === 200) {
        for (var i = dataList.length - 1; i >= 0; i--) {
          var item = {
            name: "西峡",
            value: 98,
          };
          item.name = dataList[i].X0;

          item.value = dataList[i].COUNT;
          dataRes.push(item);
        }
        this.config.data = dataRes;
        this.$refs.capsule.calcData();
      }
    },
  },
};
</script>

<style lang="scss">
#centreRight2 {
  padding: 0.0625rem;
  height: 5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    padding: 0.0625rem;
    height: 5.0625rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>