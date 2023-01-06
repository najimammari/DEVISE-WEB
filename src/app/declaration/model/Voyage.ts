import {Pays} from "./Pays";
import {PointFrontalier} from "./PointFrontalier";

export class Voyage{
  id: string = '';
  dateArrive: string = '';
  paysProvenance: Pays = new Pays();
  pointFrontalier: PointFrontalier = new PointFrontalier();
}
