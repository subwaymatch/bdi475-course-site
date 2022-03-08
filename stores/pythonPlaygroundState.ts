import { proxy } from "valtio";

const state = proxy({
  snippetId: null,
  title: "Untitled",
});

export default state;
