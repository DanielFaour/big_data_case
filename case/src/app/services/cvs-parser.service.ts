/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class CsvParser {
  constructor() {}

  readCsv(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];

      Papa.parse(file, {
        header: true,
        worker: true,
        skipEmptyLines: true,
        step: (row) => {
          results.push(row.data);
        },
        complete: () => {
          resolve(results);
          console.log("complete");
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async readCsvFromUrl(url: string): Promise<any[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load CSV from ${url}`);
  const csvText = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (error: any) => reject(error),
    });
  });
}

}
