/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

import * as t from 'io-ts';

import {
  ItemId,
  Tags,
  _Tags,
  _tags,
  description,
  exceptionListItemType,
  list_id,
  meta,
  name,
  namespace_type,
  tags,
} from '../common/schemas';
import { RequiredKeepUndefined } from '../../types';
import {
  CreateCommentsArray,
  DefaultCreateCommentsArray,
  NamespaceType,
  nonEmptyEntriesArray,
} from '../types';
import { EntriesArray } from '../types/entries';
import { DefaultUuid } from '../../siem_common_deps';

export const createExceptionListItemSchema = t.intersection([
  t.exact(
    t.type({
      description,
      entries: nonEmptyEntriesArray,
      list_id,
      name,
      type: exceptionListItemType,
    })
  ),
  t.exact(
    t.partial({
      _tags, // defaults to empty array if not set during decode
      comments: DefaultCreateCommentsArray, // defaults to empty array if not set during decode
      item_id: DefaultUuid, // defaults to GUID (uuid v4) if not set during decode
      meta, // defaults to undefined if not set during decode
      namespace_type, // defaults to 'single' if not set during decode
      tags, // defaults to empty array if not set during decode
    })
  ),
]);

export type CreateExceptionListItemSchema = t.OutputOf<typeof createExceptionListItemSchema>;

// This type is used after a decode since some things are defaults after a decode.
export type CreateExceptionListItemSchemaDecoded = Omit<
  RequiredKeepUndefined<t.TypeOf<typeof createExceptionListItemSchema>>,
  '_tags' | 'tags' | 'item_id' | 'entries' | 'namespace_type' | 'comments'
> & {
  _tags: _Tags;
  comments: CreateCommentsArray;
  tags: Tags;
  item_id: ItemId;
  entries: EntriesArray;
  namespace_type: NamespaceType;
};
