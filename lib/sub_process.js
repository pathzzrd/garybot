const { spawn } = require('child_process');


const execute = async(command, args) => {

  const promise = new Promise( (resolve, reject) => {
    let stdout = "";
    let stderr = "";

    console.log("spawning child process");
    const proc = spawn(command, args, {shell: true});

    proc.stdout.on('data', (data) => {
      stdout = stdout + data;
      console.log('on data ', stdout);
    });

    proc.stderr.on("data", (data) => {
      stderr = stderr + data;
      console.log('on errr', stderr);
    });

    proc.on("close", (code) => {
      const output = {stdout, stderr}
      if (code !== 0) {
        return reject(output);
      }
      resolve(output)
    });
  });
  console.log('returning prommise');
  return promise;
};

module.exports = {
  execute
};
