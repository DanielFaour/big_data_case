import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CsvParser } from '../../services/cvs-parser.service';
import { SharedDataService } from '../../services/sharedData.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss', '../../app.component.scss'],
})
export class DataTableComponent {
  fileUrl = './assets/dataset.csv';

  public tableData: any[] = [];
  public sortedTable: any[] = [];
  public searchString = '';

  public currentRow = 0;
  public currentPage = 1;
  public amountPages = 0;

  public amountRows = 0;

  rowLimit = 20; 
  rowChange = 20; // makes it easier to keep track of and change viewed data, maybe changeable in a future update

  public sortDirection: Record<string, 'asc' | 'desc'> = {}; // variable for checking sort direction for each th key
  public activeSortKey: string | null = null;

  // run parser when component is loaded
  constructor(
    private csvParser: CsvParser,
    private sharedDataService: SharedDataService
  ) {
    this.csvParser.readCsvFromUrl(this.fileUrl).then((data) => {
      this.tableData = data;
      this.sortedTable = [...data];
      this.amountPages = Math.ceil(this.tableData.length / this.rowLimit);
      this.pageCheck();
      this.preRunThSort();
      this.shareData(this.sortedTable);
    });
  }

  // shared data to service
  shareData(data: any[]) {
    this.sharedDataService.updateFilteredData(data);
  }

  // get key based on which th cell you forward
  getKey(key: any): string {
    return String(key.key);
  }

  // function to preset which sort direction each th cell has
  preRunThSort() {
    if (this.sortedTable.length === 0) return;

    const keys = Object.keys(this.sortedTable[0]);

    for (const key of keys) {
      this.sortDirection[key] = 'desc';
    }
  }

  // checks if buttons should be visually disabled for user responsiveness
  pageCheck() {
    const backButtons = document.getElementsByClassName(
      'backButton'
    ) as HTMLCollectionOf<HTMLElement>;
    const forwardButtons = document.getElementsByClassName(
      'forwardButton'
    ) as HTMLCollectionOf<HTMLElement>;

    this.amountRows = this.sortedTable.length;
    const firstPage = this.currentPage <= 1;
    const lastPage = this.currentPage === this.amountPages;

    // disables / enables the button based on last or first page
    for (const button of backButtons) {
      button.style.opacity = firstPage ? '0.5' : '1';
      button.style.cursor = firstPage ? 'none' : 'pointer';
      button.style.pointerEvents = firstPage ? 'none' : 'auto';
    }

    for (let i = 0; i < forwardButtons.length; i++) {
      forwardButtons[i].style.opacity = lastPage ? '0.5' : '1';
      backButtons[i].style.cursor = firstPage ? 'default' : 'pointer';
      backButtons[i].style.pointerEvents = firstPage ? 'none' : 'auto';
    }
  }

  // goto last page
  lastPage() {
    // to not go back beyond last page
    if (this.currentPage! < this.amountPages) {
      if (this.currentPage < this.amountPages) {
        this.currentPage = this.amountPages;
        this.currentRow = (this.currentPage - 1) * this.rowChange;

        // calculating remaining rows on last page just in case there is under rowChange amount
        const remainingRows = this.sortedTable.length - this.currentRow;
        this.rowLimit = this.currentRow + remainingRows;
      }
    }

    this.pageCheck();
  }

  // forward one page
  forwardPage() {
    // to not go back beyond last page
    if (this.currentPage! < this.amountPages) {
      this.currentPage++;
      this.currentRow += this.rowChange;
      this.rowLimit += this.rowChange;
    }
    this.pageCheck();
  }

  // goto first page
  firstPage() {
    if (this.currentPage! > 1) {
      this.currentPage = 1;
      this.currentRow = 0;
      this.rowLimit = this.rowChange;
    }
    this.pageCheck();
  }

  // backwards one page
  backPage() {
    // to not go back beyond first page
    if (this.currentPage! > 1) {
      this.currentPage--;
      this.currentRow = (this.currentPage - 1) * this.rowChange;
      this.rowLimit = this.currentRow + this.rowChange;
    }
    this.pageCheck();
  }

  // resets page and table
  resetPage() {
    this.sortedTable = [...this.tableData];

    this.currentRow = 0;
    this.rowLimit = this.rowChange;
    this.currentPage = 1;
    this.amountPages = Math.ceil(this.sortedTable.length / this.rowLimit);

    this.pageCheck();
    this.shareData(this.sortedTable);
    this.activeSortKey = null;
  }

  // name search logic
  onSearch() {
    // on userinput search through table, also reset to page 0
    this.resetPage();
    // console.log('TEST', this.searchString);

    if (this.searchString.trim() === '') {
      this.sortedTable = [...this.tableData];
    } else {
      const search = this.searchString.trim().toLowerCase().replace(/\s+/, '');
      this.sortedTable = this.tableData.filter((row) => {
        const first = row['name/first']?.toLowerCase() || '';
        const last = row['name/last']?.toLowerCase() || '';
        const fullNameF = `${first} ${last}`;
        const fullNameL = `${last} ${first}`; // if i want it to be possible to begin with lastname
        return fullNameF.replace(/\s+/, '').startsWith(search);
      });
    }

    // makes sure that current page and amount pages is 0 if there are no results
    if (this.sortedTable.length === 0 || isNaN(this.sortedTable.length)) {
      this.currentPage = 0;
      this.amountPages = 0;
    } else {
      this.amountPages = Math.ceil(this.sortedTable.length / this.rowLimit);
    }
    this.pageCheck();
    this.shareData(this.sortedTable);
  }

  clearInput() {
    const inputField = document.getElementById('myInput') as HTMLInputElement;

    if (inputField && inputField.value !== '') {
      inputField.value = '';
      this.resetPage();
    }
  }

  // sorts based on which table header key is clicked
  onHeaderClick(key: any) {
    this.sort(key);
  }

  // the sorting logic
  sort(key: any) {
    this.activeSortKey = key;
    let result: any;

    const direction = this.sortDirection[key] === 'asc' ? 'desc' : 'asc'; // swap directions every time same key is activated
    this.sortDirection[key] = direction;

    this.sortedTable.sort((a: any, b: any) => {
      if (isNaN(a[key]) && isNaN(b[key])) {
        result = a[key].localeCompare(b[key]);
      } else {
        result = Number(a[key]) - Number(b[key]);
      }
      return direction === 'asc' ? result : -result;
    });
  }
}
