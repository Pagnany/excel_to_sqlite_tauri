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
});