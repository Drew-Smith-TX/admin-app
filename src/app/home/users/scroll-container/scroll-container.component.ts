import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { throttle as _throttle, noop as _noop } from 'lodash-es';

enum ScrollDirection {
  UP = 'up',
  DOWN = 'down'
}

enum ScrollListener {
  HOST = 'scroll',
  WINDOW = 'window:scroll'
}

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss']
})
export class ScrollContainerComponent implements OnInit, OnChanges {

  private element: Element;
  private window: Element;
  public scrollTop = 0;
  @Input() more = true;
  @Input() scrollDelay = 500;
  @Input() scrollOffset = 1000;
  @Output() scrolled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @HostListener('scroll') scroll: Function;
  @HostListener('window:scroll') windowScroll: Function;

  constructor(private elRef: ElementRef) {
    this.element = this.elRef.nativeElement;
    this.window = document.documentElement as Element;
  }

  ngOnInit() {
    this.setThrottle();
  }

  ngOnChanges(changes) {
    if (changes.scrollDelay){
       this.setThrottle(); 
    }
  }

  setThrottle() {
    this.scroll = this.windowScroll = _throttle(this.handleScroll, this.scrollDelay);
  }

  getListener = () => this.elRef.nativeElement.clientHeight === this.elRef.nativeElement.scrollHeight
    ? ScrollListener.WINDOW
    : ScrollListener.HOST

  roundTo = (from: number, to: number = this.scrollOffset) => Math.floor(from / to) * to;
  getScrollDirection = (st: number) => this.scrollTop <= st ? ScrollDirection.DOWN : ScrollDirection.UP;

  canScroll(e: Element): boolean {
    const scrolled = this.more
      && this.getScrollDirection(e.scrollTop) === ScrollDirection.DOWN
      && this.roundTo(e.clientHeight) === this.roundTo(e.scrollHeight - e.scrollTop);
    this.scrollTop = e.scrollTop;
    console.log(this.scrollTop)
    return scrolled;
  }

  handleScroll = () => this.getListener() === ScrollListener.HOST
    ? this.scrolled.emit( this.canScroll(this.element) )
    : this.scrolled.emit( this.canScroll(this.window) )
}
