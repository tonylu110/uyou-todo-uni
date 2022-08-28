const copyText = '复制成功'
const settingTitle = '设置'
const setLangText = '跟随系统'
const updateText = '更新'
const newVersion = '新版本：'
const loginText = '未登录'
const myAccount = '我的账号'
const clearData = '清除数据'

const listMenu = {
    cate: '分类',
    completed: '已完成',
    incompleted: '未完成'
}

const accountPage = {
    account: '账号',
    passwd: '密码',
    login: '登录',
    register: '注册',
    autoSync: '自动同步',
    logout: '退出登录',
    alertNoAnP: '请输入账号和密码',
    syncData: '同步数据',
    syncSuccess: '同步成功',
    syncFail: '同步失败',
    loginError: '登录失败',
    alertTitle: '提示'
}

const list = [
    {
        text: '欢迎使用 uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: '将 ToDo 项往右拖动，完成 ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: '将 ToDo 项往左拖动，删除 ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: '长按 ToDo 项，即可复制 ToDo 内容',
        id: new Date().getTime() + 4,
        ok: false
    }
]

const update = {
    autoUpdate: '自动获取更新',
    updateTitle: '软件更新',
    notUpdate: '暂无更新',
    checkingUpdate: '检查更新中...',
    checkUpdate: '检查更新',
    gotoUpdate: '前往更新',
    updateLog: '更新日志：'
}

const otherList = {
    toWeb: '前往官网',
    toDesk: '桌面版',
    toDonate: '捐赠'
}

export default {
	list,
	copyText,
	settingTitle,
	setLangText,
	updateText,
	newVersion,
	accountPage,
	loginText,
	myAccount,
	listMenu,
	clearData,
	update,
	otherList
}