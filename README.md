# PreceptorTimeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

This project was created to demonstrate skillset in angular.

Skills utilizied:
- components, services, routing, authentication guards, modules (which are dynamically loaded), directives, angular forms, a setup that loads different services based on the environment settings, etc....

# Design 

The app primary use case is to record time that preceptors spend with their medical students/residents.  The application can also run reports by year.  The accounts that can be created are student, resident, preceptor, and admin.  The student and preceptor, can view the time that preceptors log for them.  The preceptor and admin accounts, can create time entries, run their respective reports.  The admin account can reset passwords and disable/enable accounts.

I got the idea for this application from the director of pharmacy from U of M.  He needed a simple way to have preceptors record their time with students.  This data is then used to maintain their accreditation. 

Currently the code is using a fake back-end which is hardcoded.  It does not persist anything if you navigate away.  Since it is fake you can login with any user name and password (when you login this way you will automatically be treated as an admin).  If you login by going to the Register page, then you can create any account type this way.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
