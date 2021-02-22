// TODO: Add Google Maps component.
// TODO: Add keeping state for contact form (it might be done using localStorage to persist data maybe) or some kind of state management using NgRx etc.
// TODO: Read input length from file upload.

import Swal from 'sweetalert2';
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
  // TODO: Make this 1 array of interface which would hold content type, download URL and filename?
  public contentType: string[] = [];
  public downloadURL: string[] = [];
  public fileName: string = '';
  public maxFileSize = 20971520;
  public servicesItems: string[] = [
    'Cyber Security',
    'Digital Strategy',
    'Software Development',
  ];
  // TODO: Make this an interface.
  public validatorDescriptionMaxLength: number = 5000;
  public validatorDescriptionMinLength: number = 30;
  public validatorEmailMaxLength: number = 512;
  public validatorEmailMinLength: number = 6;
  public validatorNameMaxLength: number = 64;
  public validatorNameMinLength: number = 2;
  public validatorPhoneMaxLength: number = 14;
  public validatorPhoneMinLength: number = 4;

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
        Validators.maxLength(this.validatorDescriptionMaxLength),
        Validators.minLength(this.validatorDescriptionMinLength),
        Validators.required,
      ]),
    ],
    formControlEmail: [
      '',
      Validators.compose([
        Validators.email,
        Validators.maxLength(this.validatorEmailMaxLength),
        Validators.minLength(this.validatorEmailMinLength),
        Validators.required,
      ]),
    ],
    formControlName: [
      '',
      Validators.compose([
        Validators.maxLength(this.validatorNameMaxLength),
        Validators.minLength(this.validatorNameMinLength),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
    ],
    formControlPhone: [
      '',
      Validators.compose([
        Validators.maxLength(this.validatorPhoneMaxLength),
        Validators.minLength(this.validatorPhoneMinLength),
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
    form.contentType = this.contentType;
    form.fileUploader = this.downloadURL;
    form.fileName = this.fileName;

    // TODO: Add progressbar on file upload.
    // TODO: According to Vue course by Max throw should be in if/else statement and catch later.
    this.angularFirestore
      .collection(String(process.env.FIRESTORE_COLLECTION_MESSAGES)) // Make sure the environmental variable is a string.
      .add(form)
      .then(() => {
        Swal.fire(
          'E-mail sent to us.', // TODO: Unify all "Email" to "E-mail".
          'Thank you for filling and sending this contact form. We will get back to you as fast as possible.',
          'success'
        );
        this.contactForm.reset(); // Reset form once user will click "Send Message".
        formDirective.resetForm(); // Reset validators, i.e. to workaround #4190 (https://github.com/angular/components/issues/4190).
        this.acceptedTerms = false;
      })
      .catch(() => {
        Swal.fire(
          'Error occurred.',
          'It was not possible to send the contact form. Please try again or contact us directly.',
          'error'
        );
        throw new Error('Error with submitting contact form.'); // throw an Error
      });
  }

  /**
   * @description Upload additional files to Cloud Firestore and get URL to the files.
   * @param {any} event Object of sent files.
   * @returns {void}
   */
  public uploadFile(event: any): void {
    // Iterate through all uploaded files.
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]; // Get each uploaded file.
      const fileName = file.name + '_' + Date.now(); // It makes sure files with the same name will be uploaded more than once and each of them will have unique ID, showing date (in milliseconds) of the upload.

      this.contentType = file.type;
      this.fileName = fileName;

      // Get file reference.
      const fileRef: AngularFireStorageReference = this.angularFireStorage.ref(
        fileName
      );

      // Create upload task.
      const task: AngularFireUploadTask = this.angularFireStorage.upload(
        fileName,
        file,
        file.type
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
