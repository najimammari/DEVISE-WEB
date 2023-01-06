import {Voyageur} from "./Voyageur";
import {Voyage} from "./Voyage";
import {LigneDevise} from "./LigneDevise";
import {TitrePorteur} from "./TitrePorteur";
import {Justificatif} from "./Justificatif";

export class Declaration{
  id: string = '';
  dateEnregistrement: string = '';
  reference: string = '';
  commentaire: string = '';
  sensDeclaration: string = '';
  voyageur: Voyageur = new Voyageur();
  voyage: Voyage = new Voyage();
  ligneDevises: Array<LigneDevise> = new Array<LigneDevise>();
  titrePorteurs: Array<TitrePorteur> = new Array<TitrePorteur>();
  justificatif: Justificatif = new Justificatif();

}
