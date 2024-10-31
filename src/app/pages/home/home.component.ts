import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { LearnMoreComponent } from './learn-more/learn-more.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule,  MatDialogModule, LearnMoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  matSnackBar = inject(MatSnackBar);
  profile!: User | null | undefined;
  isAuthenticated$!: Observable<boolean>;
  userId!: string;
  readonly dialog = inject(MatDialog);

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

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
          this.http.post<any>('http://localhost:3000/users', userData).subscribe({
            next: (newUser) => {
              this.userId = newUser.id;
              localStorage.setItem('userId', this.userId);
              setTimeout(() => {
                window.location.reload();
              });
            },
            error: () => {
              this.matSnackBar.open('Erro ao realizar login. Por favor, faça login novamente!', 'Fechar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            },
          });
        } else {
          this.userId = users[0].id;
          localStorage.setItem('userId', this.userId);
          setTimeout(() => {
            window.location.reload();
          });
        }
      },
      error: () => {
        this.matSnackBar.open('Erro ao verificar o usuário. Por favor, faça login novamente!', 'Fechar', {
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

  openDialog() {
    this.dialog.open(LearnMoreComponent);
  }
}
