import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  billingData = {
    lastName: '',
    firstName: '',
    address: '',
    zipCode: '',
    phone: '',
    email: ''
  };

  changePassword() {
    const newPassword = prompt('Adja meg az új jelszót:');
    if (newPassword) {
      console.log('Jelszó módosítva:', newPassword);
      alert('Jelszó sikeresen módosítva!');
    }
  }

  saveBillingInfo() {
    console.log('Mentett számlázási adatok:', this.billingData);
    alert('Számlázási információk mentve!');
  }
}
