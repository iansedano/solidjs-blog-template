/// <reference types="@solidjs/start/env" />

type Post = {
  data: Record<string, never>; // frontMatterSchema
  content: string;
  fileStem: string;
};
