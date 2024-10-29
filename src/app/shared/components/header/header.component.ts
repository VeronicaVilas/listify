import { Component, Inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService, User } from '@auth0/auth0-angular';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  profile!: User | null | undefined;
  isAuthenticated$!: Observable<boolean>;
  loggedInUser: any;

  constructor(private auth: AuthService, private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;

      if (profile) {
        this.saveUser(profile);
      }
    });
  }

  saveUser(profile: any) {
    const userData = {
      picture: profile.picture,
      name: profile.name,
      email: profile.email,
    };

    // Verifica se o usuário já existe no servidor com base no email
    this.http.get<any[]>(`http://localhost:3000/users?email=${userData.email}`).subscribe({
      next: (users) => {
        if (users.length === 0) {
          // Se não existe, salva o usuário
          this.http.post('http://localhost:3000/users', userData).subscribe({
            next: () => console.log('Usuário salvo com sucesso no json-server'),
            error: (err) => console.error('Erro ao salvar usuário:', err),
          });
        } else {
          console.log('Usuário já existe no json-server');
        }
      },
      error: (err) => console.error('Erro ao verificar duplicação de usuário:', err),
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {returnTo: this.document.location.origin,},
    });
  }
}
