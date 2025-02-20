// Simple hash function to generate a number from a string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate a hue value from 0-360 from a hash
function generateHue(hash: number): number {
  return hash % 360;
}

// Generate HSL colors with good saturation and lightness values
export function generateColorScheme(seed: string) {
  const hash = hashCode(seed);
  const baseHue = generateHue(hash);

  return {
    // Main frame color - darker shade
    frame: `hsl(${baseHue}, 45%, 35%)`,
    // Door color - lighter than frame
    door: `hsl(${baseHue}, 45%, 45%)`,
    // Accent color - vibrant complementary color
    accent: `hsl(${(baseHue + 150) % 360}, 70%, 75%)`,
    // Handle color - warm neutral
    handle: `hsl(35, 80%, 75%)`,
    // Interior color - darkest shade
    interior: `hsl(${baseHue}, 45%, 25%)`,
    // Compartment color - same as frame but will be used with opacity
    compartment: `hsl(${baseHue}, 45%, 35%)`,
  };
}
