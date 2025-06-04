// import { TestBed } from '@angular/core/testing';
import { CsvParser } from './cvs-parser.service';

describe('CsvParser', () => {
const dataUrl = "/assets/dataset.csv";

let service: CsvParser;

  beforeEach(async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    service = new CsvParser();
  });

  // TEST 1 //
  it('should read file, and file not empty', async () => {
     const result = await service.readCsvFromUrl(dataUrl);
     expect(result.length).toBeGreaterThan(0);
  });

  // TEST 2 //
  it('at least 10 keys', async () => {
     const result = await service.readCsvFromUrl(dataUrl);
    //  console.log("length", Object.keys(result[0]).length);
     expect(Object.keys(result[0]).length).toBeGreaterThan(9);
  });

});
