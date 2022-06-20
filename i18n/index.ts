import zhCN from './zh_cn'
import en from './en'
import zhTW from './zh_tw'

const i18n = () => {
    var lang = uni.getLocale();
    if (lang === 'zh-Hans') {
        return zhCN
    } else if (lang === 'zh-Hant') {
		return zhTW
	} else {
        return en
    }
}

export default i18n