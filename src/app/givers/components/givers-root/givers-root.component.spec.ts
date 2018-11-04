import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiversRootComponent } from './givers-root.component';

describe('GiversRootComponent', () => {
  let component: GiversRootComponent;
  let fixture: ComponentFixture<GiversRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiversRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiversRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
