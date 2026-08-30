import type { LanguageRegistration } from "shiki";

/**
 * Minimal hand-rolled TextMate grammar for Power Fx.
 * Shiki/VS Code themes don't ship a Power Fx grammar, so this maps the
 * language's few syntactic categories onto scopes that existing themes
 * already know how to color (comments, strings, functions, etc).
 */
export const powerfxGrammar: LanguageRegistration = {
  name: "powerfx",
  scopeName: "source.powerfx",
  aliases: ["power-fx", "pfx"],
  patterns: [
    { include: "#comment-line" },
    { include: "#comment-block" },
    { include: "#string-double" },
    { include: "#identifier-single" },
    { include: "#number" },
    { include: "#constant" },
    { include: "#operator" },
    { include: "#function-call" },
  ],
  repository: {
    "comment-line": {
      match: "//.*$",
      name: "comment.line.double-slash.powerfx",
    },
    "comment-block": {
      begin: "/\\*",
      end: "\\*/",
      name: "comment.block.powerfx",
    },
    "string-double": {
      // Power Fx escapes a literal quote by doubling it: "He said ""hi"""
      match: '"(?:[^"]|"")*"',
      name: "string.quoted.double.powerfx",
    },
    "identifier-single": {
      // 'Field With Spaces' style references
      match: "'(?:[^']|'')*'",
      name: "variable.other.property.powerfx",
    },
    number: {
      match: "\\b\\d+(?:\\.\\d+)?\\b",
      name: "constant.numeric.powerfx",
    },
    constant: {
      match: "\\b(?:True|False|Self|Parent|ThisItem|ThisRecord)\\b",
      name: "constant.language.powerfx",
    },
    operator: {
      match:
        "<=|>=|<>|&&|\\|\\||[=<>+\\-*/&%!]|\\b(?:And|Or|Not|in|exactin)\\b",
      name: "keyword.operator.powerfx",
    },
    "function-call": {
      match: "\\b[A-Za-z_][A-Za-z0-9_]*(?=\\s*\\()",
      name: "entity.name.function.powerfx",
    },
  },
};
