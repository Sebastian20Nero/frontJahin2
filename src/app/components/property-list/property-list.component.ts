import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { PhotoService } from '../../services/photo.service'
import { Property } from '../Interfaces/Property'

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  photos: Property[] = [];

  constructor(
    private photoService: PhotoService,
    private router: Router 
  ) { }

  async ngOnInit() {
    const res= await this.photoService.getPhotos()
    this.photos = res; 
  }

  async selectedCard(id: String | undefined ) {
    this.router.navigate(['/property', id]);
  }
}
