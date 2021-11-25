// It converts:
//  "Error: foo\n    at bar (http://localhost:8080/panel/src/util/receiveMessage.js:10:5)"
// to:
//  [
//    {
//      file: "http://localhost:8080/panel/src/util/receiveMessage.js",
//      line: 10,
//      column: 5,
//      function: "bar"
//    }
//  ]
export default function stackStringToArray(stack) {
  return stack
    .split('\n')
    .map((line) => {
      const match = line.match(/at (.*) \((.*):(\d+):(\d+)\)/) || [];
      return {
        file: match[2],
        line: parseInt(match[3], 10),
        column: parseInt(match[4], 10),
        function: match[1],
      };
    })
    .filter((line) => line.file);
}
