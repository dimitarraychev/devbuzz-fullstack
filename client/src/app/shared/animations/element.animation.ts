import { animate, style, transition, trigger } from '@angular/animations';

export const slideFromLeftState = trigger('slideFromLeftState', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate(
      '300ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

export const slowedSlideFromLeftState = trigger('slowedSlideFromLeftState', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate(
      '400ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

export const slowestSlideFromLeftState = trigger('slowestSlideFromLeftState', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);
