import { SmerService } from 'src/app/services/smer.service';
import { Smer } from './../../../models/smer';
import { Grupa } from './../../../models/grupa';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { GrupaService } from 'src/app/services/grupa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit, OnDestroy {

  smerovi: Smer[];
  public flag: number;
  smerSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GrupaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Grupa,
    public grupaService: GrupaService,
    public smerService: SmerService) { }

ngOnInit(): void {
  this.smerSubscription = this.smerService.getAllSmer()
      .subscribe(smerovi => {
        this.smerovi = smerovi
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
}

ngOnDestroy(): void {
  this.smerSubscription.unsubscribe();
}

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}

public add(): void {
this.grupaService.addGrupa(this.data)
.subscribe(() => {
this.snackBar.open('Uspesno dodata grupa: ' + this.data.oznaka, 'U redu', {
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
this.grupaService.updateGrupa(this.data)
.subscribe(() => {
this.snackBar.open('Uspesno modifikovana grupa: ' + this.data.oznaka, 'U redu', {
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
this.grupaService.deleteGrupa(this.data.id)
.subscribe(() => {
this.snackBar.open('Uspesno obrisana grupa:' + this.data.oznaka, 'U redu', {
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
