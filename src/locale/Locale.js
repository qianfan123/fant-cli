import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'fant3/lib/locale'
import enLocale from 'fant3/lib/locale/lang/en'
import zhLocale from 'fant3/lib/locale/lang/zh-CN'


Vue.use(VueI18n)

const messages = {
  en: {
    message: require('./lang/en'),
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: require('./lang/zh'),
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}

const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
  messages,
  silentTranslationWarn: true
})
locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

export default i18n
