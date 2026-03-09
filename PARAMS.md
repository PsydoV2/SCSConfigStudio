### SCS Config Studio - Hidden Parameters List

Diese Parameter sind in der `config.cfg` (oder `profile.cfg`) vorhanden, aber nicht über das In-Game-Menü von ETS2/ATS erreichbar.

#### 🛠️ Engine & Performance (Technical Tweaks)

| Parameter                    | Default | Range        | Description (English)                                                                                           |
| ---------------------------- | ------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `r_buffer_page_size`         | `10`    | `10 - 128`   | Increases memory for loading assets. Essential to prevent stutters in modded games (Recommended: `30` or `50`). |
| `r_manual_stereo_buffer_ext` | `0`     | `0 - 100`    | Extra buffer for VR users to improve stability and performance.                                                 |
| `r_sunshadow_texture_size`   | `2048`  | `512 - 8192` | Forces shadow resolution higher than "Ultra". Warning: High VRAM impact.                                        |
| `r_mirror_group_size`        | `0`     | `0 - 1`      | Optimizes how mirrors are updated. Can save FPS on older CPUs.                                                  |

#### 🚦 Traffic & Environment (Advanced Control)

| Parameter                        | Default | Range        | Description (English)                                                                                 |
| -------------------------------- | ------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `g_traffic`                      | `1.0`   | `0.0 - 10.0` | In-game slider only goes to 1.0. This allows for massive traffic (e.g., `3.0` for rush hour feeling). |
| `g_lod_factor_traffic`           | `1.0`   | `0.1 - 10.0` | Controls when high-poly AI cars pop in. Higher values prevent "ghosting" in the distance.             |
| `g_lod_factor_parked`            | `1.0`   | `0.1 - 10.0` | Same as traffic, but for parked vehicles on the roadside.                                             |
| `g_tree_default_render_distance` | `1000`  | `500 - 8000` | Forces trees to render much further away than the "Ultra" setting allows.                             |

#### 🖥️ Interface & Console (Power User Tools)

| Parameter     | Default | Range       | Description (English)                                                           |
| ------------- | ------- | ----------- | ------------------------------------------------------------------------------- |
| `g_console`   | `0`     | `0 / 1`     | Enables the developer console. Required for teleporting and time-skip commands. |
| `g_developer` | `0`     | `0 / 1`     | Enables the free camera (Key 0) and advanced debugging tools.                   |
| `g_minicon`   | `0`     | `0 / 1`     | Displays a live scrolling log of errors and warnings at the top of the screen.  |
| `g_flyspeed`  | `100`   | `10 - 2000` | Adjusts how fast the free-cam moves when using the numpad.                      |
| `g_fps`       | `0`     | `0 - 500`   | A hidden frame rate limiter that works independently of VSync.                  |

#### 🚛 Physics & Feedback

| Parameter                 | Default | Range   | Description (English)                                                                      |
| ------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------ |
| `g_hmd_no_outside`        | `0`     | `0 / 1` | For VR users: Prevents the camera from jumping to the roof when leaning out of the window. |
| `g_suspension_auto_reset` | `1`     | `0 / 1` | Prevents the air suspension from automatically returning to default height.                |

---

### Logo-Konzept für das "Studio" Design

Da das Tool "Hidden Features" freischaltet, hier eine moderne Design-Idee:

- **Das Icon:** Ein stilisierter **LKW-Scheinwerfer**, der einen Lichtkegel wirft. Im Inneren des Lichtkegels sieht man ein **Code-Symbol** (`</>`) oder ein **Schieberegler-Icon**.
- **Symbolik:** Es steht dafür, "Licht ins Dunkle" der versteckten Einstellungen zu bringen.
- **Farbschema:** Deep Space Blue (`#1a1a2e`) als Hintergrund, mit Akzenten in "SCS Orange" (`#ff9100`) für die Interaktionselemente.

### Nächster Schritt für deine Electron App

Möchtest du, dass ich dir ein kurzes **JavaScript-Snippet** schreibe, wie man die `config.cfg` sicher einliest, ohne die Formatierung (die `uset`-Struktur) zu zerstören? Das ist oft der schwierigste Teil, damit das Spiel die Datei danach noch erkennt.
