import i18n from '../i18n'

const FirstLoad = (): void => {
	uni.getStorage({
		key: 'todo',
		fail: (res: unknown): void => {
			uni.setStorage({
				key: 'todo',
				data: i18n().list
			})
		}
	})
}

export default FirstLoad