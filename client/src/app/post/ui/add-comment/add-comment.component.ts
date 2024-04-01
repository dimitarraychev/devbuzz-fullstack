import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit, OnDestroy {
  @Input() username: string | undefined = 'Guest';
  @Input() isLogged: boolean = false;

  @Output() add = new EventEmitter<string>();

  ngOnInit(): void {
    this.formSubscription = this.subscribeToFormChanges();
  }

  errorMessage: string | null = null;
  private formSubscription: Subscription = new Subscription();

  commentTextControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(5), Validators.maxLength(300)],
  });

  subscribeToFormChanges(): Subscription {
    return this.commentTextControl.valueChanges.subscribe(() => {
      if (this.commentTextControl.invalid)
        return (this.errorMessage = this.validationErrorHandler());
      return (this.errorMessage = null);
    });
  }

  onAdd(): void {
    if (!this.isLogged) return;

    const message: string = this.commentTextControl.value;

    if (this.commentTextControl.invalid) return;

    this.add.emit(message);
    this.commentTextControl.reset();
  }

  validationErrorHandler(): string {
    if (
      this.commentTextControl.hasError('minlength') ||
      this.commentTextControl.hasError('maxlength')
    )
      return 'Oops, comment should be between 5 and 300 characters.';
    return 'A wild error occurred! Try again.';
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
