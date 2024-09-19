"use strict";
class IndicatorLineFactory extends AbstractFactory {
    constructor(data, origin, canvasWidth, startColor, endColor) {
        super(data, origin, canvasWidth);
        this.data = data;
        this.lineWidth = 1;
        this.color = 'black';
        this.gradientPath = null;
        this.startColor = 'black';
        this.endColor = 'black';
        if (startColor && endColor) {
            this.gradientPath = new Path2D();
            this.startColor = startColor;
            this.endColor = endColor;
            this.drawGradient = true;
        }
        else {
            this.gradientPath = null;
            this.drawGradient = false;
        }
    }
    getDrawables(start, end) {
        var _a, _b, _c;
        if (!this.convertY)
            return null;
        const path = new Path2D();
        if (this.drawGradient) {
            this.gradientPath = new Path2D();
        }
        (_a = this.gradientPath) === null || _a === void 0 ? void 0 : _a.moveTo(this.getX(start), this.bottomInset);
        for (let i = start; i <= end; i++) {
            const x = this.getX(i);
            const y = this.convertY(this.data[i].y);
            if (!path.hasOwnProperty('moveTo')) {
                path.moveTo(x, y);
            }
            else {
                path.lineTo(x, y);
            }
            (_b = this.gradientPath) === null || _b === void 0 ? void 0 : _b.lineTo(x, y);
        }
        (_c = this.gradientPath) === null || _c === void 0 ? void 0 : _c.lineTo(this.getX(end), this.bottomInset);
        const pathDrawable = new PathDrawable(path, this.lineWidth, this.color);
        if (this.gradientPath) {
            const gradientDrawable = new GradientDrawable(this.gradientPath, this.startColor, this.endColor);
            return [pathDrawable, gradientDrawable];
        }
        else {
            return [pathDrawable];
        }
    }
    getFocusDrawables(index) {
        if (this.data.length === 0 || !this.convertY)
            return null;
        const x = this.getX(index);
        const y = this.convertY(this.data[index].y);
        const point = { x, y };
        const drawable = new DotDrawable(point, this.color);
        return [drawable];
    }
    getValues(index) {
        return [{ x: this.data[index].x, y: this.data[index].y }];
    }
    minValue(data) {
        return data.y;
    }
    maxValue(data) {
        return data.y;
    }
    getDataX(data) {
        return data.x;
    }
}
