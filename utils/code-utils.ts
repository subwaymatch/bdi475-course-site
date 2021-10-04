export function removeSolutionPortion(solutionCode: string) {
  // Split code to lines
  const lines = solutionCode.split(/\r?\n/);

  let startReplace = false;
  let newLines = [];

  for (const line of lines) {
    if (line.trim() === "# YOUR CODE BEGINS") {
      newLines.push(line.trim());
      newLines.push("");
      startReplace = true;
    } else if (line.trim() === "# YOUR CODE ENDS") {
      newLines.push(line.trim());
      startReplace = false;
    } else if (!startReplace) {
      newLines.push(line);
    }
  }

  return newLines.join("\n").trimEnd();
}
