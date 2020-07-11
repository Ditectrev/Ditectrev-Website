import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import {
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TorusKnotBufferGeometry,
  WebGLRenderer,
} from "three";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";
import { GeoJsonProperties } from "geojson";
import { GeoPath, GeoPermissibleObjects, GeoProjection } from "d3";
import * as d3 from "d3";

// TODO: Make this more dump component, maybe outsource something to utils.
/**
 * @component ServicesComponent
 * @description Create the component.
 * @implements AfterViewInit
 */
@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements AfterViewInit {
  // Cyber Security animation target element.
  @ViewChild("renderTorusKnot", { static: false })
  private renderTorusKnot!: ElementRef<HTMLElement>; // Get reference of div element from HTML element to render Three.js. Non-null assertion operator is required to let know the compiler that this value is not empty and exists.

  // Software Development animation target element.
  @ViewChild("renderGeoProjection", { static: false })
  private renderGeoProjection!: ElementRef<HTMLElement>; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.

  // Cyber Security animation variables.
  private aspect: number = window.innerWidth / window.innerHeight; // Region of space in the modeled world that may appear on the screen (camera frustum) aspect ratio, usually the canvas width / canvas height.
  private far: number = 20000; // Region of space in the modeled world that may appear on the screen (camera frustum) far plane.
  private frustum: number = 90; // Region of space in the modeled world that may appear on the screen (camera frustum) vertical point of view, from bottom to top of view, in degrees.
  private near: number = 0.01; // Region of space in the modeled world that may appear on the screen (camera frustum) near plane.

  // Software Development animation variables.
  private context: CanvasRenderingContext2D | null | undefined;
  private geoGenerator!: GeoPath<any, GeoPermissibleObjects>; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
  private geoJSON!: GeoJsonProperties | GeoPermissibleObjects | any; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
  private height: number = 450; // Height of Software Development animation.
  private projection!: GeoProjection; // Non-null assertion operator is required to let know the compiler that this value is not empty and exists.
  private size: number | undefined; // Size of Software Development animation.
  private width: number = window.innerWidth / 2; // Width of Software Development animation.

  // Create the camera.
  private camera: PerspectiveCamera = new PerspectiveCamera(
    this.frustum,
    this.aspect,
    this.near,
    this.far
  );

  // Create renderer to display scene.
  private renderer: WebGLRenderer = new WebGLRenderer({
    alpha: true, // Transparent background.
    antialias: true, // Smooth edges.
  });
  private scene: Scene = new Scene(); // Create the scene.

  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {Renderer2} renderer2 Abstraction class object to manipulate elements without accessing DOM directly.
   */
  constructor(private renderer2: Renderer2) { }

  /**
   * @access public
   * @callback ngAfterViewInit
   * @description Invoked immediately after Angular has completed initialization of a component's view.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    const group: Group = this.createScene(this.renderer); // Return the group geometry object from after creating scene.

    // Append object to be rendered to the DOM, thus append this using Renderer2.
    this.renderer2.appendChild(
      this.renderTorusKnot.nativeElement, // Specify where on DOM render an element.
      this.renderer.domElement // Manipulate DOM using Renderer2, thus avoid manipulating it directly.
    );

    this.renderScene(group, this.renderer); // Render the scene.

    // Get 2D rendering context for drawing surface of a "<canvas>" element.
    this.context = (<HTMLCanvasElement>(
      this.renderGeoProjection.nativeElement
    )).getContext("2d");

    this.size = d3.min([this.width, this.height]); // Set size to be equal to whatever is smaller: height or width.

    // Create orthographic projection, scale and center it.
    this.projection = d3
      .geoOrthographic()
      .scale(0.5 * this.size!)
      .translate([0.5 * this.width, 0.5 * this.height]);

    // Create new geographic path generator on the given context and projection.
    this.geoGenerator = d3
      .geoPath()
      .context(this.context!)
      .projection(this.projection);

    // GeoJSON settings.
    this.geoJSON = {
      type: "Feature", // Spatially bounded thing.
      geometry: {
        coordinates: [[0, 0]], // Starting coordinates.
        type: "LineString", // An array of positions forming a continuous line
      },
    };

    // Set up height and height
    d3.select(this.renderGeoProjection.nativeElement)
      .attr("height", this.height + "px")
      .attr("width", this.width + "px");

    this.context!.lineWidth = 1; // Set line width.
    this.context!.strokeStyle = "rgba(63, 81, 181, .3)"; // This is in hex #3f51b5, but alpha channel is required therefore it was transformed to RGBA.

    this.renderProjection(); // Render the projection.
  }

  /**
   * @access private
   * @description Create scene of this animation.
   * @function createScene
   * @param {WebGLRenderer} renderer Renderer object to display scenes using WebGL.
   * @returns {Group} group
   */
  private createScene(renderer: WebGLRenderer): Group {
    this.scene.add(this.camera); // Add camera to the scene.
    renderer.setSize(innerWidth / 2, 450); // Set up size of the scene.
    this.camera.position.set(1, -1, 30); // Set up position of the camera.

    // Create material object for drawing wireframe-style geometries.
    const lineMaterial: LineBasicMaterial = new LineBasicMaterial({
      opacity: 0.3,
      transparent: true, // Make transparent bacground.
    });

    // Create material object with properties for surfaces with highlights.
    const meshMaterial: MeshPhongMaterial = new MeshPhongMaterial({
      color: 0x3f51b5, // Color of the material.
      emissive: 0x030040, // Color of emissive light of the material.
      flatShading: true, // Render the material with flat shading.
    });

    // Create the torus knot geometry.
    const p: number = 1;
    const q: number = 20;
    const radius: number = 6;
    const radialSegments: number = 20;
    const tabularSegments: number = 40;
    const tube: number = 10;
    const torusKnotGeometry: TorusKnotBufferGeometry = new TorusKnotBufferGeometry(
      radius,
      tube,
      tabularSegments,
      radialSegments,
      p,
      q
    );

    const group: Group = new Group(); // Create group to enable objects grouping.

    // Create series of lines drawn between pairs of vertices.
    const lineSegments: LineSegments = new LineSegments(
      torusKnotGeometry,
      lineMaterial
    );
    const mesh: Mesh = new Mesh(torusKnotGeometry, meshMaterial); // Create triangular polygon mesh based objects.
    const lights: PointLight[] = new Array<PointLight>(); // Create empty array of PointLight's.

    // Add objects to the group.
    group.add(lineSegments);
    group.add(mesh);

    // Create lights which are emitted from a single point in all directions (PointLight).
    lights[0] = new PointLight(0xffffff, 1, 0);
    lights[1] = new PointLight(0xffffff, 1, 0);
    lights[2] = new PointLight(0xffffff, 1, 0);
    lights[3] = new PointLight(0xffffff, 1, 0);

    // Set up position of the light.
    lights[0].position.set(10, 10, 10);
    lights[1].position.set(-10, -10, 10);
    lights[2].position.set(10, 10, -10);
    lights[3].position.set(-10, -10, -10);

    // Add lights to the scene.
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
    this.scene.add(lights[3]);

    this.scene.add(group); // Add group objects geometry to the scene.

    return group;
  }

  /**
   * @access private
   * @description Render group objects geometry in the animation.
   * @function renderScene
   * @param  {Group} group Group of geometry objects.
   * @param  {WebGLRenderer} renderer Renderer object to display scenes using WebGL.
   * @returns {void}
   */
  private renderScene(group: Group, renderer: WebGLRenderer): void {
    // Create animation.
    requestAnimationFrame(() => {
      this.renderScene(group, renderer);
    });

    renderer.render(this.scene, this.camera); // Render the animation.
    this.updateScene(group); // Rotate the group objects geometry.
  }

  /**
   * @access private
   * @description Update rotation of the group objects geometry in the animation.
   * @function updateScene
   * @param {Group} group Group of geometry objects.
   * @returns {void}
   */
  private updateScene(group: Group): void {
    group.rotation.x += 0.005;
    group.rotation.y += 0.005;
  }

  // Chart.js & ng2-charts settings and variables for Digital Strategy animation.
  public barChartData: ChartDataSets[] = [
    {
      data: [0, 33, 34, 66, 67, 100],
    },
  ];
  public barChartLabels: Label[] = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    animation: {
      duration: 13000,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    layout: {
      padding: 30,
    },
    responsive: true,
    responsiveAnimationDuration: 8000,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    tooltips: {
      enabled: false,
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: "rgba(63, 81, 181, .3)", // This is in hex #3f51b5, but alpha channel is required therefore it was transformed to RGBA.
      borderColor: "#3f51b5",
      borderWidth: 5,
    },
  ];
  public lineChartType: ChartType = "line";

  /**
   * @access private
   * @description Generate random latitude.
   * @function randomLongitude
   * @returns {number} latitude
   */
  private randomLatitude(): number {
    const latitude = -90 + Math.random() * 180;

    return latitude;
  }

  /**
   * @access private
   * @description Generate random longitude.
   * @function randomLongitude
   * @returns {number} longitude
   */
  private randomLongitude(): number {
    const longitude: number = -180 + Math.random() * 360;

    return longitude;
  }

  /**
   * @access private
   * @description Add points to the animation based on GeoJSON coordinates.
   * @function addPoint
   * @returns {void}
   */
  private addPoint(): void {
    this.geoJSON.geometry.coordinates.push([
      this.randomLatitude(),
      this.randomLongitude(),
    ]);
  }

  /**
   * @access private
   * @description Render projection animation.
   * @function renderProjection
   * @returns {void}
   */
  private renderProjection(): void {
    if (this.geoJSON.geometry.coordinates.length < 10000) this.addPoint(); // Add points to the animation unless 10k GeoJSON coordinates has been created.
    this.context!.clearRect(0, 0, this.width, this.height); // Erase pixels in rectangular area.
    this.context!.beginPath(); // Start a new path.
    this.geoGenerator(this.geoJSON); // Render the given GeoJSON.
    this.context!.stroke(); // Draw a path.

    // Create animation.
    requestAnimationFrame(() => {
      this.renderProjection();
    });

    this.updateProjection(); // Rotate the projection.
  }

  /**
   * @access private
   * @description Update rotation of projection animation.
   * @function updateProjection
   * @returns {void}
   */
  private updateProjection(): void {
    this.projection!.rotate([Math.random(), Math.random(), Math.random()]); // Make the projection's rotation shaking.
  }
}
