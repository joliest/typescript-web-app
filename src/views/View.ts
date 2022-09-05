import { Model } from '../models/Models';

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;

  protected eventsMap(): { [key: string]: () => void } {
    return {};
  }

  // renders view whenever you make a change
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
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
