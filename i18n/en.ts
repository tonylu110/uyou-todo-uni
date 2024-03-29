const copyText = 'Copy successfully'
const settingTitle = 'Setting'
const setLangText = 'Auto'
const updateText = 'Update'
const newVersion = 'New Version: '
const loginText = 'Not logged in'
const myAccount = 'My Account'
const clearData = 'Clear Data'

const listMenu = {
    cate: 'Categories',
    completed: 'Completed',
    incompleted: 'Incompleted'
}

const accountPage = {
    account: 'Account',
    passwd: 'Password',
    login: 'Log in',
    register: 'Register',
    autoSync: 'Automatic sync',
    logout: 'Log out',
    alertNoAnP: 'Please enter account and password',
    syncData: 'Synchronous Data',
    syncSuccess: 'Sync succeeded',
    syncFail: 'Sync failed',
    loginError: 'Login failed',
    alertTitle: 'Hint'
}

const list = [
    {
        text: 'Welcome to use uyou ToDo',
        id: new Date().getTime(),
        ok: false
    },
    {
        text: 'Drag the ToDo item to the right to complete the ToDo',
        id: new Date().getTime() + 1,
        ok: false
    },
    {
        text: 'Drag the ToDo item to the left to delete the ToDo',
        id: new Date().getTime() + 3,
        ok: false
    },
    {
        text: 'Long press the ToDo item to copy the ToDo content',
        id: new Date().getTime() + 4,
        ok: false
    }
]

const update = {
    autoUpdate: 'Get Updates Automatically',
    updateTitle: 'App Update',
    notUpdate: 'No update yet',
    checkingUpdate: 'Checking for updates...',
    checkUpdate: 'Check for updates',
    gotoUpdate: 'Go to update',
    updateLog: 'Changelog:'
}

const otherList = {
    toWeb: 'Go to the official website',
    toDesk: 'Desktop version',
    toDonate: 'Donate'
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