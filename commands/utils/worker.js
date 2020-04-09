const { Worker } = require('worker_threads');

module.exports = {
    useWorker(filepath, tbUser) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(filepath, { workerData: tbUser});
        worker.on('online', () => { console.log('Launching intensive CPU task') });
        worker.on('message', messageFromWorker => {
            console.log(messageFromWorker);
            return resolve
        });
        worker.postMessage(tbUser);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`))
            }
        })
    })
}
};
