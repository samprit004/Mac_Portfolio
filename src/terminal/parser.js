/**
 * Terminal Command Parser
 * ─────────────────────────────────────────────────────────────────
 * Tokenises a raw input string into a structured command object.
 * Handles quoted arguments so:  goto "Nike Project"  works correctly.
 */

/**
 * Split a string into tokens respecting quoted substrings.
 * E.g.  'open "my app" --force'  → ['open', 'my app', '--force']
 */
const tokenise = (input) => {
  const tokens = [];
  let current = '';
  let inQuote = null;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if ((ch === '"' || ch === "'") && inQuote === null) {
      inQuote = ch;
    } else if (ch === inQuote) {
      inQuote = null;
    } else if (ch === ' ' && inQuote === null) {
      if (current) { tokens.push(current); current = ''; }
    } else {
      current += ch;
    }
  }

  if (current) tokens.push(current);
  return tokens;
};

/**
 * Parse a raw terminal input string.
 *
 * @returns {{ name: string, subcommand: string|null, args: string[], flags: string[], raw: string }}
 */
export const parseCommand = (input) => {
  const trimmed = input.trim();

  // Strip leading slash (both '/help' and 'help' work)
  const normalised = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;

  const tokens = tokenise(normalised);
  const [name = '', second = '', ...rest] = tokens;

  // Flags start with '-'
  const allArgs   = [second, ...rest].filter(Boolean);
  const flags     = allArgs.filter(t => t.startsWith('-'));
  const posArgs   = allArgs.filter(t => !t.startsWith('-'));

  return {
    name:       name.toLowerCase(),
    subcommand: posArgs[0] ?? null,
    args:       posArgs,
    flags,
    raw:        trimmed,
  };
};
