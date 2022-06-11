import list from '../test/list'

const FirstLoad = (): void => {
	uni.getStorage({
		key: 'todo',
		fail: (res: unknown): void => {
			uni.setStorage({
				key: 'todo',
				data: list
			})
		}
	})
}

export default FirstLoad