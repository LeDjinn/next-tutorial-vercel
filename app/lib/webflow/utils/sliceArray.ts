export function sliceArray<T>(inputArray: T[], count: number): T[] {
    // Return a new array containing only the first 'count' elements
    return inputArray.slice(0, count);
  }