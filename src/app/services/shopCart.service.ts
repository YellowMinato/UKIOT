import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CommonService } from './commonfunc.service';

@Injectable({ providedIn: 'root' })
export class ShopCartService {
  public CartUpdate = new BehaviorSubject<any>(false);
  cart = [];
  constructor(
    public ngZone: NgZone,
    public CF: CommonService
    ) {
    if (this.CF.isBrowser) {
      const CART: any = JSON.parse(sessionStorage.getItem('pcart'))
      this.cart = (CART) ? CART : [];
    }
  }
  AddToShopCart(item: any) {
    this.ngZone.run(() => {     
      const Exist = this.cart.find(o => o.produceCode === item.produceCode);
      if (Exist) {
        if (item.Quantity === 0 && item.SQuantity === 0) {
          this.cart = this.cart.filter((o: any) => o.produceCode !== item.produceCode);
          return;
        } else {
          this.cart.forEach(cart => {
            if (cart.produceCode === item.produceCode) {
              cart.Quantity = item.Quantity;
              cart.SQuantity = item.SQuantity;
            }
          })
        }
        return;
      }
      this.cart.push(item);
      return
    })
    this.CartUpdate.next(true);
    this.CartUpdate.next(false);
  }
  get ProduceCart() {
    if (this.CF.isBrowser) { sessionStorage.setItem('pcart', JSON.stringify(this.cart)) }
    return this.cart;
  }
  get Single() {
    return this.ProduceCart.filter(o => o.Quantity !== 0);
  }
  get Subscriptions() {
    return this.ProduceCart.filter(o => o.SQuantity !== 0);
  }
  get Qty() {
    let d = { qty: 0, value: 0, SavedAmount: 0, GST: 0 }
    let SINQTY: number = 0, SUBQTY: number = 0, SINVAL: number = 0, SUBVAL: number = 0, SavedSin = 0, GST = 0;
    if (this.ProduceCart.length !== 0) {
      for (let i = 0; i < this.Single.length; i++) {
        if (this.Single[i].price) {
          SINQTY += parseInt(this.Single[i].Quantity);
          this.Single[i].price = this.Single[i].price;
          SINVAL += parseInt(this.Single[i].price) * this.Single[i].Quantity;
          SavedSin += parseInt(this.Single[i].Disc_amt) * this.Single[i].Quantity;
          // GST += parseInt(this.Single[i].gst) * this.Single[i].Quantity;
          GST += (parseInt(this.Single[i].price) * parseInt(this.Single[i].gst) / 100) * this.Single[i].Quantity;        
        }
      }
      for (let i = 0; i < this.Subscriptions.length; i++) {
        if (this.Subscriptions[i].Suprice) {
          SUBQTY += parseInt(this.Subscriptions[i].SQuantity);
          this.Subscriptions[i].Suprice = this.Subscriptions[i].Suprice;
          SUBVAL += parseInt(this.Subscriptions[i].Suprice) * this.Subscriptions[i].SQuantity * 4;
        }
      }
      return d = { qty: SINQTY + SUBQTY, value: SINVAL + SUBVAL, SavedAmount: SavedSin, GST: GST };
    } else {
      return d = { qty: 0, value: 0, SavedAmount: 0, GST: 0 };
    }
  }
}
