import { SiloAdapter } from "./adapter";
import type { DiskOptions, StorageManagerContructorOptions } from "./types";

export class StorageManager {
  private $disks: Map<string, SiloAdapter> = new Map();
  private $defaultDisk: string;

  constructor(constructorOptions: StorageManagerContructorOptions) {
    this.$defaultDisk = constructorOptions.defaultDisk;

    for (const [name, options] of Object.entries(constructorOptions.disks)) {
      this.registerDriver(name, options);
    }
  }

  disk<T extends SiloAdapter = SiloAdapter>(disk?: string): T {
    const selectedDisk = this.$disks.get(disk ?? this.$defaultDisk);

    if (!selectedDisk) {
      throw new Error("adapter / disk not found");
    }

    return selectedDisk as T;
  }

  registerDriver(name: string, options: DiskOptions) {
    if (options.driver === "local" && !options.config.root) {
      throw new Error("Local driver requires a root path");
    }

    if (!this.$disks.has(name)) {
      const storage = new options.adapter(options);
      this.$disks.set(name, storage);
    }
  }
}