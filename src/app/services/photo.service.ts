import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Property } from './../components/Interfaces/Property'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URI = 'http://localhost:4000/api/property';

  constructor(private http: HttpClient) { }

  async createPhoto(property: string, area_p: string, n_cuartos:string,n_banos:string, n_parqueaderos:string, valor:string,  descripcion:string, photo: File | string) {
    var fd = new FormData();
    fd.append('property', property);
    fd.append('area_p', area_p);
    fd.append('n_cuartos', n_cuartos);
    fd.append('n_banos', n_banos);
    fd.append('n_parqueaderos', n_parqueaderos);
    fd.append('valor', valor);
    fd.append('descripcion', descripcion);
    fd.append('estado', "A");
    fd.append('image', photo);
    
    var request = new XMLHttpRequest();
    request.open("POST", this.URI);
    request.send(fd);
    
    request.onload = function() { 
      var rta= JSON.parse(request.response); 
      if (rta.error == true) { 
        alert(`Status ${rta.status}. Error ${rta.error} . No guardo el contenido`); 
      } else { 
        alert(`El inmueble ha sido cargado con exito!`); 
      }
      return rta.body
    };
     
  }

  async getPhotos(): Promise<any> {
    const arreglo=await fetch(this.URI, {
      headers: {
        "Content-Type": "application/json", // <-- Importante el encabezado
      },
      method: "GET",
    });
    const jsonDecodificado = await arreglo.json();

    return jsonDecodificado.body;
  }

  async getPhoto(id: string | undefined) {
    const url=this.URI+`?id_property='${id}'`;
    const arreglo=await fetch(url,  {
      headers: {
        "Content-Type": "application/json", // <-- Importante el encabezado
      },
      method: "GET"
    });
    const jsonDecodificado = await arreglo.json();
    
    return jsonDecodificado.body;
  }

  async deletePhoto(id: String | undefined) {
    const url=this.URI+`/eliminar?id='${id}'`;
    const arreglo=await fetch(url,  {
      headers: {
        "Content-Type": "application/json", // <-- Importante el encabezado
      },
      method: "DELETE"
    });
    const jsonDecodificado = await arreglo.json();
    console.log(jsonDecodificado);
    if(jsonDecodificado.error === false){
      alert(`Se eliminó con exito!`);
    }else{
      console.log(jsonDecodificado.body)
      alert("No se pudo eliminar, a ocurrido un problema")
    }
        
    return jsonDecodificado.body;
  }

  async updatePhoto(id_property: string, property: string, area_p:string, n_cuartos:string, n_banos:string, n_parqueadores:string, valor:string, descripcion: string, photo: File | string) {

    var fd = new FormData();
    fd.append('id_property', id_property);
    fd.append('property', property);
    fd.append('area_p', area_p); 
    fd.append('n_cuartos', n_cuartos);
    fd.append('n_banos', n_banos);
    fd.append('n_parqueaderos', n_parqueadores);
    fd.append('valor', valor);
    fd.append('descripcion', descripcion);
    fd.append('estado', "A");
    fd.append('image', photo);
    
    var request = new XMLHttpRequest();
    request.open("POST", this.URI);
    request.send(fd);
    
    request.onload = function() { 
      var rta= JSON.parse(request.response); 
      if (rta.error == true) { 
        alert(`Status ${rta.status}. Error ${rta.error} . No guardo el contenido`); 
      } else { 
        alert(`Se actualizó con exito!`); 
      }
      return rta.body
    }
  }
}
