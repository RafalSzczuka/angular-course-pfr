const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard], // Sprawdza, czy użytkownik jest zalogowany Jeśli AuthGuard zwraca false, użytkownik nie przejdzie na path: 'home' ani path: 'admin’.
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard], // Sprawdza, czy użytkownik jest adminem
        canActivateChild: [AdminGuard], // Sprawdza, czy dzieci tej trasy też są chronione. W tej konfiguracji, nawet jeśli użytkownik uzyska dostęp do trasy nadrzędnej, musi spełniać warunki guardu AdminGuard, aby wejść na podstronę settings.
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
            }
        ]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canDeactivate: [ConfirmExitGuard], // Pyta, czy na pewno chcemy opuścić stronę. Ten guard jest użyteczny np. gdy na stronie jest formularz i użytkownik próbowałby opuścić stronę bez zapisania zmian.
    },
    {
        path: 'lazy',
        loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
        canLoad: [LoadGuard], // Sprawdza, czy można wczytać moduł lazy. Decyduje, czy moduł lazy (ładowany asynchronicznie) może zostać załadowany. Jest używany z loadChildren, na przykładzie path: 'lazy', aby określić, czy użytkownik ma uprawnienia do załadowania całego modułu. To zabezpieczenie działa przed faktycznym załadowaniem modułu i pobraniem kodu.
        canMatch: [LoadGuard], // Sprawdza, czy ścieżka pasuje do warunków guardu. Kontroluje, czy trasa pasuje do określonych warunków. Może działać równocześnie z canLoad, aby sprawdzić dostęp do trasy lazy na podstawie np. dodatkowych parametrów (np. dostosowania trasy względem wyrażenia regularnego lub parametru).
    },
    {
        path: 'details/:id',
        component: HomeComponent,
        resolve: { data: DataResolver }, // Pobiera dane zanim komponent się załaduje
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    } // Strona 404 - przekierowanie do strony domowej];
]
