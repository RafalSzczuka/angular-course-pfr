##### Moduł 1: Wprowadzenie do Angulara

1. **Instalacja Angular CLI.**
     * `npm install -g @angular/cli`

2. **Stworzenie projektu**
    * `ng new recipe-manager`
    
  
    > Angular CLI poprosi o kilka konfiguracji
    > * wybierz SCSS jako preprocesor CSS 
    > * potwierdź dodanie Routingu.


3. **Instalacja zależności**

   _Po stworzeniu projektu, przejdźmy do jego lokalizacji w terminalu:_
   * `cd recipe-manager`
  
   _Następnie zainstalujmy zależności:_
   * `npm install`

4. **Uruchom serwer deweloperski**
   _W terminalu, będąc w lokalizacji projektu wykonaj:_
     * `ng serve`


    > Projekt defaultowo będzie dostępny pod adresem http://localhost:4200.
    > package.json zawiera sekcje scripts, ng serve jest tam zdefiniowany jako **start**
    > 
    > Żeby użyć takiego skryptu wykonaj polecenie
    > * npm run start
    >
    > Możesz dowolnie definiować własne skrypty, skrypty mogą zawierać flagi


5. Teraz omówimy sobie strukturę powstałego projektu wyjaśnimy co oznaczają pliki/foldery takie jak:
    * angular.json
    * package.json
    * package-lock.json
    * tsconfig.*.json
    * index.html
    * main.ts
    * style.scss
    * /app


6. Dlaczego projekt nie zawiera żadnego modułu?

7. Tworzenie pierwszego komponentu: wyświetlanie listy przepisów kulinarnych.