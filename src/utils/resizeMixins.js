// 混入代码 resize-mixins.js
import { debounce } from '@/utils/index';
const resizeChartMethod = '$__resizeChartMethod';

export default {
  data() {
    // 在组件内部将图表init的引用映射到chart属性上
    return {
      chart: null,
    };
  },
  created() {
    window.addEventListener('resize', this[resizeChartMethod], false);
  },
  beforeDestroy() {
    window.removeEventListener('reisze', this[resizeChartMethod]);
  },
  methods: {
    // 通过lodash的防抖函数来控制resize的频率
    [resizeChartMethod]: debounce(function() {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100),
  },
};
