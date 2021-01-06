<template>
  <div id="index">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center relative">
          <dv-decoration-10 style="width:33.3%;height:.0625rem;" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:2.5rem;height:.625rem;" />
            <div class="title">
              <span class="title-text">15届04次市人大数智平台</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width:3.5rem;height:.1rem;"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width:2.5rem;height:.625rem;"
            />
          </div>
          <div class="absolute time">{{currtime}}</div>
          <dv-decoration-10 style="width:33.3%;height:.0625rem; transform: rotateY(180deg);" />
        </div>

        <!-- 第二行 -->
        <!-- <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="width: 6.25rem; text-align: left;background-color: #0f1325;"
            >
              <span class="react-before"></span>
              <span class="text">北京市人大议案建议</span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue">会上数据分析</span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">15届04次</span>
            </div>
            <div
              class="react-left mr-7"
              style="width: 10rem; background-color: #0f1325; text-align: right;"
            >
              <span class="react-after"></span>
              <span class="text">{{currtime}}</span>
            </div>
          </div>
        </div>-->

        <div class="main">
          <col1 />
          <col2 />
          <col3 />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import col1 from "@/views/col-1";
import col2 from "@/views/col-2";
import col3 from "@/views/col-3";
export default {
  data() {
    return {
      loading: true,
      currtime: ""
    };
  },
  components: {
    col1,
    col2,
    col3
  },
  mounted() {
    this.cancelLoading();
    // 定时刷新当前时间
    this.currentTime();
  },
  methods: {
    getTime: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.currtime =
        yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      setInterval(this.getTime, 500);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";
.main {
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  top: 20px;
  right: 40px;
  color: cyan;
  font-size: 20px;
}
</style>