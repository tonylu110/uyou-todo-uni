const copyText = '複製成功'

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
	copyText
}