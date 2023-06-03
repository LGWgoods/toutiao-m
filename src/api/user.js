import request from "@/utils/request";

// 用户认证
export const login = (data) => {
    return request({
        url: "/v1_0/authorizations",
        method: 'post',
        data
    })
}

// 发送验证码
export const getSmsCode = mobile => {
    return request({
        url: `/v1_0/sms/codes/${mobile}`,
        method: "get"
    })
}
