import Calendar from './Calendar'

export default class DateUtil {
  /**
   * 将日期格式化为指定格式
   * @param date
   * @param fmt
   * @returns {*|string}
   */
  static format(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = date === undefined ? new Date() : date
    date = typeof date === 'number' ? new Date(date) : date
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
    var obj =
      {
        'y': date.getFullYear(), // 年份，注意必须用getFullYear
        'M': date.getMonth() + 1, // 月份，注意是从0-11
        'd': date.getDate(), // 日期
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'w': date.getDay(), // 星期，注意是0-6
        'H': date.getHours(), // 24小时制
        'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
        'm': date.getMinutes(), // 分钟
        's': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
      }
    var week = ['天', '一', '二', '三', '四', '五', '六']
    for (var i in obj) {
      fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
        var val = obj[i] + ''
        if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
        for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
        return m.length === 1 ? val : val.substring(val.length - m.length)
      })
    }
    return fmt
  }

  static parseDate(text, format) {
    return new Date(Date.parse(text.replace(/-/g, '/')))
  }

  static parseDatePiker(text, format) {
    var newValue = text.replace(/-/g, '')
    if (+newValue && newValue.length > 7) {
      var year = +newValue.substr(0, 4)
      var month = +newValue.substr(4, 2)
      var day = +newValue.substr(6, 2)
      return new Date(Date.UTC(year, month - 1, day))
    } else {
      return new Date()
    }
  }


  static getFirstDayOfMonth(date) {
    const temp = new Date(date.getTime())
    temp.setDate(1)
    return temp.getDay()
  }

  static isDateObject(val) {
    return val instanceof Date
  }

  static getDayCountOfMonth(year, month) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30
    }

    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29
      } else {
        return 28
      }
    }

    return 31
  }

  static getWeekNumber(src) {
    const date = new Date(src.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
  }

  static getStartDateOfMonth(year, month) {
    const result = new Date(year, month, 1)
    const day = result.getDay()

    if (day === 0) {
      return DateUtil.prevDate(result, 7)
    } else {
      return DateUtil.prevDate(result, day)
    }
  }

  static prevDate(date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount)
  }

  static nextDate = function (date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
  }

  static addDate = function (date, amount = 1) {
    date.setDate(date.getDate() + amount);
    return date;
  }

  static addYear = function (date, amount = 1) {
    const year = date.getFullYear()
    const month = date.getMonth()
    return DateUtil.changeYearMonthAndClampDate(date, year + amount, month)
  }

  static addMonth = function (date, amount = 1) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return DateUtil.changeYearMonthAndClampDate(date, year + parseInt((month + amount) / 11), parseInt((month + amount) % 11))
  }

  static isDate(date) {
    if (date === null || date === undefined) return false
    if (isNaN(new Date(date).getTime())) return false
    return true
  }

  static range = function (n) {
    // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
    return Array.apply(null, { length: n }).map((_, n) => n)
  }

  static modifyDate = function (date, y, m, d) {
    return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
  }

  static modifyTime = function (date, h, m, s) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, date.getMilliseconds())
  }

  static clearTime = function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  static prevYear(date, amount = 1) {
    return DateUtil.addYear(date, amount * -1)
  }

  static nextYear = function (date, amount = 1) {
    return DateUtil.addYear(date, amount)
  }

  static changeYearMonthAndClampDate = function (date, year, month) {
    // clamp date to the number of days in `year`, `month`
    // eg: (2010-1-31, 2010, 2) => 2010-2-28
    const monthDate = Math.min(date.getDate(), DateUtil.getDayCountOfMonth(year, month))
    return DateUtil.modifyDate(date, year, month, monthDate)
  }

  static prevMonth = function(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return month === 0
      ? DateUtil.changeYearMonthAndClampDate(date, year - 1, 11)
      : DateUtil.changeYearMonthAndClampDate(date, year, month - 1);
  }

  static nextMonth = function (date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    return month === 11
      ? DateUtil.changeYearMonthAndClampDate(date, year + 1, 0)
      : DateUtil.changeYearMonthAndClampDate(date, year, month + 1)
  }

  static getDayCountOfYear = function (year) {
    const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
    return isLeapYear ? 366 : 365
  }

  static solarDate() {
    let solar = Calendar.solar2lunar()
    return solar.gzYear + '年' + solar.IMonthCn + solar.IDayCn
  }

  static monthConvertYear(value){
    let year = value / 12
    if (Math.round(year) === year) {
      return year + '年'
    }
    return value + '个月'
  }

  static formatUnit(value){
    if (!value) {
      return ''
    } else if (value === '月') {
      return '个月'
    } else {
      return value
    }
  }
}
