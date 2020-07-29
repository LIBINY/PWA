//计算1-1亿之间的所有数的和
let total = 0
for (let i = 0; i < 100000000; i++) {
    total += i
}

// 发消息给主线程
self.postMessage({
    total: total
})
//监听主线程的消息
self.onmessage = e => {
    console.log(e.data)
}