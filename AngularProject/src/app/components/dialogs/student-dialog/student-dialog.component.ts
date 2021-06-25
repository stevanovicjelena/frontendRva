import { ProjekatService } from './../../../services/projekat.service';
import { Projekat } from './../../../models/projekat';
import { Subscription } from 'rxjs';
import { Student } from './../../../models/student';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit, OnDestroy {

  projekti: Projekat[];
  public flag: number;
  projekatSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Student,
    public studentService: StudentService,
    public projekatService: ProjekatService) { }

ngOnInit(): void {
  this.projekatSubscription = this.projekatService.getAllProjects()
      .subscribe(projekti => {
        this.projekti= projekti;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
}

ngOnDestroy() {
  this.projekatSubscription.unsubscribe();
}

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id === b.id;
}

public add(): void {
this.studentService.addStudent(this.data)
.subscribe(() => {
this.snackBar.open('Uspesno dodat student: ' + this.data.brojIndeksa, 'U redu', {
duration: 2500
});
}),
(error: Error) => {
console.log(error.name + '-->' + error.message);
this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
duration: 2500
});
};
}

public update(): void {
this.studentService.updateStudent(this.data)
.subscribe(() => {
this.snackBar.open('Uspesno modifikovan student: ' + this.data.brojIndeksa, 'U redu', {
duration: 2500
});
}),
(error: Error) => {
console.log(error.name + '-->' + error.message);
this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
duration: 2500
});
};
}

public delete(): void {
this.studentService.deleteStudent(this.data.id)
.subscribe(() => {
this.snackBar.open('Uspesno obrisan student', 'U redu', {
duration: 2500
});
}),
(error: Error) => {
console.log(error.name + '-->' + error.message);
this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
duration: 2500
});
};
}

public cancel(): void {
this.dialogRef.close();
this.snackBar.open('Odustali ste od izmena!', 'U redu', {
duration: 1000
});
}

}
