// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use calamine::{open_workbook, Reader, Xlsx};


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_excel_column_names])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_excel_column_names (xlsxpath: String) -> String {
    
    let mut excel: Xlsx<_> = open_workbook(xlsxpath).unwrap();
    let mut names: Vec<String> = Vec::new();
    if let Some(Ok(r)) = excel.worksheet_range("EIS-DTA") {
        for row in r.rows() {
            for cell in row.iter() {
                names.push(cell.to_string());
            }
            break;
        }
    }
    let json = serde_json::to_string(&names).unwrap();
    json
}