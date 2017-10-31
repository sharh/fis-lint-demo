//开启相对路径，需要安装fis3-hook-relative
fis.hook('relative');
fis.match('*.css', {
    //添加eslint
    lint: fis.plugin('css'),
});


fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css',
  optimizer: fis.plugin('clean-css',{
      //option
  })
});



fis.match('*.js', {
    //添加eslint，更多配置请在项目根目录下配置.eslintrc.js，.eslintignore
    lint: fis.plugin('myeslint', {
        formatter: require('eslint-friendly-formatter')
    }),
    optimizer: fis.plugin( 'uglify-js' ),
    parser: fis.plugin('babel-latest')
});
fis.match('*.html', {
    //添加eslint
    lint: fis.plugin('html-hint', {
        // 忽略的文件，指定template类型的文件
        ignoreFiles: ['prod/**.html'],
        // 更多rules参考：https://github.com/yaniswang/HTMLHint/wiki/Rules
        rules: {
            // 标签名小写
            "tagname-lowercase": true,
            // 属性名小写
            "attr-lowercase": true,
            // 属性值使用双引号
            "attr-value-double-quotes": true,
            // 属性值不能为空，如attr=""
            "attr-value-not-empty": true,
            // 不能写重复属性
            "attr-no-duplication": true,
            // doctype写在最前面
            "doctype-first": true,
            // 标签要配对
            "tag-pair": true,
            // 标签自闭合
            "tag-self-close": true,
            // 特殊字符转义，如<span>aaa>bbb<ccc</span>，
            // 应该进行转义：<span>aaa&gt;bbb&lt;ccc</span>
            "spec-char-escape": true,
            // id需要唯一
            "id-unique": true,
            // src不能为空，要么不要写src属性
            "src-not-empty": true,
            // 必须写title标签
            "title-require": false,
            // html5文档类型
            "doctype-html5": true,
            // 标签内的style属性禁止
            "inline-style-disabled": true,
            // underline: <div id="aaa_bbb">
            // dash: <div id="aaa-bbb">
            // hump: <div id="aaaBbb">
            "id-class-value": false,
            // style标签禁止
            "style-disabled": true,
            // script标签禁止
            "inline-script-disabled": true,
            // 空格与tab键混用
            "space-tab-mixed-disabled": "tab",
            // id前面不能写ad?
            "id-class-ad-disabled": false,
            // href属性必须是相对或者绝对
            "href-abs-or-rel": false,
            // attr不能使用转义字符，如\u00ff这样的表示
            "attr-unsafe-chars": true
        }
    })
});
fis.media('dev')
    .match('*.js', {
        optimizer: null
    })
    .match('*', {
        useHash: false,
        relative: true,
        deploy: [fis.plugin('local-deliver', {
            to: './output'
        })]
    })
    .match('**.html', {
        // 针对html中定义的进行字体压缩
        deploy: [fis.plugin('fontspider', {
            to: './output'
        })]
    });
fis.set('project.ignore', [
    'output/**',
    'dist/**',
    'fis-conf.js',
    'node_modules/**',
    '.git/**',
    'plugins/**',
    '.svn/**'
]);