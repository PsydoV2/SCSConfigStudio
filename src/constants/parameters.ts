import type { CategoryDef, GameInfo, ParameterDef } from "../shared/types";

// ─── Games ────────────────────────────────────────────────────────────────────

export const GAMES: GameInfo[] = [
  {
    id: "ets2",
    name: "Euro Truck Simulator 2",
    shortName: "ETS2",
    flag: "🇪🇺",
    configSubPath: "Euro Truck Simulator 2/config.cfg",
  },
  {
    id: "ats",
    name: "American Truck Simulator",
    shortName: "ATS",
    flag: "🇺🇸",
    configSubPath: "American Truck Simulator/config.cfg",
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: CategoryDef[] = [
  { id: "world", label: "World & Traffic", icon: "🌍" },
  { id: "performance", label: "Performance", icon: "⚡" },
  { id: "developer", label: "Developer Tools", icon: "🛠" },
  { id: "physics", label: "Physics", icon: "🚛" },
  { id: "vr", label: "VR", icon: "🥽" },
];

// ─── Parameters ───────────────────────────────────────────────────────────────

export const PARAMETERS: ParameterDef[] = [
  // World & Traffic
  {
    key: "traffic",
    cfgKey: "g_traffic",
    label: "Traffic Density",
    tooltip:
      "Exceeds the in-game 1.0 limit. At 3.0 you get rush-hour intensity. Values above 5.0 will stress the CPU significantly.",
    type: "slider",
    category: "world",
    defaultValue: 1.0,
    recommended: 3.0,
    warning: "Values above 5.0 may cause severe performance drops.",
    min: 0,
    max: 10,
    step: 1.0,
    unit: "×",
  },
  {
    key: "lod_traffic",
    cfgKey: "g_lod_factor_traffic",
    label: "AI Car Detail Distance",
    tooltip:
      "Controls when high-poly AI cars pop in. Higher values prevent ghosting in the distance but cost more GPU.",
    type: "slider",
    category: "world",
    defaultValue: 1.0,
    recommended: 2.0,
    min: 1,
    max: 10,
    step: 1.0,
    unit: "×",
  },
  {
    key: "lod_parked",
    cfgKey: "g_lod_factor_parked",
    label: "Parked Car Detail Distance",
    tooltip:
      "Same as AI car LOD, but applies to parked vehicles on the roadside.",
    type: "slider",
    category: "world",
    defaultValue: 1.0,
    recommended: 2.0,
    min: 1,
    max: 10,
    step: 1.0,
    unit: "×",
  },
  {
    key: "tree_distance",
    cfgKey: "g_tree_default_render_distance",
    label: "Tree Render Distance",
    tooltip:
      "Forces trees to render much further away than the Ultra setting allows. Great for screenshots.",
    type: "slider",
    category: "world",
    defaultValue: 1000,
    recommended: 3000,
    min: 500,
    max: 8000,
    step: 100,
    unit: "m",
  },

  // Performance
  {
    key: "buffer",
    cfgKey: "r_buffer_page_size",
    label: "Buffer Page Size",
    tooltip:
      "Increases memory for loading assets. Essential to prevent stutters in heavily modded games. Default is 10, recommended 30–50.",
    type: "slider",
    category: "performance",
    defaultValue: 10,
    recommended: 50,
    min: 10,
    max: 128,
    step: 1,
    unit: "MB",
  },
  {
    key: "shadow",
    cfgKey: "r_sunshadow_texture_size",
    label: "Sun Shadow Resolution",
    tooltip:
      "Forces shadow resolution higher than the in-game Ultra preset (2048). 4096 is a good balance. 8192 requires 8GB+ VRAM.",
    type: "select",
    category: "performance",
    defaultValue: 2048,
    recommended: 4096,
    warning: "8192 requires 8 GB+ VRAM and may cause stutters.",
    options: [
      { value: 512, label: "512  — Low" },
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
      "Extra buffer for VR users to improve stability and reduce reprojection artefacts.",
    type: "slider",
    category: "performance",
    defaultValue: 0,
    recommended: 20,
    min: 0,
    max: 100,
    step: 1,
    unit: "",
  },
  {
    key: "mirror_optimize",
    cfgKey: "r_mirror_group_size",
    label: "Mirror Group Optimization",
    tooltip:
      "Optimizes how mirrors are rendered in groups. Can save a few FPS on older CPUs.",
    type: "toggle",
    category: "performance",
    defaultValue: 0,
  },
  {
    key: "fps_limit",
    cfgKey: "g_fps",
    label: "Hidden FPS Limiter",
    tooltip:
      "A frame rate cap that works independently of VSync and the driver limiter. 0 = disabled.",
    type: "slider",
    category: "performance",
    defaultValue: 0,
    recommended: 60,
    min: 0,
    max: 500,
    step: 5,
    unit: "fps",
  },

  // Developer
  {
    key: "console",
    cfgKey: "g_console",
    label: "Developer Console",
    tooltip:
      "Enables the ~ console. Required for teleport commands, time-skip, and weather commands.",
    type: "toggle",
    category: "developer",
    defaultValue: 0,
  },
  {
    key: "developer_mode",
    cfgKey: "g_developer",
    label: "Developer Mode",
    tooltip:
      "Enables the free camera (Key 0), bounding box overlays and advanced debugging tools.",
    type: "toggle",
    category: "developer",
    defaultValue: 0,
  },
  {
    key: "minicon",
    cfgKey: "g_minicon",
    label: "Mini Console Overlay",
    tooltip:
      "Displays a live scrolling log of game errors and warnings at the top of the screen.",
    type: "toggle",
    category: "developer",
    defaultValue: 0,
  },
  {
    key: "flyspeed",
    cfgKey: "g_flyspeed",
    label: "Free Camera Speed",
    tooltip:
      "Adjusts how fast the free camera moves when using the numpad. Only effective when Developer Mode is on.",
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
      "When ON, air suspension automatically returns to default height after adjustment. Turn OFF for persistent manual control.",
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
      "Prevents the camera from jumping to the roof of the cab when leaning out of the window in VR.",
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
