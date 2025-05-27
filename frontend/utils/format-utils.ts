export function formatFileNameAsTitle(fileName: string): string {
  // 1. Remove extension
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');

  // 2. Insert space between camelCase (e.g. "CvHansCeril" → "Cv Hans Ceril")
  const spaced = nameWithoutExtension.replace(/([a-z])([A-Z])/g, '$1 $2');

  // 3. Replace dashes and underscores with spaces
  const normalized = spaced.replace(/[-_]+/g, ' ');

  // 4. Capitalize each word
  return normalized
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}