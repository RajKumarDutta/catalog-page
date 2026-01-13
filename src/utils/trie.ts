class TrieNode {
  children: Map<string, TrieNode> = new Map();
  products: number[] = [];
}

export class Trie {
  private root = new TrieNode();

  insert(word: string, productIndex: number) {
    let node = this.root;
    const lower = word.toLowerCase();

    for (const char of lower) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
      node.products.push(productIndex);
    }
  }

  search(prefix: string): number[] {
    let node = this.root;
    const lower = prefix.toLowerCase();

    for (const char of lower) {
      const next = node.children.get(char);
      if (!next) return [];
      node = next;
    }
    return node.products;
  }
}
