constructor(private router: Router) {
    this.router.events.subscribe(e => { // subskrybujemy się do strumienia events
        if (e instanceof NavigationStart) { // sprawdzamy instancje
            this.isLoading = true // gdy nawigacja startuje chcemy widzieć loader
        }
        if (e instanceof NavigationEnd) {
            this.isLoading = false // w każdym innym przypadku chcemy go wyłączyć
        }
        if (e instanceof NavigationCancel) {
            this.isLoading = false
        }
        if (e instanceof NavigationError) {
            this.isLoading = false
        }
    })
}