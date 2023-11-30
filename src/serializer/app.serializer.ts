export class DataSerializer {
  constructor(partial: Partial<DataSerializer>){
      Object.assign(this, partial);
  }
}
