import { Projekat } from './projekat';
import { Grupa } from 'src/app/models/grupa';

export class Student{
  id: number;
  brojIndeksa: string;
  ime: string;
  prezime: string;
  grupa: Grupa;
  projekat: Projekat;
}
