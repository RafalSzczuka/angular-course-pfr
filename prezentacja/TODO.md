**Propozycja: Aplikacja do zarządzania przepisami kulinarnymi (Recipe Manager)**

Ta aplikacja pozwala użytkownikom dodawać, edytować, usuwać i przeglądać przepisy kulinarne. Może zawierać informacje takie jak składniki, instrukcje przygotowania, czas gotowania i zdjęcia. Dodatkowo aplikacja może pozwalać użytkownikom filtrować przepisy według kategorii (np. śniadanie, obiad, deser), a także umożliwiać wyszukiwanie ulubionych potraw.

**Struktura kursu i tematyka**:

**Moduł 1: Wprowadzenie do Angulara**
Instalacja Angular CLI i stworzenie projektu.
Omówienie struktury projektu, w tym modułów, komponentów, serwisów.
Tworzenie pierwszego komponentu: wyświetlanie listy przepisów kulinarnych.

**Moduł 2: Komponenty - style, cykl życia komunikacja między komponentami (Data Binding)**
Wprowadzenie do tematu styli w Angular, style globalne, style komponentów.
Stylizacja powstałego komponentu wyświetlającego liste przepisów.
Stworzenie komponentu który wyświetli szczegóły wybranego przepisu na tym przykładzie wyjaśnienie - Data binding: wyjaśnienie interpolation, property binding i event binding

**Moduł 3: Serwisy i zarządzanie danymi**
Tworzenie serwisu do przechowywania przepisów.
Wstrzykiwanie serwisu do komponentu, aby oddzielić logikę od wyświetlania.
Przechowywanie i aktualizacja przepisów (dodawanie, edytowanie, usuwanie).

**Moduł 4: Formularze i walidacja**
Two-way data binding: formularz do wprowadzania nowego przepisu.
Tworzenie formularza do dodawania i edytowania przepisów z walidacją pól (np. wymagana nazwa przepisu, minimalna liczba składników).
Użycie Reactive Forms lub Template-driven Forms.

**Moduł 5: Routing i nawigacja**
Routing: tworzenie wielostronicowej aplikacji.
Dodanie widoków dla różnych części aplikacji, takich jak: lista przepisów, szczegóły przepisu, formularz dodawania/edycji przepisu.
Widok szczegółowy przepisu: wyświetlanie składników i instrukcji po kliknięciu na dany przepis.

**Moduł 6: HTTP Client – komunikacja z serwerem**
Pobieranie przepisów z API: wprowadzenie do komunikacji z backendem.
Wysyłanie żądań HTTP do serwera (np. zapisywanie, aktualizowanie i usuwanie przepisów).
Użycie JSON-server jako lokalnego backendu do symulacji rzeczywistej bazy danych.

**Moduł 7: Dyrektywy i Pipes**
Użycie dyrektyw strukturalnych, takich jak *ngFor i *ngIf, aby dynamicznie generować listę przepisów.
Pipes: wyświetlanie przepisów w estetyczny sposób, np. formatowanie czasu gotowania (np. "45 minut" zamiast "45").

**Moduł 8: Filtrowanie i wyszukiwanie**
Filtrowanie przepisów według kategorii (np. śniadanie, obiad, deser).
Wyszukiwanie przepisów na podstawie nazwy.
Dodanie paska wyszukiwania i funkcji dynamicznego filtrowania wyników.

**Moduł 9: Obsługa plików i zdjęć**
Dodawanie możliwości wgrania zdjęcia do przepisu.
Podgląd zdjęć dla każdego przepisu w szczegółowym widoku przepisu.

**Moduł 10: Stylizacja i responsywność**
Dodanie stylów za pomocą Angular Material lub niestandardowego CSS.
Zadbaj o to, by aplikacja była responsywna i dobrze wyglądała na urządzeniach mobilnych.

**Jakie koncepty wprowadza aplikacja do zarządzania przepisami?**

**Komponenty i modularność:**

Nauka tworzenia różnych komponentów, takich jak lista przepisów, szczegóły przepisu, formularz dodawania/edytowania przepisu.

**Data Binding:**

Użytkownicy wprowadzają dane do formularza, a aplikacja dynamicznie wyświetla wprowadzone informacje.

**Serwisy i Dependency Injection:**

Logika dotycząca zarządzania przepisami (dodawanie, usuwanie, edytowanie) będzie umieszczona w serwisie, co umożliwi jej łatwe ponowne wykorzystanie w różnych komponentach.

**Routing i nawigacja:**

Użytkownicy mogą przemieszczać się pomiędzy stroną z listą przepisów, stroną dodawania nowego przepisu i szczegółami danego przepisu.

**HTTP Client i komunikacja z backendem:**

Praktyczna nauka wysyłania i odbierania danych z serwera (czy to lokalnego JSON-server, czy z prawdziwego API).

**Formularze i walidacja:**

Tworzenie formularzy z dynamiczną walidacją, co jest jednym z kluczowych elementów w każdej aplikacji.

**Pipes i dyrektywy:**

Dynamiczne generowanie treści na podstawie danych użytkownika i formatowanie wyświetlanych wartości.

**Filtrowanie i wyszukiwanie:**

Użytkownicy mogą przeszukiwać przepisy według kategorii lub wyszukiwać je według nazwy.

**Końcowy efekt:**

Użytkownik kończący kurs będzie miał gotową aplikację do zarządzania przepisami kulinarnymi, która jest dynamiczna, responsywna i korzysta z pełni możliwości Angulara. Taki projekt daje świetną podstawę do budowania bardziej zaawansowanych aplikacji i jednocześnie jest na tyle interesujący, by angażować użytkowników w naukę.

To również aplikacja, którą można dalej rozwijać, np. dodając funkcje takie jak autoryzacja użytkownika, personalizacja ulubionych przepisów czy integracja z zewnętrznymi bazami danych.