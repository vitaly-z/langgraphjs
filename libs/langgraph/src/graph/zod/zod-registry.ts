import * as zc from "zod/v4/core";
import { SchemaMeta, SchemaMetaRegistry, schemaMetaRegistry } from "./meta.js";

/**
 * A Zod v4-compatible meta registry that extends the base registry.
 *
 * This registry allows you to associate and retrieve metadata for Zod schemas,
 * leveraging the base registry for storage. It is compatible with Zod v4 and
 * interoperates with the base registry to ensure consistent metadata management
 * across different Zod versions.
 *
 * @template Meta - The type of metadata associated with each schema.
 * @template Schema - The Zod schema type.
 */
export class LanggraphZodMetaRegistry<
  Meta extends SchemaMeta = SchemaMeta,
  Schema extends zc.$ZodType = zc.$ZodType
> extends zc.$ZodRegistry<Meta, Schema> {
  /**
   * Creates a new LanggraphZodMetaRegistry instance.
   *
   * @param parent - The base SchemaMetaRegistry to use for metadata storage.
   */
  constructor(protected parent: SchemaMetaRegistry) {
    super();
    // Use the parent's map for metadata storage
    this._map = this.parent._map as WeakMap<Schema, zc.$replace<Meta, Schema>>;
  }
}

export const langgraphRegistry = new LanggraphZodMetaRegistry(
  schemaMetaRegistry
);
