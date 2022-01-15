# 安装Husky
> Git hooks 管理工具
# 安装
```sh
yarn add husky -D
npm install husky -D
```

# 使用
```sh
npm set script prepare "husky install"
npm run prepare
```
# 添加hook
```
npx husky add .husky/commit-msg "npm test"
```