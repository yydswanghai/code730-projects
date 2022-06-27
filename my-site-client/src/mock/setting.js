import Mock from "mockjs";

Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: "http://hbimg.huabanimg.com/a471f723b1dfa3bfdac66251d79c4425c24e2a901a557-DZu4aG_fw658/format/webp",
        siteTitle: "我的个人空间",
        github: "https://github.com",
        qq: "123456789",
        qqQrCode:    "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
        weixin: "abcdes1234",
        weixinQrCode:
        "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
        mail: "asd@gmail.com",
        icp: "粤ICP备********号",
        githubName: "MySite",
        favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
    }
})