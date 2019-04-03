import Vue from 'vue';
import DateUtil from 'util/DateUtil.js'
import NumberUtil from '../util/NumberUtil.js'
/**
 * 过滤器定制
 */
export default class Filter {
  static init() {
    Vue.filter('fmt', function (value, format) {
      if (!value && value !== 0) return '';
      if (value instanceof Date) {
        return DateUtil.format(value, format);
      } else if (typeof value === 'number') {
        return NumberUtil.format(value, format);
      }
      return value;
    });
  }
}
