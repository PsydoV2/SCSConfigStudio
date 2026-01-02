import { registerNotyHandlers } from "./notification";
import { registerSystemHandlers } from "./system";

export function registerIpcHandlers(): void {
  registerSystemHandlers();
  registerNotyHandlers();
}
