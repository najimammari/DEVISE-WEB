import {TypeDevise} from "./TypeDevise";

export class TitrePorteur{
  id: string = '';
  montant: number = 0.0;
  referenceTitre: string = '';
  emetteur: string = '';
  natureTitre: string = '';
  typeDevise: TypeDevise = new TypeDevise();
}
