import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private tabStates: { [key: string]: any } = {};
  private tabListKey = 'tabList';

  constructor() {}

  setTabState(tabId: string, state: any): void {
    this.tabStates[tabId] = state;
    sessionStorage.setItem(tabId, JSON.stringify(state));
  }

  getTabState(tabId: string): any {
    if (this.tabStates[tabId]) {
      return this.tabStates[tabId];
    }
    const state = sessionStorage.getItem(tabId);
    return state ? JSON.parse(state) : null;
  }

  removeTabState(tabId: string): void {
    delete this.tabStates[tabId];
    sessionStorage.removeItem(tabId);
  }

  saveTabList(tabs: { id: string, label: string }[]): void {
    sessionStorage.setItem(this.tabListKey, JSON.stringify(tabs));
  }

  loadTabList(): { id: string, label: string }[] {
    const tabList = sessionStorage.getItem(this.tabListKey);
    return tabList ? JSON.parse(tabList) : [];
  }
}
