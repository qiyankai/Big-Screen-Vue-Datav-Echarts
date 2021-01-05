<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="chart-pie"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">数据情况雷达图</span>
          <dv-decoration-1
            style="
              width: 1.25rem;
              height: 0.25rem;
              position: relative;
              top: -0.0375rem;
            "
          />
        </div>
      </div>
      <div class="d-flex jc-center">
        <centreLeft2Chart />
        <!-- <dv-active-ring-chart :config="config" style="height:2.75rem;width:2.75rem" /> -->
        <!-- <dv-active-ring-chart
          ref="ring"
          :config="config"
          style="height: 2.75rem; width: 2.75rem"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import centreLeft2Chart from "@/components/echart/centerLeft2/centreLeft2Chart";
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "全部",
            value: 1315,
          },
        ],
        color: ["#00baff", "#3de7c9", "#fff", "#ffc530", "#469f4b"],
        lineWidth: 20,
        radius: "55%",
        activeRadius: "60%",
        digitalFlopStyle: {
          fontSize: 15,
        },
        showOriginValue: true,
      },
    };
  },
  components: {
    centreLeft2Chart,
  },
  mounted() {
    this.changeTiming();
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        // this.fetchSubjectSum(); //获取-主题词
      }, 3000);
    },
    async fetchSubjectSum() {
      const { data } = await this.$http.get("getDataByName?name=SUBJECT_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        let resultList = new Array();
        for (let index = 0; index < dataList.length; index++) {
          const element = dataList[index];
          let item = {
            name: "收费站",
            value: 1315,
          };
          item.name = element.X0;
          item.value = element.COUNT;
          resultList.push(item);
        }
        console.log(resultList)
        this.config.data = resultList;
        this.$refs.ring.mergeConfig();
        this.$refs.ring.setRingOption();
      }
    },
  },
};
</script>

<style lang="scss">
#centreLeft1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
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