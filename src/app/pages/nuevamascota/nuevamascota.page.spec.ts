import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevamascotaPage } from './nuevamascota.page';

describe('NuevamascotaPage', () => {
  let component: NuevamascotaPage;
  let fixture: ComponentFixture<NuevamascotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevamascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
