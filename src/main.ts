import { invoke } from "@tauri-apps/api/tauri";
import { open } from '@tauri-apps/api/dialog';


let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;
async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});

let btnExcelFile = document.querySelector("#btnSelectExcelFile");
btnExcelFile?.addEventListener("click", async () => {
  const selected = await open({
    multiple: false,
    filters: [
      { name: 'Excel', extensions: ['xlsx'] }
    ]
  });
  console.log(selected);
  let testdata: string = await invoke("get_excel_column_names", {path: selected});
  
  // testdata is ja json object put it in an object
  let testdata2: string[] = JSON.parse(testdata);
  let divExcelColumns = document.querySelector("#divExcelColumns");
  for (let i = 0; i < testdata2.length; i++) {
    // print i and testdata2[i] in a table
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let tempcolumnnr = i + 1;
    td1.textContent = tempcolumnnr.toString();
    td2.textContent = testdata2[i];
    tr.appendChild(td1);
    tr.appendChild(td2);
    divExcelColumns?.appendChild(tr);
  }
});