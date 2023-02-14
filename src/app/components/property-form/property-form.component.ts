import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {PhotoService} from '../../services/photo.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent {

  file: File | string='';
  photoSelected!: string | ArrayBuffer | null;

  constructor(private photoService: PhotoService, private router: Router) { }
  
  onPhotoSelected(event: HtmlInputEvent): void { 
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview, remplazar imagen
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, a: HTMLInputElement, nc: HTMLInputElement, nba: HTMLInputElement,np: HTMLInputElement,val: HTMLInputElement, des: HTMLTextAreaElement):boolean {
    
    this.photoService
      .createPhoto(title.value, a.value, nc.value, nba.value, np.value, val.value, des.value, this.file)
    
    this.router.navigate(['/property']);      
    return false;
  }
} 
