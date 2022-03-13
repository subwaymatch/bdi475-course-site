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
  title: "Untitled",
  userCode:
    "import pandas as pd\n\npd.DataFrame({\n  'a': [1, 2, 3],\n  'b': [True, False, False]\n})\n",
  codeResult: null,
} as IPythonPlaygroundState);

export default state;
