export class PluginOptionError extends Error {
  constructor(option: string, reason?: unknown) {
    const detail = reason !== undefined ? reasonToString(reason) : "";
    super(
      detail.length > 0
        ? `invalid option "${option}": ${detail}`
        : `invalid option "${option}"`,
    );
  }
}

export function reasonToString(reason: unknown): string {
  if (reason instanceof Error) {
    return reason.message;
  }
  if (typeof reason === "string") {
    return reason;
  }
  return String(reason);
}
