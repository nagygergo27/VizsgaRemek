import { Component } from '@angular/core';
import { CartService } from '../cart.service';  // Importáljuk a CartService-t

@Component({
  selector: 'app-new',
  standalone: false,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  inputCount: number = 3;
  fileInputs: any[] = new Array(3).fill(null); // Kezdetben 3 input mező

  albumCoverPreview: string | null = null;
  albumTitle: string = '';  // Album címe, amit a felhasználó beír

  constructor(private cartService: CartService) {}

  onAlbumCoverSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.albumCoverPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any, index: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileInputs[index] = file; // A kiválasztott fájlt mentjük a megfelelő indexen
    }
  }

  addFileInput(): void {
    if (this.fileInputs.length < 15) {
      this.fileInputs.push(null); // Új üres mezőt adunk hozzá
      this.inputCount++;
    }
  }

  removeFileInput(index: number): void {
    if (this.fileInputs.length > 3) {
      this.fileInputs.splice(index, 1);
      this.inputCount--;
    }
  }

  addToCart(): void {
    console.log("Album címe: ", this.albumTitle);
    
    if (this.albumTitle.trim()) {
      const album = {
        title: this.albumTitle,
        cover: this.albumCoverPreview,
        tracks: this.fileInputs.filter(file => file !== null) // Csak a feltöltött fájlokat küldjük tovább
      };

      this.cartService.addProduct(album);  // Kosárba adás
      alert("Album hozzáadva a kosárhoz!");
    } else {
      alert("Kérlek add meg a címét az albumhoz!");
    }
  }
}
