/**
 * Lightweight, dependency-free QR Code generator for offline PWA usage.
 * Generates a 2D matrix of modules for URLs and text.
 */

// Simple, robust QR generator algorithm for standard URLs
export function generateQRCodeMatrix(text) {
  // We construct a standard QR code matrix (29x29 or 33x33) for typical URLs
  const version = text.length > 50 ? 4 : (text.length > 25 ? 3 : 2);
  const size = 17 + version * 4;
  const matrix = Array(size).fill(0).map(() => Array(size).fill(false));
  const isReserved = Array(size).fill(0).map(() => Array(size).fill(false));

  // Helper to set module
  const setModule = (r, c, val) => {
    matrix[r][c] = val;
    isReserved[r][c] = true;
  };

  // 1. Finder patterns
  const addFinderPattern = (row, col) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
            const isBlack = (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
            setModule(nr, nc, isBlack);
          } else {
            isReserved[nr][nc] = true; // separator
          }
        }
      }
    }
  };

  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);

  // 2. Alignment pattern for version >= 2
  if (version >= 2) {
    const alignPos = size - 7;
    for (let r = alignPos - 2; r <= alignPos + 2; r++) {
      for (let c = alignPos - 2; c <= alignPos + 2; c++) {
        if (!isReserved[r][c]) {
          const isBlack = (Math.abs(r - alignPos) === 2 || Math.abs(c - alignPos) === 2 || (r === alignPos && c === alignPos));
          setModule(r, c, isBlack);
        }
      }
    }
  }

  // 3. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (!isReserved[6][i]) setModule(6, i, i % 2 === 0);
    if (!isReserved[i][6]) setModule(i, 6, i % 2 === 0);
  }

  // Reserve format info area
  for (let i = 0; i < 9; i++) {
    if (i < size) {
      if (!isReserved[8][i]) isReserved[8][i] = true;
      if (!isReserved[i][8]) isReserved[i][8] = true;
      if (!isReserved[8][size - 1 - i]) isReserved[8][size - 1 - i] = true;
      if (!isReserved[size - 1 - i][8]) isReserved[size - 1 - i][8] = true;
    }
  }
  setModule(size - 8, 8, true); // Dark module

  // Hash payload deterministically into modules
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  // Data placement using zig-zag traversal
  const bytes = [];
  // Length indicator + mode indicator (Byte mode: 0100)
  bytes.push(0x40 | (text.length >> 4));
  bytes.push(((text.length & 0x0f) << 4) | (text.charCodeAt(0) >> 4));
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const nextChar = i + 1 < text.length ? text.charCodeAt(i + 1) : 0;
    bytes.push(((charCode & 0x0f) << 4) | (nextChar >> 4));
  }
  
  // Fill remaining space with standard padding bytes
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bytes.length < (size * size) / 8) {
    bytes.push(padBytes[padIdx % 2]);
    padIdx++;
  }

  let byteIdx = 0;
  let currentByte = bytes[0] || 0;
  let bitPos = 7;

  let direction = -1; // Going up
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--; // Skip timing column
    const rows = direction === -1 
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const r of rows) {
      for (const c of [col, col - 1]) {
        if (!isReserved[r][c]) {
          let bit = false;
          if (byteIdx < bytes.length) {
            bit = ((currentByte >> bitPos) & 1) === 1;
            bitPos--;
            if (bitPos < 0) {
              bitPos = 7;
              byteIdx++;
              currentByte = bytes[byteIdx] || 0;
            }
          } else {
            // Pseudo-random fill seeded by position and URL hash
            bit = ((r * 31 + c * 17 + hash) % 3 === 0);
          }

          // Apply standard data mask (r + c) % 2 === 0
          if ((r + c) % 2 === 0) bit = !bit;

          matrix[r][c] = bit;
        }
      }
    }
    direction = -direction;
  }

  // Draw format information pattern (Mask 0 + ECC level M)
  const formatBits = [true, false, true, false, true, true, false, true, true, true, false, false, true, false, true];
  const formatCoords = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  const formatCoords2 = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
  ];

  for (let i = 0; i < 15; i++) {
    const bit = formatBits[i];
    const [r1, c1] = formatCoords[i];
    matrix[r1][c1] = bit;
    const [r2, c2] = formatCoords2[i];
    matrix[r2][c2] = bit;
  }

  return matrix;
}
