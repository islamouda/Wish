import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WishItem } from '../../model/wish-item/wish-item';

/*
  Generated class for the WishServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WishServiceProvider {
  private itemListRef = this.db.list<WishItem>('WishItem')


  constructor(
    public db:AngularFireDatabase) {
    console.log('Hello WishServiceProvider Provider');
  }



  getWishItemList(){
    return this.itemListRef;
  }
 
  addWishItem(wishItem:WishItem){
    return this.itemListRef.push(wishItem)
    
  }
 
  updateWishItem(wishItem:WishItem){
    return this.itemListRef.update(wishItem.key,wishItem)
    
  }
 
  
  removeWishItem(wishItem:WishItem){
    return this.itemListRef.remove(wishItem.key)
    
  }

  




}
