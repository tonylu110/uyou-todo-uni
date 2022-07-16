const copyText = 'Copy successfully'
const settingTitle = 'Setting'
const setLangText = 'Auto'
const updateText = 'Update'

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

export default {
	list,
	copyText,
	settingTitle,
	setLangText,
	updateText
}