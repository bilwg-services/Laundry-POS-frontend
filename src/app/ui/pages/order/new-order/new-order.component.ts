import { Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewOrderSingleComponent } from '../new-order-single/new-order-single.component';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  tabs: { id: string, label: string }[] = [];
  selectedTabIndex: number = 0;

  @ViewChild('tabContent', { read: ViewContainerRef }) tabContent!: ViewContainerRef;

  constructor(
    private orderService: OrderService,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.tabs = this.orderService.loadTabList();
  }

  ngAfterViewInit(): void {
    if (this.tabs.length === 0) {
      this.addTab();
    } else {
      this.loadTabContent();
    }
  }

  addTab(): void {
    const id = this.getNextTabId();
    const label = `EST #${id}`;
    this.tabs.push({ id, label });
    this.selectedTabIndex = this.tabs.length - 1;
    this.orderService.saveTabList(this.tabs);
    this.loadTabContent();
  }

  removeTab(index: number): void {
    const tabId = this.tabs[index].id;
    this.orderService.removeTabState(tabId);
    this.tabs.splice(index, 1);
    this.orderService.saveTabList(this.tabs);
    console.log('selectedTabIndex before', this.selectedTabIndex);
    console.log('index before', index);

    if (this.selectedTabIndex == index) {
      // If the selected tab is the one being closed
      this.selectedTabIndex = this.tabs.length > 0 ? this.selectedTabIndex - 1 : -1;
    } else if (this.selectedTabIndex > index) {
      // If the selected tab is after the one being closed, adjust the index
      this.selectedTabIndex--;
    }
    
    if (this.selectedTabIndex >= 0 && this.tabs.length > 0) {
     this.selectTab(this.selectedTabIndex);
    }
    console.log('selectedTabIndex afeter', this.selectedTabIndex);

    // this.loadTabContent();
  }

  selectTab(index: number): void {

    console.log('called', index);

    this.selectedTabIndex = index;
    this.loadTabContent();
  }

  loadTabContent(): void {
    this.tabContent.clear();
    console.log('selectedTabIndex in load', this.selectedTabIndex);
    const tab = this.tabs[this.selectedTabIndex];
    if (tab) {
      const factory = this.resolver.resolveComponentFactory(NewOrderSingleComponent);
      const componentRef = this.tabContent.createComponent(factory, 0, this.createInjector(tab.id));
      componentRef.instance.tabId = tab.id;
    }
  }

  createInjector(tabId: string): Injector {
    return Injector.create({
      providers: [{ provide: 'tabId', useValue: tabId }],
      parent: this.injector
    });
  }

  private getNextTabId(): string {
    const existingIds = this.tabs.map(tab => parseInt(tab.id, 10));
    let nextId = 1;
    while (existingIds.includes(nextId)) {
      nextId++;
    }
    return nextId.toString();
  }

}
