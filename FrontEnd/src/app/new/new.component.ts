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
  fileInputs: string[] = ['fileUpload1', 'fileUpload2', 'fileUpload3'];

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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          if (img.width > 500 || img.height > 500) {
            alert("A képnek maximum 500x500 px-nek kell lennie.");
            event.target.value = '';
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }

  addFileInput(): void {
    if (this.inputCount < 15) {
      this.inputCount++;
      // this.fileInputs.push(fileUpload${this.inputCount});
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

  if (this.albumTitle) {
    const album = {
      title: this.albumTitle
    };
    this.cartService.addProduct(album);  // Kosárba adás
    alert("Album hozzáadva a kosárhoz!");
  } else {
    alert("Kérlek add meg a címét az albumhoz!");
  }
}

}
