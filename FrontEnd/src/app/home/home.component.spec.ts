import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test-host',
  template: `
    <div class="slider">
      <div #slide class="slide" *ngFor="let slide of slidesData">{{ slide }}</div>
    </div>
    <button class="prev" (click)="showPrevSlide()">Prev</button>
    <button class="next" (click)="showNextSlide()">Next</button>
  `
})
class TestHostComponent {
  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  slidesData = ['Slide 1', 'Slide 2', 'Slide 3'];
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the first slide initially', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('should move to the next slide when showNextSlide is called', () => {
    component.showNextSlide();
    expect(component.currentIndex).toBe(1);
  });

  it('should move to the previous slide when showPrevSlide is called', () => {
    component.currentIndex = 1;
    component.showPrevSlide();
    expect(component.currentIndex).toBe(0);
  });

  it('should loop back to the last slide when going back from the first slide', () => {
    component.currentIndex = 0;
    component.showPrevSlide();
    expect(component.currentIndex).toBe(component.slides.length - 1);
  });

  it('should loop to the first slide when moving forward from the last slide', () => {
    component.currentIndex = component.slides.length - 1;
    component.showNextSlide();
    expect(component.currentIndex).toBe(0);
  });
});
