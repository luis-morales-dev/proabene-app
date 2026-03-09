import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlosarioPage } from './glosario.page';

describe('GlosarioPage', () => {
  let component: GlosarioPage;
  let fixture: ComponentFixture<GlosarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
