const {exec} = require('child_process');
const path = require('path').resolve(__dirname, '..');

(async () => {
    await new Promise((resolve) => {
        console.log(`${path}/${process.env.REACT_APP_ENV}`);

        const child = exec(`rsync -avz --delete ${path}/dev/build  ${path}/${process.env.REACT_APP_ENV}`);

        child.stdout.on('data', (data) => {
            console.log(data);
        });

        child.on('close', (code) => {
            resolve();
        });
    });
    await new Promise((resolve) => {
        const child = exec(`cd ${path}/${process.env.REACT_APP_ENV} && git add . && git commit -m 'update'`);

        child.stdout.on('data', (data) => {
            console.log(data);
        });

        child.on('close', (code) => {
            resolve();
        });
    });
    await new Promise((resolve) => {
        const child = exec(`cd ${path}/${process.env.REACT_APP_ENV} && git push origin master`);

        child.stdout.on('data', (data) => {
            console.log(data);
        });

        child.on('close', (code) => {
            resolve();
        });
    });
})();
