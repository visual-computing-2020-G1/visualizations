const { override, fixBabelImports, addLessLoader } = require("customize-cra");

// Variables: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: {
    //   "@primary-color": "#94b43b",
    //   "@layout-header-background": "#5B5C5E",
    //   "@text-color-secondary-dark": "fade(@white, 95%)",
    //   "@text-color-dark": "fade(@white, 95%)",
    //   "@layout-trigger-background": "#5B5C5E",
    //   // "@layout-sider-background": "fade(@white, 95%)",
    //   "@layout-sider-background": "#FFF",
    // }
  })
);
