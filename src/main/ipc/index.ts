import { registerConfigHandlers } from "./configHandlers";
import { registerSystemHandlers } from "./systemHandlers";

export function registerAllIpcHandlers(): void {
  registerConfigHandlers();
  registerSystemHandlers();
}
