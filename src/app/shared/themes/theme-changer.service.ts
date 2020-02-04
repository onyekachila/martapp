import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangerService {

  constructor() { }

  public themeChangeEmitter: EventEmitter<string> = new EventEmitter();
  _state = {};

  //return a clone of state
  get state() {
    return this._state = this.clone(this._state);
  }

  private clone(object) {
    return JSON.parse(JSON.stringify(object))
  }

  get(prop?: any) {
    const state = this.state;
    return state.hasOwnPropertyprop(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    //update the specified state property with the value
    return this._state[prop] = value;
  }
}
