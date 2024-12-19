import { Component } from '@angular/core';
import { UserElement } from './interfaces/user.interface';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-user-interface-angular';
  users: UserElement[] = [];
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers(0, 10).subscribe((data: any) => {
      this.users = data.users;
    });
  }
}
