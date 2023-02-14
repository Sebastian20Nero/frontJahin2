import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { PhotoService } from '../../services/photo.service'
import { Property } from '../Interfaces/Property'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-property-preview',
  templateUrl: './property-preview.component.html',
  styleUrls: ['./property-preview.component.css']
})
export class PropertyPreviewComponent {
  id: string | undefined ;
  photo: Property | undefined;

  file: File | string='';
  photoSelected!: string | ArrayBuffer | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService, 
    private router: Router
  ) { }
  
  onPhotoSelected(event: HtmlInputEvent): void { 
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview, remplazar imagen
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const res =await this.photoService.getPhoto(params['id']) 
      this.photo= res[0];
      
    });
  }

   deletePhoto(id: String | undefined) { 
     this.photoService.deletePhoto(id)
     this.router.navigate(['/property']);   
    return false
  }
 
  updatePhoto(idp: HTMLInputElement, title: HTMLInputElement, a: HTMLInputElement, nc: HTMLInputElement, nba: HTMLInputElement,np: HTMLInputElement,val: HTMLInputElement, des: HTMLTextAreaElement, im: HTMLInputElement): boolean {
    var fileCarge: File | string=''
    
    if(this.file===""){ fileCarge=im.value }else{ fileCarge=this.file }

    this.photoService.updatePhoto(idp.value,title.value, a.value, nc.value, nba.value, np.value, val.value, des.value, fileCarge)
        this.router.navigate(['/property']);
    return false;
  }

 
}
