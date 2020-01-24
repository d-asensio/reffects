import { store } from 'reffects-store';
import {
  registerHttpBatteries,
  registerGlobalBatteries,
} from 'reffects-batteries';
import registerStateEffect from './effects/setState';
import registerToastEffect from './effects/toast';

import registerStateCoeffect from './coeffects/state';
import registerDatetimeCoeffect from './coeffects/datetime';

import httpClient from './infrastructure/httpClient';
import timer from './infrastructure/timer';

import registerTodoListEvents from './todos/TodoList/events';

import { VISIBILITY_FILTERS_SHOW_ALL } from './todos/constants';

export function startApp() {
  window.apiUrl =
    'https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b';

  const initialState = {
    todos: [],
    visibilityFilter: VISIBILITY_FILTERS_SHOW_ALL,
    toast: {
      text: '',
      timeoutId: null,
      visible: false,
    },
  };

  store.initialize(initialState);

  // Reffects' built in batteries
  registerHttpBatteries(httpClient);
  registerGlobalBatteries();

  // Custom effects/coeffects & events
  registerEffects();
  registerCoeffects();
  registerEvents();
}

function registerEffects() {
  registerStateEffect(store);
  registerToastEffect(store, timer);
}

function registerCoeffects() {
  registerStateCoeffect(store);
  registerDatetimeCoeffect(Date);
}

function registerEvents() {
  registerTodoListEvents();
}
