const copyText = '複製成功'
const settingTitle = '設定'
const setLangText = '跟隨系統'
const updateText = '更新'
const newVersion = '新版本：'
const loginText = '未登入'
const myAccount = '我的賬號'
const accountPage = {
    account: '賬號',
    passwd: '密碼',
    login: '登入',
    register: '註冊',
    autoSync: '自動同步',
    logout: '退出登入',
    alertNoAnP: '請輸入賬號和密碼',
    syncData: '同步資料',
    syncSuccess: '同步成功',
    syncFail: '同步失敗',
    loginError: '登入失敗',
    alertTitle: '提示'
}

const list = [
    {
        text: '歡迎使用 uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: '將 ToDo 項往右拖動，完成 ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: '將 ToDo 項往左拖動，刪除 ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: '長按 ToDo 項，即可複製 ToDo 內容',
        id: new Date().getTime() + 4,
        ok: false
    }
]

export default {
	list,
	copyText,
	settingTitle,
	setLangText,
	updateText,
	newVersion,
	accountPage,
	loginText,
	myAccount
}