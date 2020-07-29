self.addEventListener('install', event => {
    console.log('install', event)
    //会让service worker跳过等待，直接进入到activate状态
    // 等待skipWaiting()结束在进入activate
    event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
    console.log('activate', event)
    //表示service worker 激活后，立即获取控制权
    event.waitUntil(self.clients.claim())
})
//在请求发送的时候触发
self.addEventListener('fetch', event => {
    console.log('fetch', event)
})