import type { CategoryDef, GameInfo, ParameterDef } from "../shared/types";

// ─── Games ────────────────────────────────────────────────────────────────────

export const GAMES: GameInfo[] = [
  {
    id: "ets2",
    name: "Euro Truck Simulator 2",
    shortName: "ETS2",
    flag: "EU",
    configSubPath: "Euro Truck Simulator 2/config.cfg",
  },
  {
    id: "ats",
    name: "American Truck Simulator",
    shortName: "ATS",
    flag: "US",
    configSubPath: "American Truck Simulator/config.cfg",
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: CategoryDef[] = [
  { id: "world", label: "World & Traffic", icon: "world" },
  { id: "performance", label: "Performance", icon: "performance" },
  { id: "developer", label: "Developer Tools", icon: "developer" },
  { id: "physics", label: "Physics", icon: "physics" },
  { id: "vr", label: "VR", icon: "vr" },
];

// ─── Parameters ───────────────────────────────────────────────────────────────

export const PARAMETERS: ParameterDef[] = [
  // World & Traffic
  {
    key: "traffic",
    cfgKey: "g_traffic",
    label: "Traffic Density",
    tooltip:
      "The in-game slider maxes out at 1.0. Set to 3 for busy roads, 5+ for rush-hour chaos. High values stress the CPU.",
    type: "slider",
    category: "world",
    defaultValue: 1,
    recommended: 3,
    warning: "Values above 5 may cause severe performance drops.",
    min: 1,
    max: 10,
    step: 1,
    unit: "×",
  },
  {
    key: "lod_traffic",
    cfgKey: "g_lod_factor_traffic",
    label: "AI Car Detail Distance",
    tooltip:
      "Controls how far away AI cars render in full detail. Higher values eliminate pop-in but cost GPU memory.",
    type: "slider",
    category: "world",
    defaultValue: 1,
    recommended: 2,
    min: 1,
    max: 10,
    step: 1,
    unit: "×",
  },
  {
    key: "lod_parked",
    cfgKey: "g_lod_factor_parked",
    label: "Parked Car Detail Distance",
    tooltip:
      "Same as AI car LOD but applies to parked vehicles on the roadside.",
    type: "slider",
    category: "world",
    defaultValue: 1,
    recommended: 2,
    min: 1,
    max: 10,
    step: 1,
    unit: "×",
  },
  {
    key: "tree_distance",
    cfgKey: "g_tree_default_render_distance",
    label: "Tree Render Distance",
    tooltip:
      "Forces trees to render further than the Ultra preset allows. Great for screenshots and immersion.",
    type: "slider",
    category: "world",
    defaultValue: 1000,
    recommended: 3000,
    min: 500,
    max: 8000,
    step: 500,
    unit: "m",
  },

  // Performance
  {
    key: "buffer",
    cfgKey: "r_buffer_page_size",
    label: "Buffer Page Size",
    tooltip:
      "Increases the engine memory buffer for asset loading. Prevents stutters when using heavy map mods. Default is 10.",
    type: "slider",
    category: "performance",
    defaultValue: 10,
    recommended: 50,
    min: 10,
    max: 128,
    step: 10,
    unit: "MB",
  },
  {
    key: "shadow",
    cfgKey: "r_sunshadow_texture_size",
    label: "Sun Shadow Resolution",
    tooltip:
      "Forces shadow resolution above the in-game Ultra preset (2048). 4096 is a solid upgrade. 8192 requires 8 GB+ VRAM.",
    type: "select",
    category: "performance",
    defaultValue: 2048,
    recommended: 4096,
    warning: "8192 requires 8 GB+ VRAM and may cause stutters.",
    options: [
      { value: 512, label: "512 — Low" },
      { value: 1024, label: "1024 — Medium" },
      { value: 2048, label: "2048 — Ultra (default)" },
      { value: 4096, label: "4096 — High ↑" },
      { value: 8192, label: "8192 — Max ↑↑" },
    ],
  },
  {
    key: "stereo_buffer",
    cfgKey: "r_manual_stereo_buffer_ext",
    label: "VR Stereo Buffer",
    tooltip:
      "Extra render buffer for VR headsets. Reduces reprojection artefacts. Only relevant if you use VR.",
    type: "slider",
    category: "performance",
    defaultValue: 0,
    recommended: 20,
    min: 0,
    max: 100,
    step: 5,
    unit: "",
  },
  {
    key: "mirror_optimize",
    cfgKey: "r_mirror_group_size",
    label: "Mirror Group Optimization",
    tooltip:
      "Groups mirror updates to reduce draw calls. Can recover a few FPS on CPU-limited systems.",
    type: "toggle",
    category: "performance",
    defaultValue: 0,
  },
  {
    key: "fps_limit",
    cfgKey: "g_fps",
    label: "Hidden FPS Limiter",
    tooltip:
      "A frame rate cap independent of VSync and driver-level limiters. Set to 0 to disable.",
    type: "slider",
    category: "performance",
    defaultValue: 0,
    recommended: 60,
    min: 0,
    max: 240,
    step: 5,
    unit: "fps",
  },

  // Developer
  {
    key: "console",
    cfgKey: "g_console",
    label: "Developer Console",
    tooltip:
      "Enables the ~ console. Needed for teleport, time-skip, and weather commands.",
    type: "toggle",
    category: "developer",
    defaultValue: 0,
  },
  {
    key: "developer_mode",
    cfgKey: "g_developer",
    label: "Developer Mode",
    tooltip:
      "Enables the free camera (Key 0), bounding box overlays, and advanced debug tools.",
    type: "toggle",
    category: "developer",
    defaultValue: 0,
  },
  {
    key: "minicon",
    cfgKey: "g_minicon",
    label: "Mini Console Overlay",
    tooltip:
      "Shows a live scrolling log of game errors and warnings at the top of the screen.",
    type: "toggle",
    category: "developer",
    defaultValue: 0,
  },
  {
    key: "flyspeed",
    cfgKey: "g_flyspeed",
    label: "Free Camera Speed",
    tooltip:
      "How fast the free camera moves when using the numpad. Only works when Developer Mode is on.",
    type: "slider",
    category: "developer",
    defaultValue: 100,
    recommended: 500,
    min: 10,
    max: 2000,
    step: 10,
    unit: "",
  },

  // Physics
  {
    key: "suspension_reset",
    cfgKey: "g_suspension_auto_reset",
    label: "Auto Suspension Reset",
    tooltip:
      "When ON, air suspension snaps back to default height automatically. Turn OFF to keep manual adjustments persistent.",
    type: "toggle",
    category: "physics",
    defaultValue: 1,
  },

  // VR
  {
    key: "vr_window_lean",
    cfgKey: "g_hmd_no_outside",
    label: "VR Window Lean Fix",
    tooltip:
      "Stops the camera from jumping to the cab roof when leaning out of the window in VR.",
    type: "toggle",
    category: "vr",
    defaultValue: 0,
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const DEFAULT_VALUES: Record<string, number> = Object.fromEntries(
  PARAMETERS.map((p) => [p.key, p.defaultValue]),
);

export const RECOMMENDED_VALUES: Record<string, number> = Object.fromEntries(
  PARAMETERS.filter((p) => p.recommended !== undefined).map((p) => [
    p.key,
    p.recommended as number,
  ]),
);
