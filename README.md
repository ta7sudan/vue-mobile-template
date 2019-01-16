# {{project}}
A Vue project template for dulu.



初始化项目后, 根据需要自行修改以下内容

* `.browserslistrc` 修改编译目标代码的浏览器兼容的支持版本
* `.gitignore` 决定是否忽略 `.env` 文件, 默认不忽略
* `.eslintrc.js` 设置允许的全局变量
* `LICENSE` 选择合适的许可证
* `babel.config.js` 根据需求添加插件
* `postcss.config.js` 根据需求修改插件配置
* `favicon.ico` 自行修改
* `.env`/`.env.development`/`.env.production` 修改 CDN 地址, 接口地址, 接口版本号, 异常上报地址等等
* `.sentryclirc` 修改 Sentry 配置
* `.travis.yml` CI 配置
* `.pockrc.yml` 接口跨域, 代理 Bearychat 配置
* `index.html` 因为里面有 ejs 模板语法, 和 artTemplate 语法冲突, 所以没有加入到 dulu 的模板中, 在不需要异常监控的时候请手动去除里面的异常监控脚本
* `package.json` 根据需要裁剪一些依赖
* `vue.config.js` 静态服务器的 header, 环境变量, preload 字体等
* `iconfont.css` 以及字体文件
* `loading.css`/`loading.tpl`/`loading.js` loading 动画
* `main.css` 全局背景色等
* `theme-light.css`/`logo-font.css`/`size.css`/`config.js` 非必要, 只是用作 demo 演示
* `/mock` 下的都根据业务调整
* `http-status.js` 状态码根据业务调整
* `util.js` 根据情况裁剪
* `apis.js` 携带 Token 请求和异常处理