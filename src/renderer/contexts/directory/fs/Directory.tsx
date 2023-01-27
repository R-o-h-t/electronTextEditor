/* eslint-disable @typescript-eslint/no-explicit-any */

import File from './File';

const fs = window.require('fs');

export default class Directory extends File {
  private $children: File[];

  private $isOpen: boolean;

  constructor(path: string) {
    super(path);
    this.$children = [];
    this.$isOpen = false;
  }

  open = (): string => {
    this.$isOpen = true;
    console.log(this.$children);
    return '';
  };

  close = (): string => {
    this.$isOpen = false;
    return '';
  };

  get isOpen(): boolean {
    return this.$isOpen;
  }

  collapse(): void {
    this.$isOpen = false;
    this.$children.forEach((child) => {
      if (child instanceof Directory) {
        child.collapse();
      }
    });
  }

  get children(): File[] {
    return this.$children.sort((a, b) => {
      if (Directory.isDirectory(a) && Directory.isDirectory(b)) {
        return a.name.localeCompare(b.name);
      }
      if (Directory.isDirectory(a)) {
        return -1;
      }
      if (Directory.isDirectory(b)) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  set children(children: File[]) {
    this.$children = children;
  }

  build(): void {
    this.$children = Directory.readDir(this.path).sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }

  static isDirectory(file: File): boolean {
    return file instanceof Directory;
  }

  static readDir(path: string): File[] {
    const fileList: File[] = [];
    fs.readdirSync(path).forEach((file: any) => {
      const filePath = `${path}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const directory = new Directory(filePath);
        directory.$children = Directory.readDir(filePath);
        fileList.push(directory);
      } else {
        fileList.push(new File(filePath));
      }
    });
    return fileList;
  }
}
