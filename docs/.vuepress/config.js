const fs = require('fs')
const path = require('path')
const sidebar = {}
const files = fs.readdirSync(path.resolve(__dirname, '../'))
files.forEach((dir) => {
	if (dir !== '.vuepress' && dir != 'README.md') {
		const tempPath = `/${dir}/`
		const subFiles = fs.readdirSync(path.resolve(__dirname, '../' + dir))
		subFiles.forEach((file) => {
			if (file != 'index.md') {
				if (!sidebar[tempPath]) {
					sidebar[tempPath] = []
				}
				sidebar[tempPath].push(file.substr(0, file.length - 3))
			}
		})
	} 
})
console.log(sidebar)

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
			{ text: 'NodeJS', link: '/nodejs/'},
			{ text: 'Python', link: '/python/'},
			{ text: 'Android', link: '/android/'},
			{ text: 'HTTP', link: '/http/'},
			{ text: 'Redis', link: '/redis/'},
			{ text: '数据结构与算法', link: '/algorithm/'},
			{ text: '工程化', link: '/project/'},

		],
		sidebar: sidebar 
	}
}