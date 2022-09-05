import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    // this is an old approach. basically what developers do in the old day
    return {
      'click:.set-age': this.onSetAge,
      'click:.set-name': this.onSetName,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSetAge = (): void => {
    this.model.setRandomAge();
  };

  onSetName = (): void => {
    // we get the input manually as "click:.set-name" wont pass an event object
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  onSaveClick = (): void => {
    this.model.save();
  };

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
