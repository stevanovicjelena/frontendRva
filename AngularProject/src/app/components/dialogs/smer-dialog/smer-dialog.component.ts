import { Smer } from './../../../models/smer';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SmerService } from 'src/app/services/smer.service';


@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})

export class SmerDialogComponent implements OnInit {


  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SmerDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Smer,
    public smerService: SmerService) { }

ngOnInit(): void {
}

public add(): void {
this.smerService.addSmer(this.data)
.subscribe(() => {
this.snackBar.open('Uspesno dodat smer: ' + this.data.naziv, 'U redu', {
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
this.smerService.updateSmer(this.data)
.subscribe(() => {
this.snackBar.open('Uspesno modifikovan smer: ' + this.data.oznaka, 'U redu', {
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
this.smerService.deleteSmer(this.data.id)
.subscribe(() => {
this.snackBar.open('Uspesno obrisan smer' + this.data.oznaka, 'U redu', {
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

