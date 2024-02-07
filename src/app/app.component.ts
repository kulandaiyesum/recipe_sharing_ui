import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './pages/auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'recipe-sharing-ui';

  user: any = null;
  constructor(private authService: AuthService) {}

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        console.log('user res', res);
      },
      error: (err: any) => {
        console.log('er', err);
      },
    });
    this.authService.authSubject.subscribe((auth: any) => {
      this.user = auth.user;
    });
  }
}
