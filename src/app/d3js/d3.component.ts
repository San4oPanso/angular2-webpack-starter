import {Component, HostBinding} from '@angular/core';
import * as d3 from 'd3';
import {ZoomDragComponent} from './zoomdrag/zoomdrag.component';
@Component({
    selector: 'try-d3',  // <home></home>
    directives: [ZoomDragComponent],
    template: require('./d3.html')
})
export class D3JSComponent {
    // TypeScript public modifiers
    constructor() {
    }

    ngOnInit() {
        const d3options = {
            w: 500, h: 120, padding: 2, dataset: [5, 10, 15, 20, 5, 10, 4, 6, 13, 5, 25, 3]
        };

        const svg = d3.select('try-d3')
            .append('svg')
            .attr('width', d3options.w)
            .attr('height', d3options.h);

        function colorPicker(v: number) {
            if (v < 20) return '#666';
            else return '#FF0033'
        }

        svg.selectAll('rect')
            .data(d3options.dataset)
            .enter()
            .append('rect')
            .attr({
                x: (d, i) => i * (d3options.w / d3options.dataset.length),
                y: d => d3options.h - d * 4,
                width: d3options.w / d3options.dataset.length - d3options.padding,
                height: d => d * 4,
                fill: d => colorPicker(d)
            });

        svg.selectAll('text')
            .data(d3options.dataset)
            .enter()
            .append('text')
            .text(d => d)
            .attr({
                'text-anchor': 'middle',
                x: (d, i) =>
                    i * (d3options.w / d3options.dataset.length) +
                    (d3options.w / d3options.dataset.length - d3options.padding) / 2,
                y: d => d3options.h - d * 4 + 14,
                'font-family': 'sans-serif',
                'font-size': 12,
                'fill': '#fff'
            });

        const lineData = [{ "age": 10, "name": 32 }, { "age": 20, "name": 26 }, { "age": 30, "name": 28 }, { "age": 40, "name": 30 }, { "age": 50, "name": 28 }, { "age": 60, "name": 32 }, { "age": 70, "name": 40 }];
        const lineFun: any = d3.svg.line()
            .x((d: any) => d.age * 5)
            .y((d: any) =>d3options.h -  d.name * 2)
            .interpolate('basis');

        const linechart = d3.select('try-d3')
            .append('svg')
            .attr('width', d3options.w)
            .attr('height', d3options.h);

        const viz = linechart.append('path')
            .attr({
                d: lineFun(lineData),
                'stroke-width': 2,
                'stroke': 'purple',
                'fill': 'none'
            });
    }
}



