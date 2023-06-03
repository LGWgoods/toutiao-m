/**
 * 定义token处理的3中方法
 */

// 获取token
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    try {
        return JSON.parse(data) // 判断是否为对象或者数组
    } catch (err) {
        return data
    }
}

// 存储token
export const setItem = (name, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value) // 转换为JSON字符串
    }
    window.localStorage.setItem(name, value)
}

// 移除token信息
export const removeItem = nanme => {
    window.localStorage.removeItem(name)
}
