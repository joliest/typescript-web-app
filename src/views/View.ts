import { Model } from '../models/Models';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.clearView();

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    const documentFragment = templateElement.content;
    this.bindEvents(documentFragment);
    this.mapRegions(documentFragment);

    this.onRender();

    this.parent.append(documentFragment);
  }
}
