import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { FLAVORS, FlavorInfo } from "../types";
import img1 from "../images/img1.png";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.jpg";
import img6 from "../images/img6.png";

// Texture loader for high-end top-down photographic textures
const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin("anonymous");

const loadedTextures: Record<string, THREE.Texture> = {};

function getFlavorTexture(id: string): THREE.Texture | null {
  if (loadedTextures[id]) return loadedTextures[id];

  let url = "";
  if (id === "raspberry") {
    // Top-down berry smoothie bowl with banana, kiwi, blueberries, strawberry halves & granola on a pink background
    url = "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80";
  } else if (id === "mango") {
    // Rich, premium golden mango tropical fruit smoothie bowl
    url = "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=80";
  } else if (id === "kiwi") {
    // Zesty green organic kiwi bowl with fresh slice highlights
    url = "https://images.unsplash.com/photo-1515003848606-ca0572d541b1?auto=format&fit=crop&w=1200&q=80";
  } else if (id === "blueberry") {
    // Deep antioxidant blueberry yogurt bowl
    url = "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=1200&q=80";
  } else if (id === "strawberry") {
    // Fresh strawberry red vanilla blend bowl
    url = "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80";
  } else if (id === "cocoa") {
    // Indulgent premium dark cocoa organic chocolate bowl
    url = "https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=1200&q=80";
  }

  if (url) {
    const tex = textureLoader.load(url);
    tex.center.set(0.5, 0.5);
    tex.repeat.set(1.1, 1.1); // zoom in slightly to crop out any extreme background edges
    loadedTextures[id] = tex;
    return tex;
  }
  return null;
}

// Helper texture generators
function createCreamTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 256, 256);
    // Soft noise spirals
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = `rgba(240, 240, 245, ${0.05 + Math.random() * 0.1})`;
      ctx.lineWidth = 1 + Math.random() * 8;
      ctx.beginPath();
      ctx.arc(
        128 + (Math.random() - 0.5) * 100,
        128 + (Math.random() - 0.5) * 100,
        Math.random() * 80 + 10,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

function createKiwiTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#8cd867";
  ctx.fillRect(0, 0, 256, 256);

  const cx = 128;
  const cy = 128;
  const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 55);
  grad.addColorStop(0, "#f2fbe8");
  grad.addColorStop(0.6, "#e2f4cb");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#d5f0b1";
  ctx.lineWidth = 1.5;
  const rayCount = 28;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * 110, cy + Math.sin(angle) * 110);
    ctx.stroke();
  }

  ctx.fillStyle = "#f2fbe8";
  ctx.beginPath();
  ctx.arc(cx, cy, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1c120c";
  const seedCount = 42;
  for (let i = 0; i < seedCount; i++) {
    const angle = (i / seedCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
    const r = 40 + Math.random() * 18;
    const sx = cx + Math.cos(angle) * r;
    const sy = cy + Math.sin(angle) * r;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(angle + Math.PI / 2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.8, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, 122, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function createLeafTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#1e5a22";
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = "#a5d6a7";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(128, 256);
  ctx.lineTo(128, 8);
  ctx.stroke();

  ctx.lineWidth = 2;
  const veinPairs = 7;
  for (let i = 1; i <= veinPairs; i++) {
    const y = 256 - (i / (veinPairs + 1)) * 240;
    ctx.beginPath();
    ctx.moveTo(128, y);
    ctx.quadraticCurveTo(70, y - 18, 20, y - 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(128, y);
    ctx.quadraticCurveTo(186, y - 18, 236, y - 40);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

// Procedural Mesh Builders
function createRaspberryMesh() {
  const group = new THREE.Group();

  const coreGeo = new THREE.SphereGeometry(0.24, 16, 16);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x900c3f, roughness: 0.6 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  const drupeletGeo = new THREE.SphereGeometry(0.07, 8, 8);
  const drupeletMat = new THREE.MeshPhysicalMaterial({
    color: 0xe63946,
    roughness: 0.12,
    metalness: 0.05,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15
  });

  const count = 44;
  for (let i = 0; i < count; i++) {
    const theta = i * 2.39996;
    const z = 1 - (i / (count - 1)) * 1.5;
    const radiusAtZ = Math.sqrt(Math.max(0, 1 - z * z)) * 0.24;

    const x = Math.cos(theta) * radiusAtZ;
    const y = Math.sin(theta) * radiusAtZ;

    const drupelet = new THREE.Mesh(drupeletGeo, drupeletMat);
    drupelet.position.set(x, y, z * 0.24 + 0.05);
    const scale = 0.85 + Math.random() * 0.3;
    drupelet.scale.set(scale, scale, scale);
    group.add(drupelet);
  }

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

function createMangoMesh() {
  const group = new THREE.Group();
  const mangoGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35, 2, 2, 2);

  const posAttr = mangoGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    posAttr.setX(i, x + (Math.random() - 0.5) * 0.06);
    posAttr.setY(i, y + (Math.random() - 0.5) * 0.06);
    posAttr.setZ(i, z + (Math.random() - 0.5) * 0.06);
  }
  mangoGeo.computeVertexNormals();

  const mangoMat = new THREE.MeshPhysicalMaterial({
    color: 0xffb703,
    roughness: 0.3,
    metalness: 0.05,
    clearcoat: 0.2
  });
  const mesh = new THREE.Mesh(mangoGeo, mangoMat);
  group.add(mesh);
  return group;
}

function createKiwiMesh() {
  const group = new THREE.Group();
  const kiwiGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.07, 32);
  kiwiGeo.rotateX(Math.PI / 2);

  const texture = createKiwiTexture();
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x4a3424, roughness: 0.9 }), // outer
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 }), // front
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 }), // back
  ];

  const mesh = new THREE.Mesh(kiwiGeo, materials);
  group.add(mesh);
  return group;
}

function createBlueberryMesh() {
  const group = new THREE.Group();
  const berryGeo = new THREE.SphereGeometry(0.26, 16, 16);
  const berryMat = new THREE.MeshPhysicalMaterial({
    color: 0x3f51b5,
    roughness: 0.45,
    metalness: 0.05,
    clearcoat: 0.3
  });
  const body = new THREE.Mesh(berryGeo, berryMat);
  group.add(body);

  // Pucker on top
  const puckerGeo = new THREE.TorusGeometry(0.05, 0.02, 6, 12);
  puckerGeo.rotateX(Math.PI / 2);
  const puckerMat = new THREE.MeshStandardMaterial({ color: 0x1a237e, roughness: 0.8 });
  const crown = new THREE.Mesh(puckerGeo, puckerMat);
  crown.position.set(0, 0, 0.24);
  group.add(crown);

  return group;
}

function createStrawberryMesh() {
  const group = new THREE.Group();
  const strawGeo = new THREE.ConeGeometry(0.25, 0.42, 16);
  strawGeo.rotateX(-Math.PI / 2);

  const strawMat = new THREE.MeshPhysicalMaterial({
    color: 0xff3b30,
    roughness: 0.15,
    metalness: 0.05,
    clearcoat: 0.8
  });
  const body = new THREE.Mesh(strawGeo, strawMat);
  group.add(body);

  // Green stem
  const stemGeo = new THREE.ConeGeometry(0.12, 0.05, 6);
  stemGeo.rotateX(Math.PI / 2);
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.7 });
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.set(0, 0, -0.2);
  group.add(stem);

  return group;
}

function createCocoaMesh() {
  const group = new THREE.Group();

  // Chocolate piece
  const cocoaGeo = new THREE.BoxGeometry(0.3, 0.3, 0.08);
  const cocoaMat = new THREE.MeshPhysicalMaterial({
    color: 0x3d2723,
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.5
  });
  const mesh = new THREE.Mesh(cocoaGeo, cocoaMat);
  mesh.rotation.set(0.2, 0.4, 0.1);
  group.add(mesh);

  return group;
}

function createMintLeafMesh() {
  const group = new THREE.Group();
  const leafGeo = new THREE.PlaneGeometry(0.45, 0.3, 8, 8);

  const pos = leafGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, (x * x - 0.05) * 0.6 + (y * y - 0.03) * 0.3);
  }
  leafGeo.computeVertexNormals();

  const leafTex = createLeafTexture();
  const leafMat = new THREE.MeshPhysicalMaterial({
    map: leafTex,
    roughness: 0.45,
    side: THREE.DoubleSide,
    clearcoat: 0.1
  });
  const mesh = new THREE.Mesh(leafGeo, leafMat);
  group.add(mesh);
  return group;
}

function createAlmondMesh() {
  const group = new THREE.Group();
  const almondGeo = new THREE.BoxGeometry(0.2, 0.35, 0.03);
  const almondMat = new THREE.MeshStandardMaterial({
    color: 0xf4ecd8,
    roughness: 0.6
  });
  const mesh = new THREE.Mesh(almondGeo, almondMat);
  group.add(mesh);
  return group;
}

function createBotanicalLeafTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0c3116";
  ctx.fillRect(0, 0, 512, 512);

  // Elegant thick stem
  ctx.strokeStyle = "#5aa86b";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(256, 512);
  ctx.quadraticCurveTo(256, 256, 256, 16);
  ctx.stroke();

  // Fine premium veins
  ctx.lineWidth = 3;
  const veinPairs = 10;
  for (let i = 1; i <= veinPairs; i++) {
    const y = 512 - (i / (veinPairs + 1)) * 480;
    ctx.beginPath();
    ctx.moveTo(256, y);
    ctx.quadraticCurveTo(150, y - 30, 40, y - 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(256, y);
    ctx.quadraticCurveTo(362, y - 30, 472, y - 80);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createBotanicalLeafMesh() {
  const group = new THREE.Group();
  const leafGeo = new THREE.PlaneGeometry(0.85, 0.48, 12, 12);

  const pos = leafGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Compound bend: curve down on the sides, bend up on the main axis
    pos.setZ(i, (x * x - 0.1) * 0.9 + (y * y - 0.05) * 0.45);
  }
  leafGeo.computeVertexNormals();

  const leafTex = createBotanicalLeafTexture();
  const leafMat = new THREE.MeshPhysicalMaterial({
    map: leafTex,
    roughness: 0.18,
    metalness: 0.05,
    side: THREE.DoubleSide,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const mesh = new THREE.Mesh(leafGeo, leafMat);
  group.add(mesh);
  return group;
}

function createFruitMeshByType(type: string) {
  switch (type) {
    case "raspberry":
      return createRaspberryMesh();
    case "mango":
      return createMangoMesh();
    case "kiwi":
      return createKiwiMesh();
    case "blueberry":
      return createBlueberryMesh();
    case "strawberry":
      return createStrawberryMesh();
    case "cocoa":
      return createCocoaMesh();
    default:
      return createRaspberryMesh();
  }
}

interface SmoothieSceneProps {
  activeIndex: number;
  activePage: string;
}

export default function SmoothieScene({ activeIndex, activePage }: SmoothieSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mainBowlGroup: THREE.Group;
    creamSideMat: THREE.MeshPhysicalMaterial;
    creamTopMat: THREE.MeshPhysicalMaterial;
    toppingsGroup: THREE.Group;
    floatingGroup: THREE.Group;
    particles: THREE.Points;
    spotLight: THREE.SpotLight;
    ambientLight: THREE.AmbientLight;
    directionalLight: THREE.DirectionalLight;
    bokehGroup: THREE.Group;
  } | null>(null);

  // Smooth mouse movement refs
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Get exact bounding rect for accurate size
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // 1. Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.6, 6.2); // Viewed slightly from above
    camera.lookAt(0, -0.4, 0);

    // 2. Create WebGL Renderer with absolute premium specs
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Clear initial container children and mount
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // 3. Setup Lights (Cinematic & Soft)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.0005;
    scene.add(directionalLight);

    // Dynamic color spotLight to match flavor accent
    const spotLight = new THREE.SpotLight(0xffffff, 4.5, 12, Math.PI / 4, 0.6, 1);
    spotLight.position.set(-3, 6, 2);
    scene.add(spotLight);

    // Volumetric backlights for bloom-like appearance
    const backLight = new THREE.DirectionalLight(0xffffff, 0.9);
    backLight.position.set(-2, -2, -5);
    scene.add(backLight);

    // 4. Create Ceramic Bowl Group (Main Assembly)
    const mainBowlGroup = new THREE.Group();
    mainBowlGroup.visible = false;
    scene.add(mainBowlGroup);

    // White ceramic bowl body
    const bowlGeo = new THREE.SphereGeometry(2.1, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    bowlGeo.rotateX(Math.PI); // Orient to open upwards
    const bowlMat = new THREE.MeshPhysicalMaterial({
      color: 0xfdfdfd,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.1,
      thickness: 0.4
    });
    const bowlMesh = new THREE.Mesh(bowlGeo, bowlMat);
    bowlMesh.position.y = -0.2;
    bowlMesh.receiveShadow = true;
    bowlMesh.castShadow = true;
    mainBowlGroup.add(bowlMesh);

    // Creamy Smoothie Surface (Slightly curved cylinder)
    const creamGeo = new THREE.CylinderGeometry(2.02, 2.02, 0.15, 64);

    // Create side/bottom material (smooth color)
    const creamSideMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(FLAVORS[activeIndex].creamColor),
      roughness: 0.45,
      metalness: 0.0,
      clearcoat: 0.25,
      clearcoatRoughness: 0.3
    });

    // Create top material (high-quality photographic texture)
    const initialTexture = getFlavorTexture(FLAVORS[activeIndex].id);
    const creamTopMat = new THREE.MeshPhysicalMaterial({
      color: initialTexture ? new THREE.Color(0xffffff) : new THREE.Color(FLAVORS[activeIndex].creamColor),
      map: initialTexture || createCreamTexture(),
      roughness: 0.35,
      metalness: 0.0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2
    });

    const creamMesh = new THREE.Mesh(creamGeo, [
      creamSideMat, // 0: Sides
      creamTopMat,  // 1: Top cap
      creamSideMat, // 2: Bottom cap
    ]);
    creamMesh.position.y = -0.15;
    mainBowlGroup.add(creamMesh);

    // 5. Toppings on the Smoothie Bowl
    const toppingsGroup = new THREE.Group();
    toppingsGroup.position.y = -0.05;
    mainBowlGroup.add(toppingsGroup);

    // 6. Floating Ingredients Around the Bowl
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // 7. Ambient Particle System (Tiny drifting seeds & sparkles)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scaleAttr = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spawn within a spherical shell
      const r = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      positions[i * 3 + 2] = r * Math.cos(phi) - 1.0;
      scaleAttr[i] = 0.5 + Math.random() * 1.5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scaleAttr, 1));

    // Create soft circle texture for particles
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d")!;
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    pGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(8, 8, 8, 0, Math.PI * 2);
    pCtx.fill();
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(FLAVORS[activeIndex].particlesColor),
      size: 0.08,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Bokeh lights for depth and cinematic mood
    const bokehGroup = new THREE.Group();
    scene.add(bokehGroup);

    const bokehCount = 4;
    const colors = [0xff2a5f, 0xff9f00, 0x88c441, 0x5a4fcf];
    for (let i = 0; i < bokehCount; i++) {
      const size = 2.0 + Math.random() * 1.5;
      const geom = new THREE.SphereGeometry(size, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.04 + Math.random() * 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const bokeh = new THREE.Mesh(geom, mat);
      
      // Position them far back
      bokeh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        -5 - Math.random() * 3
      );
      
      bokeh.userData = {
        speedX: 0.001 + Math.random() * 0.002,
        speedY: 0.001 + Math.random() * 0.002,
        baseX: bokeh.position.x,
        baseY: bokeh.position.y,
        offset: Math.random() * Math.PI * 2
      };
      
      bokehGroup.add(bokeh);
    }

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      mainBowlGroup,
      creamSideMat,
      creamTopMat,
      toppingsGroup,
      floatingGroup,
      particles,
      spotLight,
      ambientLight,
      directionalLight,
      bokehGroup,
    };

    // Spawn first flavor elements immediately
    rebuildToppings(activeIndex, false);
    rebuildFloatingElements(activeIndex, false);

    // Track cursor for custom 3D tilting
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouse.current.targetX = x;
      mouse.current.targetY = y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const dRect = containerRef.current.getBoundingClientRect();
      const w = dRect.width;
      const h = dRect.height;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // Render loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (sceneRef.current) {
        const { mainBowlGroup, floatingGroup, particles, renderer, scene, camera } = sceneRef.current;

        // Smooth mouse interpolation
        mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
        mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

        // Tilt bowl group elegantly (5-8 degrees) following cursor
        mainBowlGroup.rotation.z = -mouse.current.x * 0.12;
        mainBowlGroup.rotation.x = mouse.current.y * 0.12;
        mainBowlGroup.rotation.y = time * 0.03 + mouse.current.x * 0.08; // slow auto rot + mouse influence

        // Subtle dynamic cream ripple effect
        creamMesh.position.y = -0.15 + Math.sin(time * 2) * 0.005;

        // Floating fruits parallax and independent sin wave bobbing
        floatingGroup.children.forEach((child, idx) => {
          const personalOffset = idx * 1.5;
          const speed = 0.5 + (idx % 3) * 0.12;

          // Bobbing positioning
          const bobY = Math.sin(time * speed + personalOffset) * 0.22;
          const bobX = Math.cos(time * 0.5 * speed + personalOffset) * 0.12;

          // Subtle mouse parallax based on depth (z coordinate)
          // Front items (z > 0) move more than back items (z < 0)
          const parallaxFactor = (child.position.z + 2.5) * 0.15;
          const parallaxX = mouse.current.x * parallaxFactor;
          const parallaxY = -mouse.current.y * parallaxFactor;

          child.position.x = child.userData.baseX + bobX + parallaxX;
          child.position.y = child.userData.baseY + bobY + parallaxY;

          // Organic rotation using unique speeds
          child.rotation.x += child.userData.rotSpeedX || 0.003;
          child.rotation.y += child.userData.rotSpeedY || 0.004;
          child.rotation.z += child.userData.rotSpeedZ || 0.002;
        });

        // Slow organic drift of Bokeh lights
        if (bokehGroup) {
          bokehGroup.children.forEach((bokeh) => {
            const data = bokeh.userData;
            bokeh.position.x = data.baseX + Math.sin(time * 0.25 + data.offset) * 1.5;
            bokeh.position.y = data.baseY + Math.cos(time * 0.18 + data.offset) * 1.0;
          });
        }

        // Drift background particles slowly
        const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          const py = posAttr.getY(i);
          posAttr.setY(i, py - 0.003 - (Math.sin(time + i) * 0.001));

          // If particle drifts too low, wrap around
          if (posAttr.getY(i) < -4) {
            posAttr.setY(i, 4);
          }
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
      }
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  // Flavor Change Effect
  useEffect(() => {
    if (!sceneRef.current) return;
    const { creamSideMat, creamTopMat, spotLight, particles } = sceneRef.current;
    const flavor = FLAVORS[activeIndex];

    // Cinematic Morph Timeline
    const gsapTimeline = gsap.timeline();

    // 1. Camera Pullback pulse
    gsapTimeline.to(sceneRef.current.camera.position, {
      y: 4.1,
      z: 6.8,
      duration: 0.4,
      ease: "power2.out"
    });

    // 2. Animate cream side material color shift
    gsapTimeline.to(creamSideMat.color, {
      r: new THREE.Color(flavor.creamColor).r,
      g: new THREE.Color(flavor.creamColor).g,
      b: new THREE.Color(flavor.creamColor).b,
      duration: 0.8,
      ease: "power3.out",
    }, 0);

    // Also update top material base color if texture fails or as fallback
    gsapTimeline.to(creamTopMat.color, {
      r: getFlavorTexture(flavor.id) ? 1.0 : new THREE.Color(flavor.creamColor).r,
      g: getFlavorTexture(flavor.id) ? 1.0 : new THREE.Color(flavor.creamColor).g,
      b: getFlavorTexture(flavor.id) ? 1.0 : new THREE.Color(flavor.creamColor).b,
      duration: 0.8,
      ease: "power3.out",
    }, 0);

    // 3. Animate Spotlight light color and ambient glow
    gsapTimeline.to(spotLight.color, {
      r: new THREE.Color(flavor.accentColor).r,
      g: new THREE.Color(flavor.accentColor).g,
      b: new THREE.Color(flavor.accentColor).b,
      duration: 0.8,
    }, 0);

    gsapTimeline.to((particles.material as THREE.PointsMaterial).color, {
      r: new THREE.Color(flavor.particlesColor).r,
      g: new THREE.Color(flavor.particlesColor).g,
      b: new THREE.Color(flavor.particlesColor).b,
      duration: 0.8,
    }, 0);

    // 3.1. Animate Bokeh lights colors
    if (sceneRef.current.bokehGroup) {
      sceneRef.current.bokehGroup.children.forEach((bokeh, i) => {
        const colors = [flavor.accentColor, flavor.creamColor, flavor.bgColorCenter, flavor.bgColorBottom];
        const targetColor = new THREE.Color(colors[i % colors.length]);
        gsapTimeline.to((bokeh.material as THREE.MeshBasicMaterial).color, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: 0.8,
        }, 0);
      });
    }

    // 4. Shrink Toppings and Floating Elements, recreate them, and bounce them back
    animateTransitionOutToppingsAndFloating(() => {
      // Switch top textures mid-transition (when things are hidden)
      const nextTexture = getFlavorTexture(flavor.id);
      if (nextTexture) {
        creamTopMat.map = nextTexture;
      } else {
        creamTopMat.map = null;
      }
      creamTopMat.needsUpdate = true;

      rebuildToppings(activeIndex, true);
      rebuildFloatingElements(activeIndex, true);
    });

    // 5. Camera zoom back in elegantly
    gsapTimeline.to(sceneRef.current.camera.position, {
      y: 3.6,
      z: 6.2,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0.5);

  }, [activeIndex]);

  // Page Transition Effect to shift/scale the 3D bowl to the side for secondary pages
  useEffect(() => {
    if (!sceneRef.current) return;
    const { mainBowlGroup, floatingGroup } = sceneRef.current;

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1.0;
    let floatX = 0;
    let floatScale = 1.0;

    if (activePage === "Home") {
      targetX = 0;
      targetY = 0;
      targetScale = 1.0;
      floatX = 0;
      floatScale = 1.0;
    } else if (activePage === "Drinks") {
      // Shift to the right, scale down
      targetX = 1.35;
      targetY = -0.12;
      targetScale = 0.76;
      floatX = 0.8;
      floatScale = 0.85;
    } else if (activePage === "Recipes") {
      // Shift further right, scale down slightly more
      targetX = 1.45;
      targetY = -0.18;
      targetScale = 0.72;
      floatX = 0.95;
      floatScale = 0.8;
    } else if (activePage === "Contact") {
      // Shift to the side, scale down
      targetX = 1.55;
      targetY = -0.22;
      targetScale = 0.68;
      floatX = 1.1;
      floatScale = 0.75;
    } else if (activePage === "Profile") {
      // Hide completely
      targetX = 0;
      targetY = -1.2;
      targetScale = 0.0;
      floatX = 0;
      floatScale = 0.0;
    }

    gsap.to(mainBowlGroup.position, {
      x: targetX,
      y: targetY,
      duration: 0.95,
      ease: "power3.out"
    });

    gsap.to(mainBowlGroup.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.95,
      ease: "power3.out"
    });

    gsap.to(floatingGroup.position, {
      x: floatX,
      duration: 0.95,
      ease: "power3.out"
    });

    gsap.to(floatingGroup.scale, {
      x: floatScale,
      y: floatScale,
      z: floatScale,
      duration: 0.95,
      ease: "power3.out"
    });
  }, [activePage]);

  // Animated toppings rebuild
  const animateTransitionOutToppingsAndFloating = (onComplete: () => void) => {
    if (!sceneRef.current) return;
    const { toppingsGroup, floatingGroup } = sceneRef.current;

    const timeline = gsap.timeline({ onComplete });

    toppingsGroup.children.forEach((child) => {
      timeline.to(child.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.35,
        ease: "back.in(1.7)"
      }, 0);
    });

    floatingGroup.children.forEach((child) => {
      timeline.to(child.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.4,
        ease: "power3.in"
      }, 0);
    });
  };

  // Rebuild Toppings Inside the Smoothie Bowl
  const rebuildToppings = (idx: number, animate: boolean) => {
    if (!sceneRef.current) return;
    const { toppingsGroup } = sceneRef.current;
    const flavor = FLAVORS[idx];

    // Clear old toppings safely
    while (toppingsGroup.children.length > 0) {
      const obj = toppingsGroup.children[0];
      toppingsGroup.remove(obj);
    }

    // Add topping elements depending on flavor
    const toppings: THREE.Group[] = [];

    if (flavor.fruitType === "raspberry" || flavor.fruitType === "strawberry") {
      // Elegant circular ring of fruits
      const count = 7;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.8 + Math.random() * 0.25;
        const f = createFruitMeshByType(flavor.fruitType);

        f.position.set(Math.cos(angle) * radius, -0.05, Math.sin(angle) * radius);
        f.rotation.set(
          (Math.random() - 0.5) * 0.5,
          angle + Math.PI / 2 + (Math.random() - 0.5) * 0.4,
          0.1 + Math.random() * 0.3
        );
        f.scale.set(0.85, 0.85, 0.85);
        toppings.push(f);
      }

      // Add central strawberry / raspberries clustered
      const centerF = createFruitMeshByType(flavor.fruitType);
      centerF.position.set(0.0, 0.02, 0.1);
      centerF.rotation.set(0.2, 0.5, 0);
      centerF.scale.set(0.9, 0.9, 0.9);
      toppings.push(centerF);

      // Add mint leaves for fresh look
      for (let i = 0; i < 3; i++) {
        const leaf = createMintLeafMesh();
        const angle = i * (Math.PI * 2 / 3) + 0.5;
        leaf.position.set(Math.cos(angle) * 1.1, 0.05, Math.sin(angle) * 1.1);
        leaf.rotation.set(0.4, -angle, 0.2);
        leaf.scale.set(1.1, 1.1, 1.1);
        toppings.push(leaf);
      }

      // Scattered almond flakes
      for (let i = 0; i < 10; i++) {
        const almond = createAlmondMesh();
        const r = 0.4 + Math.random() * 1.1;
        const a = Math.random() * Math.PI * 2;
        almond.position.set(Math.cos(a) * r, -0.08, Math.sin(a) * r);
        almond.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.4);
        almond.scale.set(0.9, 0.9, 0.9);
        toppings.push(almond);
      }
    } else if (flavor.fruitType === "mango") {
      // Scattered beautiful mango chunks and coconuts
      const count = 8;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const radius = 0.6 + Math.random() * 0.7;
        const mango = createMangoMesh();
        mango.position.set(Math.cos(angle) * radius, -0.05, Math.sin(angle) * radius);
        mango.rotation.set(Math.random() * 0.8, Math.random() * Math.PI, Math.random() * 0.5);
        toppings.push(mango);
      }

      // Mint leaf center bouquet
      const leaf = createMintLeafMesh();
      leaf.position.set(-0.15, 0.05, -0.15);
      leaf.rotation.set(0.6, 0.8, 0.2);
      leaf.scale.set(1.2, 1.2, 1.2);
      toppings.push(leaf);

      const leaf2 = createMintLeafMesh();
      leaf2.position.set(0.15, 0.05, 0.15);
      leaf2.rotation.set(0.4, -0.8, -0.2);
      leaf2.scale.set(1.0, 1.0, 1.0);
      toppings.push(leaf2);

      // Scattered seeds / oats
      for (let i = 0; i < 12; i++) {
        const seed = createAlmondMesh();
        const r = 0.3 + Math.random() * 1.2;
        const a = Math.random() * Math.PI * 2;
        seed.position.set(Math.cos(a) * r, -0.08, Math.sin(a) * r);
        seed.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3);
        seed.scale.set(0.6, 0.6, 0.6); // smaller oats
        toppings.push(seed);
      }
    } else if (flavor.fruitType === "kiwi") {
      // Overlapping kiwi circular grid
      const count = 5;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.8;
        const kiwi = createKiwiMesh();
        kiwi.position.set(Math.cos(angle) * radius, -0.03, Math.sin(angle) * radius);
        kiwi.rotation.set(0.1, -angle, 0.2);
        kiwi.scale.set(1.1, 1.1, 1.1);
        toppings.push(kiwi);
      }

      // Giant center slice
      const centerKiwi = createKiwiMesh();
      centerKiwi.position.set(0, 0.02, 0.1);
      centerKiwi.rotation.set(0.15, 0.4, -0.1);
      centerKiwi.scale.set(1.3, 1.3, 1.3);
      toppings.push(centerKiwi);

      // Elegant mint leaf crowning
      for (let i = 0; i < 2; i++) {
        const leaf = createMintLeafMesh();
        const angle = i * Math.PI + 0.8;
        leaf.position.set(Math.cos(angle) * 1.3, 0.06, Math.sin(angle) * 1.3);
        leaf.rotation.set(0.5, -angle, 0.1);
        toppings.push(leaf);
      }
    } else if (flavor.fruitType === "blueberry") {
      // Lots of little blueberries piled up
      const count = 15;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.3 + Math.random() * 1.1;
        const berry = createBlueberryMesh();
        berry.position.set(
          Math.cos(angle) * radius,
          -0.03 + Math.random() * 0.05,
          Math.sin(angle) * radius
        );
        berry.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5);
        const s = 0.85 + Math.random() * 0.3;
        berry.scale.set(s, s, s);
        toppings.push(berry);
      }

      // Center mint leaf and banana slice (re-use almonds scaled)
      const leaf = createMintLeafMesh();
      leaf.position.set(0, 0.08, 0);
      leaf.rotation.set(0.6, 0, 0);
      leaf.scale.set(1.2, 1.2, 1.2);
      toppings.push(leaf);

      // Banana slices (rounded thick almond-like pieces)
      for (let i = 0; i < 4; i++) {
        const banana = createAlmondMesh();
        const angle = (i / 4) * Math.PI * 2 + 0.4;
        banana.position.set(Math.cos(angle) * 1.0, -0.04, Math.sin(angle) * 1.0);
        banana.rotation.set(0.1, -angle, 0.2);
        banana.scale.set(1.5, 1.5, 1.5);
        toppings.push(banana);
      }
    } else if (flavor.fruitType === "cocoa") {
      // Chocolate luxury chocolate chunks and cocoa shards
      const count = 10;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const radius = 0.5 + Math.random() * 0.8;
        const choco = createCocoaMesh();
        choco.position.set(Math.cos(angle) * radius, -0.04, Math.sin(angle) * radius);
        choco.rotation.set(Math.random() * 0.6, Math.random() * Math.PI * 2, Math.random() * 0.6);
        toppings.push(choco);
      }

      // Almond flakes scattered
      for (let i = 0; i < 12; i++) {
        const almond = createAlmondMesh();
        const r = 0.4 + Math.random() * 1.0;
        const a = Math.random() * Math.PI * 2;
        almond.position.set(Math.cos(a) * r, -0.08, Math.sin(a) * r);
        almond.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3);
        almond.scale.set(0.85, 0.85, 0.85);
        toppings.push(almond);
      }
    }

    // Mount and play intro bounce animation if specified
    toppings.forEach((top) => {
      toppingsGroup.add(top);
      if (animate) {
        const targetS = top.scale.x;
        top.scale.set(0, 0, 0);
        gsap.to(top.scale, {
          x: targetS,
          y: targetS,
          z: targetS,
          duration: 0.75,
          delay: 0.2 + Math.random() * 0.2,
          ease: "back.out(1.8)"
        });
      }
    });
  };

  // Rebuild floating ingredients drifting in space
  const rebuildFloatingElements = (idx: number, animate: boolean) => {
    if (!sceneRef.current) return;
    const { floatingGroup } = sceneRef.current;
    const flavor = FLAVORS[idx];

    // Clear old elements safely
    while (floatingGroup.children.length > 0) {
      floatingGroup.remove(floatingGroup.children[0]);
    }

    // Determine flavor-specific ingredients
    let primaryType = "raspberry";
    let secondaryType = "strawberry";

    if (flavor.id === "raspberry") {
      primaryType = "raspberry";
      secondaryType = "strawberry";
    } else if (flavor.id === "mango") {
      primaryType = "mango";
      secondaryType = "mango";
    } else if (flavor.id === "kiwi") {
      primaryType = "kiwi";
      secondaryType = "kiwi";
    } else if (flavor.id === "blueberry") {
      primaryType = "blueberry";
      secondaryType = "raspberry";
    } else if (flavor.id === "strawberry") {
      primaryType = "strawberry";
      secondaryType = "raspberry";
    } else if (flavor.id === "cocoa") {
      primaryType = "cocoa";
      secondaryType = "almond";
    }

    // Define mixed floating positions with scale and types mapped dynamically
    const positions = [
      // Left side floating
      { x: -3.2, y: 1.8, z: 1.2, type: primaryType, scale: 1.3 },
      { x: -3.5, y: -0.6, z: 0.4, type: "mint_leaf", scale: 1.4 },
      { x: -2.4, y: -1.8, z: -1.5, type: secondaryType, scale: 1.4 },
      { x: -2.9, y: 0.6, z: -0.8, type: "botanical_leaf", scale: 1.6 },

      // Right side floating
      { x: 3.1, y: 1.6, z: 0.8, type: "botanical_leaf", scale: 1.6 },
      { x: 3.6, y: 0.2, z: 1.8, type: primaryType, scale: 1.3 },
      { x: 2.5, y: -1.6, z: -1.2, type: secondaryType, scale: 1.5 },
      { x: 2.9, y: 1.0, z: -0.5, type: "mint_leaf", scale: 1.4 },

      // Bottom floating close-up
      { x: -0.8, y: -2.3, z: 2.2, type: "mint_leaf", scale: 1.5 },
      { x: 1.2, y: -2.2, z: 2.0, type: primaryType, scale: 1.3 },
    ];

    positions.forEach((p, index) => {
      let mesh: THREE.Group;
      let itemType = p.type;

      if (itemType === "mint_leaf") {
        mesh = createMintLeafMesh();
      } else if (itemType === "botanical_leaf") {
        mesh = createBotanicalLeafMesh();
      } else if (itemType === "almond") {
        mesh = createAlmondMesh();
      } else {
        mesh = createFruitMeshByType(itemType);
      }

      mesh.scale.set(p.scale, p.scale, p.scale);
      mesh.position.set(p.x, p.y, p.z);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Store anchor properties and unique speed rates for animation reference
      mesh.userData = {
        baseX: p.x,
        baseY: p.y,
        baseZ: p.z,
        rotSpeedX: 0.001 + Math.random() * 0.003,
        rotSpeedY: 0.001 + Math.random() * 0.003,
        rotSpeedZ: 0.001 + Math.random() * 0.003,
        index
      };

      floatingGroup.add(mesh);

      // Scale in animation
      if (animate) {
        mesh.scale.set(0, 0, 0);
        gsap.to(mesh.scale, {
          x: p.scale,
          y: p.scale,
          z: p.scale,
          duration: 0.9,
          delay: 0.15 + index * 0.06,
          ease: "elastic.out(1, 0.75)"
        });
      }
    });
  };

  return (
    <div
      ref={containerRef}
      id="smoothie-3d-canvas-container"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
    />
  );
}
