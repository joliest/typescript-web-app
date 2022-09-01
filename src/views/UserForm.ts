import { User } from '../models/User';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  // renders view whenever you make a change
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    // this is an old approach. basically what developers do in the old day
    return {
      'click:.set-age': this.onSetAge,
      'click:.set-name': this.onSetName,
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

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User name: ${this.model.get('age')}</div>
        <input />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      // provides array of element that matches the fragment (eg. button)
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  clearView(): void {
    this.parent.innerHTML = '';
  }

  render(): void {
    this.clearView();

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    const doumentFragment = templateElement.content;
    this.bindEvents(doumentFragment);

    this.parent.append(doumentFragment);
  }
}
