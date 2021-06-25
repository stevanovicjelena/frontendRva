import { Projekat } from 'src/app/models/projekat';
import { Student } from './../../models/student';
import { Component, Input, OnChanges, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Grupa } from 'src/app/models/grupa';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'brojIndeksa', 'ime', 'prezime', 'grupa', 'projekat', 'actions'];
  dataSource: MatTableDataSource<Student>;
  subscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() selektovanaGrupa: Grupa;

  constructor(private studentService: StudentService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.loadData();
  }

  ngOnChanges(): void {
    if(this.selektovanaGrupa.id) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.subscription = this.studentService.getStudentiIzGrupe(this.selektovanaGrupa.id)
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data:any, filter: string) => {
          const accumulator = (currentTerm:any, key:any) => {
            return key === 'projekat' ? currentTerm + data.projekat.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data:any, property) => {
          switch (property) {
            case 'projekat': return data.projekat.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };


        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, brojIndeksa?: string, ime?: string, prezime?: string, grupa?: Grupa, projekat?: Projekat)  {
    const dialogRef = this.dialog.open(StudentDialogComponent, {data: {id, brojIndeksa, ime, prezime, grupa, projekat }});
    dialogRef.componentInstance.flag = flag;
    if(flag===1) {
      dialogRef.componentInstance.data.grupa = this.selektovanaGrupa;
    }
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result===1) {
          this.loadData();
        }
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
