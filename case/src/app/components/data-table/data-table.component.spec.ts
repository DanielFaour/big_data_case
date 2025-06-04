import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.shareData = () => {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 3 //
  it('check if search works', () => {
    // creating mockup data for testing of search function
    component.tableData = [
      { 'name/first': 'Dani', 'name/last': 'Testensen' },
      { 'name/first': 'Sjef', 'name/last': 'DaSjefsen' },
    ];

    component.searchString = 'da';
    
    component.onSearch();

    // console.log('filtered table:', component.sortedTable);

    expect(component.sortedTable.length).toBe(1);
    expect(component.sortedTable[0]['name/first']).toBe('Dani');
  });
});
