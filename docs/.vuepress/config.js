module.exports = {
	title: "Peter's Blog",
	description: "勤读立耕 立己达人",
	themeConfig: {
		search: true,
		repo: 'peterzhangxr/blog',
		nav: [
			{ text: '首页', link: '/'},
			{ text: 'JS基础', link: '/js/'},
			{ text: 'HTML', link: '/html/'},
			{ text: 'CSS', link: '/css/'},
			{ text: 'Vue', link: '/vuejs/'},
			{ text: 'React', link: '/react/'},
			{ text: 'MySQL', link: '/mysql/'},
			{ text: 'PHP', link: '/php/'},
			{ text: 'Python', link: '/python/'},
			{ text: 'Android', link: '/android/'},
			{ text: 'HTTP', link: '/http/'},
			{ text: 'Redis', link: '/redis/'},
			{ text: '数据结构与算法', link: '/algorithm/'},
			{ text: '工程化', link: '/project/'},

		],
		sidebar: {
			'/vuejs/': [
				'组件间通信'
			],
			'/project/': [
				'husky',
			]
		}
	}
}