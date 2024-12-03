import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { BehaviorSubject } from 'rxjs';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  public dbReady: BehaviorSubject<boolean>
  public isWeb: boolean;
  public isIos: boolean;
  public dbName: string;

  constructor(
    private http: HttpClient
  ) {

   this.dbReady = new BehaviorSubject(false);
   this.isWeb = false;
   this.isIos= false;
   this.dbName = '';
   }

   async init(){
   
   const info = await Device.getInfo();
   const sqlite = CapacitorSQLite as any;

   if(info.platform=='android'){
    try {
      await sqlite.requestPermissions();
    } catch (error) {
      console.error("Esta App necesita permisos para funcionar")
    }
     
   }else if(info.platform== 'web'){
     this.isWeb= true;
     await sqlite.initWebStore();


   }else if(info.platform== 'ios'){
     this.isIos= true;
   }

    this.setupDatabase();

   }
   
   async setupDatabase(){
    const dbSetup = await Preferences.get({ key:
    'first_setup_key'})

    if(!dbSetup.value){
     this.downloadDatabase();
    }else{
      this.dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({ database: this.dbName});
      await CapacitorSQLite.open({ database: this.dbName})
      this.dbReady.next(true);
    }

   }

   downloadDatabase(){
    this.http.get('assets/db/db.json').subscribe(async (jsonExport: JsonSQLite)=> {

      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({jsonstring});

      if (isValid.result){
        this.dbName = jsonExport.database;
        await CapacitorSQLite.importFromJson({jsonstring});
        await CapacitorSQLite.createConnection({ database: this.dbName})
        await CapacitorSQLite.open({ database: this.dbName})

        await Preferences.set({ key:'first_setup_key', value: '1'})
        await Preferences.set({ key:'dbname', value: this.dbName})

        this.dbReady.next(true);
      }

    })
     

   }

   async getDbName(){
    if(!this.dbName){
      const dbname= await Preferences.get({ key:'dbname'})
      if(dbname.value){
        this.dbName = dbname.value
      }
    }

    return this.dbName;
  }
  
  async create(language: string){
    let sql = 'INSERT INTO languages VALUES(?)';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set : [
        {
          statement: sql,
          values: [
            language
          ]
        }
      ]
    }).then(( changes: capSQLiteChanges) => {
      if(this.isWeb){
       CapacitorSQLite.saveToStore({ database: dbName});
      }
      return changes;
    }).catch(err => Promise.reject(err))

  }
  
  async read(){
    let sql = 'SELECT * FROM languages';
    const dbName = await this.getDbName();
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: []
    }).then((response: capSQLiteValues)=> {
      let languages: string[] = [];
      if(this.isIos && response.values.length > 0){
       response.values.shift(); 
      }
     
      for (let index = 0; index < response.values.length; index++){
          const language = response.values[index];
          languages.push(language.name);
      }
      return languages;
    }).catch(err => Promise.reject(err))
  }
  
  async update(newLanguage: string, originalLanguage: string){
     let sql = 'UPDATE languages SET name=? WHERE name=?';
     const dbName = await this.getDbName();
     return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            newLanguage,
            originalLanguage
          ]
        }
      ]
     }).then(( changes: capSQLiteChanges) => {
      if(this.isWeb){
       CapacitorSQLite.saveToStore({ database: dbName});
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }
  
  async delete(language: string){
    let sql = 'DELETE FROM languages WHERE name=?';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            language
          ]
        }
      ]
    }).then(( changes: capSQLiteChanges) => {
      if(this.isWeb){
       CapacitorSQLite.saveToStore({ database: dbName});
      }
      return changes;
    }).catch(err => Promise.reject(err)) 
  }

}
