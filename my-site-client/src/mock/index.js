import Mock from "mockjs";

import "./banner";// 以后如果有真实的数据就直接注释就行
import "./blog";
import "./setting";
import "./about";
import "./project";
import "./message";

// 设置网络延迟
Mock.setup({
    timeout: "1000-2000"
});