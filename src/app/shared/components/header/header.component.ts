import { Component, Inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService, User } from '@auth0/auth0-angular';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

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

  constructor(private auth: AuthService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
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
