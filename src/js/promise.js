// const promise = new Promise((resolve, reject) => {
//     const canFullFill = Math.random() > 0.5;

//     setTimeout(() => {
//         if(canFullFill) {
//             resolve('This is okay')
//         } 
    
//         reject('Error!!!')
//     }, 1000);
// })



// promise.then(
//     result => {
//         console.log(`✅${result}`)
//         },
//     error => {
//         console.log(`❌${error}`)
//     })



// promise
//     .then(onResolved, onRejected)
//     .then(
//         x => {
//             console.log(x)

//             return 10
//         }
//     )
//     .then(
//         y => console.log(y)
//     )
//     .catch(error => console.log(error))
//     .finally(() => console.log('Выполняется всегда'))


    function onResolved(result) {
        console.log(`✅${result}`)
    }
    
    function onRejected(error) {
        console.log(`❌${error}`)
    }


const makeOrder = dish => {
    const DELAY = 1000;

    return new Promise((resolve, reject) => {
        const passed = Math.random() > 0.5;

        setTimeout(() => {
            if(passed) {
                resolve('OKAY')
            } else {
                reject('Error')
            }
        }, DELAY);
    })
    
}

makeOrder('Apple Juice').then(onResolved).catch(onRejected)