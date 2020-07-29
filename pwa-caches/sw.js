const CACHE_NAME = 'v2'
const URLS = [
    '/',
    './index.html',
    './manifest.json',
    './logo2.png'
]
//主要用来缓存内容
self.addEventListener('install', async event => {
    console.log('install', event)
    // 开启一个cache,得到一个cache对象
    const cache = await caches.open(CACHE_NAME)
    // cache对象就可以存储资源
    // 等待对象把所有的资源存起来
    await cache.addAll(URLS)
    //会让service worker跳过等待，直接进入到activate状态
    // 等待skipWaiting()结束在进入activate
    // event.waitUntil(self.skipWaiting())
    await self.skipWaiting()
})

self.addEventListener('activate', async event => {
    console.log('activate', event)
    // 会清除旧的资源，获取到所有的资源的key
    const keys = await caches.keys()
    keys.forEach(key => {
        if (key !== CACHE_NAME) {
            caches.delete(key)
        }
    })
    //表示service worker 激活后，立即获取控制权
    // event.waitUntil(self.clients.claim())
    await self.clients.claim()
})
//在请求发送的时候触发
self.addEventListener('fetch', async event => {
    console.log('fetch', event)
    //请求对象
    const req = event.request
    //给浏览器响应
    event.respondWith(networkFirst(req))
})

// 网络优先
async function networkFirst(req) {
    try {
        //先从网络读取最新的内容
        const fresh = await fetch(req)
        return fresh
    } catch (error) {
        //从缓存中读取
        const cache = await caches.open(CACHE_NAME)
        const cached = await cache.match(req)
        return cached
    }

}