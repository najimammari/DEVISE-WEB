import {Component, Inject, OnInit} from '@angular/core';
import {ReferentielService} from "./services/referentiel.service";
import {TypeDevise} from "./model/TypeDevise";
import {LigneDevise} from "./model/LigneDevise";
import {TitrePorteur} from "./model/TitrePorteur";
import {Pays} from "./model/Pays";
import {PointFrontalier} from "./model/PointFrontalier";
import {Voyage} from "./model/Voyage";
import {TypeIdentifiant} from "./model/TypeIdentifiant";
import {Voyageur} from "./model/Voyageur";
import {Declaration} from "./model/Declaration";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export const MAX_SIZE_FILE_MO = 2;



export const MAX_OTHER_DOC_UPLOAD_ALLOWED = 5;



export const TYPE_FILES_ALLOWED = ['application/pdf'];
@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit{

  listErrorMsgs: Array<string> = new Array<string>();
  listInfoMsgs: Array<string> = new Array<string>();
  pays = new Array<Pays>();
  posteFrontaliers = new Array<PointFrontalier>();
  typeDevises = new Array<TypeDevise>();
  typeIdentifiants = new Array<TypeIdentifiant>();
  ligneDevises = new Array<LigneDevise>();
  ligneDevise: LigneDevise = new LigneDevise();
  natureTitres = new Array<any>();
  typeJustificatifs = new Array<any>();
  titrePorteur: TitrePorteur = new TitrePorteur();
  titrePorteurs = new Array<TitrePorteur>();
  selectedPays: Pays = new Pays();
  selectedPosteFrontalier: PointFrontalier = new PointFrontalier();

  voyage: Voyage = new Voyage();
  voyageur: Voyageur = new Voyageur();

  declaration: Declaration = new Declaration();
  constructor(private referentielService: ReferentielService,public dialog: MatDialog) {
  }
  ngOnInit() {
    this.getPaysValide();
    this.getPosteFrontalierValide();
    this.getTypeDeviseValide();
    this.getTypeIdentifiantValide();
    this.getNatureTitres();
    this.getTypeJustificatif();
    this.ligneDevise = new LigneDevise();
    this.voyage = new Voyage();
    this.voyageur = new Voyageur();
    this.declaration = new Declaration();
  }
  getPaysValide(){
    this.referentielService.getPaysValide().subscribe(response => {
      this.pays = response as Pays[];
    });
  }
  getPosteFrontalierValide(){
    this.referentielService.getPosteFrontalierValide().subscribe(response => {
      this.posteFrontaliers = response as PointFrontalier[];
    });
  }
  getTypeDeviseValide(){
    this.referentielService.getTypeDeviseValide().subscribe(response => {
      this.typeDevises = response as TypeDevise[];
    });
  }
  getTypeIdentifiantValide(){
    this.referentielService.getTypeIdentifiantValide().subscribe(response => {
      this.typeIdentifiants = response as TypeIdentifiant[];
    });
  }

  getNatureTitres(){
    this.referentielService.getNatureTitres().subscribe(response => {
      this.natureTitres = response;
    });
  }

  getTypeJustificatif(){
    this.referentielService.getTypeJustificatif().subscribe(response => {
      this.typeJustificatifs = response;
    });
  }

  addLigneDevise(){
    if(this.ligneDevise != null && this.ligneDevise.montant && this.ligneDevise.typeDevise){
      const dd = this.ligneDevise;
      this.ligneDevises.push(dd);
      this.ligneDevise = new LigneDevise();
    }
  }
  deleteLigneDevise(obj: LigneDevise){
    this.ligneDevises = this.ligneDevises.filter(d => d !==obj);
  }

  addTitrePorteur(){
    if(this.titrePorteur != null && this.titrePorteur.montant && this.titrePorteur.typeDevise
    && this.titrePorteur.referenceTitre && this.titrePorteur.emetteur && this.titrePorteur.natureTitre){
      const dd = this.titrePorteur;
      this.titrePorteurs.push(dd);
      this.titrePorteur = new TitrePorteur();
    }
  }
  deleteTitrePorteur(obj: TitrePorteur){
    this.titrePorteurs = this.titrePorteurs.filter(d => d !==obj);
  }

  handleInputChange(event: any, doc: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const tailleEnMo = file.size / 1000000;
    if (tailleEnMo > MAX_SIZE_FILE_MO) {
      this.listErrorMsgs.push('La taille maximale autorisée est de ' + MAX_SIZE_FILE_MO + ' Mo');
      (window.document.getElementById(doc) as HTMLInputElement).value = '';
      return;
    }
    this.declaration.justificatif.fileName =file.name;
    this.declaration.justificatif.typeMime = TYPE_FILES_ALLOWED[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  _handleReaderLoaded(e: any) {
    const reader = e.target;
    const result = reader.result.split(',');
    const typeMime = result[0].match(/:(.*?);/)[1];
    const listTypeFilesFiltred = TYPE_FILES_ALLOWED.filter(t => t === typeMime);
    if (!listTypeFilesFiltred || listTypeFilesFiltred.length === 0) {
      this.listErrorMsgs.push('Le type du fichier choisi n\'est pas autorisé!');
      return;
    }
    this.declaration.justificatif.contentBase64 = result[1];
  }

  soumettreDeclaration(){
    if(this.ligneDevises.length == 0 && this.titrePorteurs.length == 0){
      this.listErrorMsgs.push('Veuillez ajouter en moin une devise ou un titre au porteur !');
      return;
    }
    this.declaration.ligneDevises = this.ligneDevises;
    this.declaration.titrePorteurs = this.titrePorteurs;
    console.log(this.declaration);
    this.referentielService.soumettreDeclaration(this.declaration).subscribe(data => {
      console.log(data);
      this.listInfoMsgs.push('Votre déclaration a été enregistrée avec succès sous la référence: ' + data.reference);
    })
    this.listErrorMsgs = new Array<string>();
    this.declaration = new Declaration();
    this.ligneDevises = new Array<LigneDevise>();
    this.titrePorteurs = new Array<TitrePorteur>();
  }
}

@Component({
  selector: 'declaration-dialog',
  templateUrl: 'declaration-dialog.html',
})
export class DeclarationDialog implements OnInit{

  dec: Declaration = new Declaration();
  constructor(public dialogRef: MatDialogRef<DeclarationDialog>, @Inject(MAT_DIALOG_DATA) public data: Declaration) { }
  ngOnInit() {
    this.dec = this.data;
  }

}
