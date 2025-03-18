import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  currentIndex: number = 0;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userName: string = '';

  ngAfterViewInit() {
    this.showSlide(this.currentIndex);
  }

  showSlide(index: number) {
    if (!this.slides || this.slides.length === 0) return;

    this.slides.forEach((slide, i) => {
      const slideEl = slide.nativeElement;
      slideEl.classList.remove('active', 'hidden-left', 'hidden-right');

      if (i === index) {
        slideEl.classList.add('active');
      } else {
        slideEl.classList.add(i < index ? 'hidden-left' : 'hidden-right');
      }
    });
  }

  showNextSlide() {
    if (!this.slides || this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  }

  showPrevSlide() {
    if (!this.slides || this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  }
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getIsLoggedUser().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        const user = this.authService.loggedUser;
        this.userName = user?.displayName || ''; 
      } else {
        this.userName = '';
      }
    });

    this.authService.getIsAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
}
