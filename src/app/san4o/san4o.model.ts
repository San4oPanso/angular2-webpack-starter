import { xButtonColor } from '../common/button';

export interface ISan4oModel {
    name: string;
    buttonColor: xButtonColor;
    onButtonClick();
}


export class San4oModel implements ISan4oModel {
    constructor(public name: string, public buttonColor = xButtonColor.default) { }

    onButtonClick() {
        if (this.buttonColor == xButtonColor.default) {
            this.buttonColor = xButtonColor.success;
        } else if (this.buttonColor == xButtonColor.success) {
            this.buttonColor = xButtonColor.danger;
        } else if (this.buttonColor == xButtonColor.danger) {
            this.buttonColor = xButtonColor.default;
        }
    }
}


