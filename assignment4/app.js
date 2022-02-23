var http = require("http"); // 1. 'http' library misspelled

var myname = () => {
  // 2. 'function' is misspelled
  return "here is my IP adress"; // 3. wasnt returning anything only console logging
};

async function callHttpbin() {
  // 4. missing async keyword
  // 5. 'callHttpbin' is misspelled does not match invokation
  let promise = new Promise((resolve, reject) => {
    http.get("http://httpbin.org/ip", (response) => {
      var str = "";
      response.setEncoding("utf8");
      response.on("data", (data) => {
        str += data;
      });
      response.on("end", () => {
        var result = JSON.parse(str);
        myips = result.origin;
        resolve(myips); // 6. value not passed into the resolve()
      });
    });
  });

  let result = await promise;
  return result; // 7. wasnt returning value
}

async function executeAsyncTask() {
  // 8. missing async keyword
  const valueA = await callHttpbin();
  const valueB = myname();
  console.log(valueB + " " + valueA);
} // 9. missing closing bracket

// 10. executeAsyncTask never invoked
executeAsyncTask();
