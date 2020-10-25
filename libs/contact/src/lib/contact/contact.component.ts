// TODO: Add SweetAlerts with a progressbar on form reset, control behaviour of the form with errors.
// TODO: Add Google Maps component.
// TODO: Add keeping state for contact form (it might be done using localStorage to persist data maybe) or some kind of state management using NgRx etc.

import { AngularFirestore } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { catchError, finalize } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FileValidator } from 'ngx-material-file-input';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { throwError } from 'rxjs';

// TODO: Add verbose datepicker with custom formats.
// TODO: Change all the public to private.
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  public acceptedTerms = false;
  public currentDate: Date = new Date();
  public maxFileSize = 20971520;
  public servicesItems: string[] = [
    'Cyber Security',
    'Digital Strategy',
    'Software Development',
  ];
  public downloadURL: string[] = [];

  // Create max deadline dynamically 5 years from now.
  public day: number = this.currentDate.getDate();
  public month: number = this.currentDate.getMonth();
  public year: number = this.currentDate.getFullYear();
  public maxDate: Date = new Date(this.year + 5, this.month, this.day);

  /**
   * @constructor
   * @description Creates a new instance of this component.
   * @param  {formBuilder} - an abstraction class object to create a form group control for the contact form.
   */
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {}

  // Create contact form with all required validators.
  public contactForm: FormGroup = this.formBuilder.group({
    acceptedTerms: ['', Validators.required],
    fileUploader: [
      '',
      Validators.compose([
        FileValidator.maxContentSize(this.maxFileSize),
        Validators.maxLength(512),
        Validators.minLength(2),
      ]),
    ],
    formControlContactPreference: '',
    formControlDeadline: '',
    formControlDescription: [
      '',
      Validators.compose([
        Validators.maxLength(5000),
        Validators.minLength(30),
        Validators.required,
      ]),
    ],
    formControlEmail: [
      '',
      Validators.compose([
        Validators.email,
        Validators.maxLength(512),
        Validators.minLength(6),
        Validators.required,
      ]),
    ],
    formControlName: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
    ],
    formControlPhone: [
      '',
      Validators.compose([
        Validators.maxLength(14),
        Validators.minLength(4),
        Validators.pattern('^[0-9]*$'),
      ]),
    ],
    formControlService: '',
    recaptchaCheck: ['', Validators.required],
  });

  /**
   * @description Filter available days in the datepicker to choose.
   * @param {Date} date Instance of date.
   * @returns {boolean}
   */
  public filterAvailableDays = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Prevent Saturday and Sunday from being selected.
  };

  /**
   * @description Handle state of accepted terms.
   * @returns {void}
   */
  public handleTerms(): void {
    this.acceptedTerms = !this.acceptedTerms;
  }

  /**
   * @description Check if phone in contact form has an error.
   * @param {event} - event for handling the error.
   * @returns {void}
   */
  public hasError(event: any): void {
    if (!event && this.contactForm.value.formControlPhone !== '') {
      this.contactForm
        .get('formControlPhone')! // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
        .setErrors(['invalid_cell_phone', true]);
    }
  }

  /**
   * @description Perform certain behaviours on button submit of the contact form, both of the parameters are required due to technical requirements.
   * @param {any} form Object of submitted contact form.
   * @param {FormGroupDirective} formDirective Object required to reset validators.
   * @returns {void}
   */
  public onSubmit(form: any, formDirective: FormGroupDirective): void {
    form.fileUploader = this.downloadURL;

    // TODO: Check if it works on deployment.
    this.angularFirestore
      .collection(String(process.env.FIRESTORE_COLLECTION_MESSAGES)) // Make sure the environmental variable is a string.
      .add(form)
      .then(() => {
        this.contactForm.reset(); // Reset form once user will click "Send Message".
        formDirective.resetForm(); // Reset validators, i.e. to workaround #4190 (https://github.com/angular/components/issues/4190).
        this.acceptedTerms = false;
      })
      .catch(() => {
        throw new Error('Error with submitting contact form.'); // throw an Error
      });
  }

  // TODO: Fix this after upgrade to Angular 10 isn't working.
  /**
   * @description Upload additional files to Cloud Firestore and get URL to the files.
   * @param {any} event Object of sent files.
   * @returns {void}
   */
  public uploadFile(event: any): void {
    // Iterate through all uploaded files.
    for (let i = 0; i < event.target.files.length; i++) {
      const randomId = Math.random().toString(36).substring(2); // Create random ID, so the same file names can be uploaded to Cloud Firestore.

      const file = event.target.files[i]; // Get each uploaded file.

      // Get file reference.
      const fileRef: AngularFireStorageReference = this.angularFireStorage.ref(
        randomId
      );

      // Create upload task.
      const task: AngularFireUploadTask = this.angularFireStorage.upload(
        randomId,
        file
      );

      // Upload file to Cloud Firestore.
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadURL: string) => {
              this.angularFirestore
                .collection(String(process.env.FIRESTORE_COLLECTION_FILES)) // Make sure the environmental variable is a string.
                .add({ downloadURL: downloadURL });
              this.downloadURL.push(downloadURL);
            });
          }),
          catchError((error: any) => {
            return throwError(error);
          })
        )
        .subscribe();
    }
  }
}
