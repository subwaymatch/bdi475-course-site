import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import fs from "fs";

/*
  scrape available pyodide packages from the official docs during prebuild
*/
(async () => {
  const packageSourceUrl =
    "https://pyodide.org/en/stable/usage/packages-in-pyodide.html";

  let text;
  let pyodidePackages = [];

  try {
    const response = await fetch(packageSourceUrl);
    text = await response.text();

    const dom = new JSDOM(text);

    pyodidePackages = [...dom.window.document.querySelectorAll("tbody tr")].map(
      (row) => {
        const cells = row.querySelectorAll("td");

        return {
          name: cells[0].textContent,
          version: cells[1].textContent,
        };
      }
    );

    await fs.writeFileSync(
      "data/available-pyodide-packages.json",
      JSON.stringify(pyodidePackages)
    );
  } catch (err) {
    console.error(err);
  }
})();
