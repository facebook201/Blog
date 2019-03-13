/**
 * 三种处理回调的方式 Promise  Generation Async
    */

// 使用Fetch 请求数据 然后使用不同方式返回数据
function getInfo() {
    return new Promise(function(resolve, reject) {
        fetch('http://api.hyyxedu.com/v1/index/graph?html=1').then(data => {
            resolve(data.json());
        }, error => {
            reject(error);
        });
    });
}

// Promise 
function getInfoByPromise() {
    getInfo().then(res => {
        console.log(res.data);
    }, error => {
        console.log(error);
    })
}

// Generator 方式
function* getInfoByGenerator() {
    const user = yield getInfo();
    return user;
}

const g = getInfoByGenerator();
const result = g.next().value;

result.then(v => {
    console.log(v);
}, error => {
    console.log(error);
});


// async 方式
async function getUserByAsync() {
    let user = await getInfo();
    return user;
}

getUserByAsync().then(res => {
    console.log(res);
});
