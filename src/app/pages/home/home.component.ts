import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  matSnackBar = inject(MatSnackBar)
  profile!: User | null | undefined;
  isAuthenticated$!: Observable<boolean>;

  constructor(private auth: AuthService, private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;

      if (profile) {
        this.saveUser(profile);
        this.getToken();
      }
    });
  }

  saveUser(profile: any) {
    const userData = {
      picture: profile.picture,
      name: profile.name,
      email: profile.email,
    };

    this.http.get<any[]>(`http://localhost:3000/users?email=${userData.email}`).subscribe({
      next: (users) => {
        if (users.length === 0) {
          this.http.post('http://localhost:3000/users', userData).subscribe({
            next: () => {
              this.matSnackBar.open('Login realizado com sucesso!', 'Fechar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            },
            error: (err) => {
              this.matSnackBar.open('Erro ao realizar login. Por favor, faça login novamente!', 'Fechar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            },
          });
        } else {
          this.matSnackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        this.matSnackBar.open('Erro ao verificaro o usuário. Por favor, faça login novamente!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }


  getToken() {
    this.auth.getAccessTokenSilently().subscribe({
      error: (err) => {
        const snackBarRef = this.matSnackBar.open('Erro ao obter permissão. Faça login novamente para continuar.', 'Login', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        snackBarRef.onAction().subscribe(() => {
          this.login();
        });
        if (err.error === 'login_required' || err.error === 'consent_required') {
          const snackBarRef = this.matSnackBar.open('Sessão expirada! Por favor, faça login novamente para acessar.', 'Login', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
          });
          snackBarRef.onAction().subscribe(() => {
            this.login();
          });
        }
      },
    });
  }

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/shopping-list' }
    });
  }
}
