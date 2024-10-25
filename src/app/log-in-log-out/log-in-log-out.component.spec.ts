import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInLogOutComponent } from './log-in-log-out.component';

describe('LogInLogOutComponent', () => {
  let component: LogInLogOutComponent;
  let fixture: ComponentFixture<LogInLogOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInLogOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogInLogOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
