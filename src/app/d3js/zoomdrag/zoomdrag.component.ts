import {Component, ViewEncapsulation} from 'angular2/core';
import * as d3 from 'd3';
import {Subject} from 'rxjs/Subject';
@Component({
    selector: 'zoomdrag',  // <home></home>
    directives: [],
    template: '',
    styles: [`
.dot circle {
    fill: lightsteelblue;
    stroke: steelblue;
    stroke-width: 1.5px;
    }

    .dot circle.dragging {
    fill: red;
    stroke: brown;
    }

    .axis line {
    fill: none;
    stroke: #ddd;
    shape-rendering: crispEdges;
    vector-effect: non-scaling-stroke;
}`],
    encapsulation: ViewEncapsulation.None
})
export class ZoomDragComponent {
    dots = [];
    container: d3.Selection<any>;

    zoom = d3.behavior.zoom()
        .scaleExtent([1, 100])
        .on("zoom", () => this.zoomed());

    drag = d3.behavior.drag()
        .origin((d: any) => d)
        .on("dragstart", this.dragstarted)
        .on("drag", this.dragged)
        .on("dragend", this.dragended);

    margin = { top: -5, right: -5, bottom: -5, left: -5 };
    width = 500 - this.margin.left - this.margin.right;
    height = 200 - this.margin.top - this.margin.bottom;
    dotsSubject = new Subject<any>();

    constructor() {
        d3.tsv(require("file!./dots.tsv"), (d: any) => {
            d.x = +d.x;
            d.y = +d.y;
            return d;
        }, (error, dots) => {
            this.dotsSubject.next(dots);
        });
    }

    ngOnInit() {
        var svg = d3.select("zoomdrag").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")")
            .call(this.zoom);

        var rect = svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("fill", "none")
            .style("pointer-events", "all");

        this.container = svg.append("g");

        this.container.append("g")
            .attr("class", "x axis")
            .selectAll("line")
            .data(d3.range(0, this.width, 10))
            .enter().append("line")
            .attr("x1", d => d)
            .attr("y1", 0)
            .attr("x2", d => d)
            .attr("y2", this.height);

        this.container.append("g")
            .attr("class", "y axis")
            .selectAll("line")
            .data(d3.range(0, this.height, 10))
            .enter().append("line")
            .attr("x1", 0)
            .attr("y1", d => d)
            .attr("x2", this.width)
            .attr("y2", d => d);

        var subscriber = this.dotsSubject.subscribe(dots => {
            this.dotsSubject.unsubscribe();
            subscriber.unsubscribe();
            var dot = this.container.append("g")
                .attr("class", "dot")
                .selectAll("circle")
                .data(dots)
                .enter().append("circle")
                .attr("r", 5)
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y)
                .call(this.drag);
        });
    }

    dragstarted(d) {
        (<any>d3).event.sourceEvent.stopPropagation();
        d3.select(<any>this).classed("dragging", true);
    }

    dragged(d) {
        d3.select(<any>this).attr("cx", d.x = (<any>d3).event.x).attr("cy", d.y = (<any>d3).event.y);
    }

    dragended(d) {
        d3.select(<any>this).classed("dragging", false);
    }

    zoomed() {
        console.log('calling zoomed')
        this.container.attr("transform", "translate(" + (<any>d3).event.translate + ")scale(" + (<any>d3).event.scale + ")");
    }
}

