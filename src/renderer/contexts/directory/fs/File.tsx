/* eslint-disable no-self-assign */
const fs = window.require('fs');

export default class File {
  path: string;

  name: string;

  fsContent: string;

  private $content: string = '';

  private $watchListener: any;

  open(): string {
    if (this.path !== 'undefined') {
      this.fsContent = fs.readFileSync(this.path, 'utf-8');
      this.$content = this.fsContent;
    }
    if (this.$content === '') {
      this.$content = '{}';
    }
    return this.$content;
  }

  get content(): string {
    return this.$content;
  }

  set content(content: string) {
    this.$content = content;
  }

  private $fsSave(option = ''): number {
    console.log('saving in path', this.path);
    if (
      option !== 'force' &&
      this.fsContent !== fs.readFileSync(this.path, 'utf-8')
    ) {
      console.error('File has been modified by another program : abort');
      return 2;
    }
    this.$watchListener.close();
    fs.writeFileSync(this.path, this.$content);
    this.content = this.$content;
    this.fsContent = this.$content;
    this.watchFile();
    return 0;
  }

  isToDate(): boolean {
    return this.$content === this.fsContent;
  }

  save(content?: string): number {
    if (this.path === 'undefined') {
      console.error('no path defined : abort');
      return 1;
    }
    if (content) {
      this.$content = content;
    }

    return this.$fsSave();
  }

  saveAs(path: string, content?: string): number {
    this.path = path;
    if (this.path === 'undefined') {
      console.error('no path defined : abort');
      return 1;
    }
    this.name = path.split('/').pop() || 'Untitled';
    if (content) {
      this.$content = content;
    }
    // eslint-disable-next-line consistent-return
    return this.$fsSave('force');
  }

  rename(path: string): void {
    if (this.path === 'undefined') return;
    fs.renameSync(this.path, path);
    this.path = path;
    this.name = path.split('/').pop() || 'Untitled';
  }

  watchFile(callback?: (curr: any, prev: any) => void): any {
    if (this.path === 'undefined') return null;
    this.$watchListener = fs.watchFile(this.path, (curr: any, prev: any) => {
      this.fsContent = fs.readFileSync(this.path, 'utf-8');
      console.log('Previous Modification Time', prev.mtime);
      console.log('Current Modification Time', curr.mtime);
      if (callback) {
        callback(curr, prev);
      }
    });
    return this.$watchListener;
  }

  constructor(path?: string, name?: string) {
    this.path = 'undefined';
    this.name = 'undefined';
    this.fsContent = '';
    if (path) {
      this.path = path;
      this.name = name || path.split('/').pop() || 'Untitled';
      this.watchFile();
    }
  }
}
