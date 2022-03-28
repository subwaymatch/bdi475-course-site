import { ICodeExecutionResult } from "types/pyodide";
import { proxy } from "valtio";

export interface IPythonPlaygroundState {
  snippetId: string;
  title: string;
  userCode: string;
  codeResult: ICodeExecutionResult;
}

const state = proxy({
  snippetId: null,
  title: "",
  userCode:
    "import pandas as pd\n\nmy_dict = {}\n\nfor i in range(50):\n  print(i)\n  my_dict[i] = list(range(5)) * 10\n\npd.DataFrame(my_dict)",
  codeResult: null,
} as IPythonPlaygroundState);

export default state;
