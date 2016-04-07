﻿import {
    Component,
    Directive,
    Output,
    Input,
    HostListener,
    ElementRef,
    Renderer,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from 'angular2/core';

@Component({
    selector: '[xButton]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class xButton {
    _color: xButtonColor;

    @Input()
    get color(): string {
        return (String)(this._color);
    }

    set color(value: string) {
        this._updateColor(xButtonColor[value]);
    }

    @Input()
    get xButton(): xButtonColor {
        return this._color;
    }

    set xButton(value: xButtonColor) {
        this._updateColor(value);
    }

    _updateColor(newColor: xButtonColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }

    _setElementColor(color: xButtonColor, isAdd: boolean) {
        if (color != null) {
            this._setElementClass((String)(color), isAdd);
        }
    }

    _setElementClass(cssClass: string, isAdd: boolean) {
        this.renderer.setElementClass(this.elementRef.nativeElement, cssClass, isAdd);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        this._setElementClass((String)(xButtonColor.wrapper), true);
    }
}

export enum xButtonColor {
    wrapper = <any>'btn',
    default = <any>'btn-default',
    danger = <any>'btn-danger',
    success = <any>'btn-success'
}
