import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  currentIndex: number = 0;

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
}
