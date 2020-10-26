import { Component } from '@angular/core';

/**
 * @component PartnershipsComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss'],
})
export class PartnershipsComponent {
  // Array to hold all Cyber Security services.
  // TODO: Make this interface.
  public partnershipsItems: {
    description: string;
    icon: string;
    name: string;
  }[] = [
    {
      description:
        'Sample content goes here... Sample content goes here... Sample content goes here... Sample content goes here...',
      icon: 'grade',
      name: 'Creative Agencies',
    },
    {
      description:
        'Sample content goes here... Sample content goes here... Sample content goes here... Sample content goes here...',
      icon: 'perm_identity',
      name: 'Freelancers',
    },
    {
      description:
        'Sample content goes here... Sample content goes here... Sample content goes here... Sample content goes here...',
      icon: 'code',
      name: 'Software Houses',
    },
  ];
}
