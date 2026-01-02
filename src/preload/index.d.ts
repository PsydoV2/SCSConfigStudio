import { ElectronAPI } from '@electron-toolkit/preload'

// Definiere die Struktur deiner API in einem Interface
export interface ISystemInfo {
  platform: string
  arch: string
  version: string
}

export interface ICustomAPI {
  getSystemInfo: () => Promise<ISystemInfo>
  sendNotification: (text: string) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ICustomAPI // Nutze das Interface hier
  }
}
