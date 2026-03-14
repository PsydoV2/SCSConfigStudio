import { registerConfigHandlers } from "./configHandlers";
import { registerSystemHandlers } from "./systemHandlers";
import { registerWindowHandlers } from "./windowHandlers";

export function registerAllIpcHandlers(): void {
  registerConfigHandlers();
  registerSystemHandlers();
  registerWindowHandlers();
}
