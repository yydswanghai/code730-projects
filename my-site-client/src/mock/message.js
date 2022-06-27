import Mock from "mockjs";
import qs from "querystring";


// 由于没有图片这里就用本地的图片
import avatar1 from '@/assets/avatar/webp-1.webp';
import avatar2 from '@/assets/avatar/webp-2.webp';
import avatar3 from '@/assets/avatar/webp-3.webp';
import avatar4 from '@/assets/avatar/webp-4.webp';
import avatar5 from '@/assets/avatar/webp-5.webp';
import avatar6 from '@/assets/avatar/webp-6.webp';
// 提交评论
Mock.mock("/api/message", "post", {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1, 10)",
        createData: Date.now(),
        "avatar|1": [
            avatar1,
            avatar2,
            avatar3,
            avatar4,
            avatar5,
            avatar6
        ]
    }
}) 

// 分页获取评论
Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function(options){
    const query = qs.parse(options.url);

    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            total: 52,
            [`rows|${query.limit || 10}`]: [
                {
                    id: "@guid",
                    nickname: "@cname",
                    content: "@cparagraph(1, 10)",
                    createData: Date.now(),
                    "avatar|1": [
                        avatar1,
                        avatar2,
                        avatar3,
                        avatar4,
                        avatar5,
                        avatar6
                    ]
                }
            ]
        }
    })
})