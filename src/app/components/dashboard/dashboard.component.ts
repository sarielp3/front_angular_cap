import { Component, OnInit, Input } from '@angular/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../models/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faQrcode = faQrcode;
  closeModal!: string;
  div_items: Item[] = [];
  sel_item!: Item;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    let counter = 1;
    for (let j = 0; j < 10; j++) {
      let itm: Item = {
        id: j + 1,
        class: '',
        text: '',
        cclass: '',
        curr_promo: 'Promo ' + (j + 1),
        curr_desc:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
      };

      switch (counter) {
        case 1:
          itm.class = 'col-sm-8';
          itm.text = '3X2 En';
          break;
        case 2:
          itm.class = 'col-sm-4';
          itm.text = '% OFF';
          break;
        case 3:
          itm.class = 'col-sm-2';
          itm.text = 'Promo';
          itm.cclass = 'bg-item-2';
          break;
        case 4:
          itm.class = 'col-sm-6';
          itm.text = 'Jueves y Viernes';
          itm.cclass = 'background-img-item';
          break;
        case 5:
          itm.class = 'col-sm-4';
          itm.text = 'Precopeo';
          break;
      }

      this.div_items.push(itm);

      if (counter == 5) {
        counter = 0;
      }

      counter++;
    }

    //console.log('items', this.div_items.length);
  }

  triggerModal(content :any, item:any) {
    this.sel_item = item;
    this.modalService
      .open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        res => {
          this.closeModal = `Closed with: ${res}`;
        },
        res => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
