import {Pays} from "./Pays";
import {PointFrontalier} from "./PointFrontalier";
import {TypeIdentifiant} from "./TypeIdentifiant";

export class Voyageur{
  id: string = '';
  nom: string = '';
  prenom: string = '';
  adresseMaroc: string = '';
  identifiant: string = '';
  resident: boolean = false;
  typeIdentifiant: TypeIdentifiant = new TypeIdentifiant();
  paysNationalite: Pays = new Pays();
}
