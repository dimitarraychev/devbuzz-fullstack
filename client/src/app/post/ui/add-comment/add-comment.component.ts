import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Input() username: string | undefined = 'Guest';

  @Output() add = new EventEmitter<string>();

  constructor() {
    this.commentTextControl.valueChanges.subscribe(() => {
      if (this.commentTextControl.invalid)
        return (this.errorMessage = this.formErrorHandler());
      return (this.errorMessage = null);
    });
  }

  errorMessage: string | null = null;

  commentTextControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(300),
    ],
  });

  onAdd(): void {
    const message: string = this.commentTextControl.value;

    if (this.commentTextControl.invalid) {
      this.errorMessage = this.formErrorHandler();
      return;
    }

    this.add.emit(message);
    this.commentTextControl.reset();
  }

  formErrorHandler(): string {
    if (
      this.commentTextControl.hasError('required') ||
      this.commentTextControl.hasError('minlength') ||
      this.commentTextControl.hasError('maxlength')
    )
      return 'Oops, comment should be between 5 and 300 characters.';
    return 'A wild error occurred! Try again.';
  }
}
