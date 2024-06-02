# Silo
Multi filesystem / storage for nodejs

## Installation

```bash
npm install @haorama/silo

yarn add @haorama/silo

pnpm add @haorama/silo
```

## Usage

```ts
import { LocalAdapter, StorageManager } from "@haorama/silo";
import { resolve } from "path";

export const storageManager = new StorageManager({
  defaultDisk: "local",
  disks: {
    local: {
      driver: "local",
      adapter: LocalAdapter,
      config: {
        root: resolve("./storage"),
      },
    },
    public: {
      driver: "local",
      adapter: LocalAdapter,
      config: {
        root: resolve("./public/storage"),
      },
    },
  },
});
```

### Put File
```ts
// there is optional disk argument in disk method, default to `defaultDisk`
// put accept string, buffer or readable stream
await storageManager.disk().put("text.txt", "some text");
```

### Remove File
```ts
// remove accept multiple path
await storageManager.disk().remove("text.txt");
```

### Move File

```ts
await storageManager.disk().move("text.txt", "textv2.txt");
```
