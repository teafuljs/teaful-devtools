const isFF = navigator.userAgent.indexOf('Firefox') !== -1;

export default function stackStringToArray(stack) {
  return stack
    .split('\n')
    .map((line) => {
      const rgx = isFF ? /@(.*):(\d+):(\d+)/ : /at (.*) \((.*):(\d+):(\d+)\)/
      const match = line.match(rgx) || [];
      return {
        file: isFF ? match[1]: match[2],
        line: isFF ? parseInt(match[2], 10) : parseInt(match[3], 10),
        column: isFF ? parseInt(match[3], 10) : parseInt(match[4], 10),
        function: isFF ? '' : match[1],
      };
    })
    .filter((line) => line.file);
}
