
const fun = async () => {
    setTimeout(() => {
        console.log(1);
    }, 1000);
}

const start = async () => {
    await fun().then(() => {
        console.log(2);
    })
    
}

start();