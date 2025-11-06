export interface AddFieldsStage {
  $addFields: Record<string, any>;
}

export interface BucketStage {
  $bucket: {
    groupBy: any;
    boundaries: any[];
    default?: any;
    output?: Record<string, any>;
  };
}

export interface BucketAutoStage {
  $bucketAuto: {
    groupBy: any;
    buckets: number;
    output?: Record<string, any>;
    granularity?: string;
  };
}

export interface ChangeStreamStage {
  $changeStream: {
    allChangesForCluster?: boolean;
    fullDocument?: string;
    fullDocumentBeforeChange?: string;
    resumeAfter?: any;
    showExpandedEvents?: boolean;
    startAfter?: any;
    startAtOperationTime?: any;
  };
}

export interface ChangeStreamSplitLargeEventStage {
  $changeStreamSplitLargeEvent: Record<string, never>;
}

export interface CollStatsStage {
  $collStats: {
    latencyStats?: Record<string, any>;
    storageStats?: Record<string, any>;
    count?: Record<string, any>;
    queryExecStats?: Record<string, any>;
  };
}

export interface CountStage {
  $count: string;
}

export interface CurrentOpStage {
  $currentOp: {
    allUsers?: boolean;
    idleConnections?: boolean;
    idleSessions?: boolean;
    localOps?: boolean;
  };
}

export interface DensifyStage {
  $densify: {
    field: string;
    partitionByFields?: string[];
    range: {
      step: number | { $numberDouble: string } | { $numberLong: string };
      unit?: string;
      bounds: 'full' | 'partition' | [any, any];
    };
  };
}

export interface DocumentsStage {
  $documents: any[];
}

export interface FacetStage {
  $facet: Record<string, AggregationStage[]>;
}

export interface FillStage {
  $fill: {
    partitionBy?: any;
    partitionByFields?: string[];
    sortBy?: Record<string, 1 | -1>;
    output: Record<string, {
      value: any;
      method?: 'linear' | 'locf';
    }>;
  };
}

export interface GeoNearStage {
  $geoNear: {
    near: { type: 'Point'; coordinates: [number, number] };
    distanceField: string;
    spherical?: boolean;
    maxDistance?: number;
    minDistance?: number;
    query?: any;
    distanceMultiplier?: number;
    includeLocs?: string;
    uniqueDocs?: boolean;
    num?: number;
  };
}

export interface GraphLookupStage {
  $graphLookup: {
    from: string;
    startWith: any;
    connectFromField: string;
    connectToField: string;
    as: string;
    maxDepth?: number;
    depthField?: string;
    restrictSearchWithMatch?: any;
  };
}

export interface GroupStage {
  $group: {
    _id: any;
    [key: string]: any;
  };
}

export interface IndexStatsStage {
  $indexStats: Record<string, never>;
}

export interface LimitStage {
  $limit: number;
}

export interface ListLocalSessionsStage {
  $listLocalSessions: {
    users?: Array<{ user: string; db: string }>;
    allUsers?: boolean;
  };
}

export interface ListSessionsStage {
  $listSessions: {
    users?: Array<{ user: string; db: string }>;
    allUsers?: boolean;
  };
}

export interface LookupStage {
  $lookup: {
    from: string;
    localField?: string;
    foreignField?: string;
    let?: Record<string, any>;
    pipeline?: AggregationStage[];
    as: string;
  };
}

export interface MatchStage {
  $match: Record<string, any>;
}

export interface MergeStage {
  $merge: {
    into: string | { db: string; coll: string };
    on?: string | string[];
    let?: Record<string, any>;
    whenMatched?: 'replace' | 'keepExisting' | 'merge' | 'fail' | AggregationStage[];
    whenNotMatched?: 'insert' | 'discard' | 'fail';
  };
}

export interface OutStage {
  $out: string | { db: string; coll: string };
}

export interface PlanCacheStatsStage {
  $planCacheStats: Record<string, never>;
}

export interface ProjectStage {
  $project: Record<string, any>;
}

export interface RedactStage {
  $redact: any;
}

export interface ReplaceRootStage {
  $replaceRoot: {
    newRoot: any;
  };
}

export interface ReplaceWithStage {
  $replaceWith: any;
}

export interface SampleStage {
  $sample: {
    size: number;
  };
}

export interface SearchStage {
  $search: {
    index?: string;
    [key: string]: any;
  };
}

export interface SearchMetaStage {
  $searchMeta: {
    index?: string;
    [key: string]: any;
  };
}

export interface SetStage {
  $set: Record<string, any>;
}

export interface SetWindowFieldsStage {
  $setWindowFields: {
    partitionBy?: any;
    sortBy?: Record<string, 1 | -1>;
    output: Record<string, {
      [operator: string]: any;
      window?: {
        documents?: [string | number, string | number];
        range?: [string | number, string | number];
        unit?: string;
      };
    }>;
  };
}

export interface ShardedDataDistributionStage {
  $shardedDataDistribution: Record<string, never>;
}

export interface SkipStage {
  $skip: number;
}

export interface SortStage {
  $sort: Record<string, 1 | -1>;
}

export interface SortByCountStage {
  $sortByCount: any;
}

export interface UnionWithStage {
  $unionWith: {
    coll: string;
    pipeline?: AggregationStage[];
  };
}

export interface UnsetStage {
  $unset: string | string[];
}

export interface UnwindStage {
  $unwind: string | {
    path: string;
    includeArrayIndex?: string;
    preserveNullAndEmptyArrays?: boolean;
  };
}

export type AggregationStage =
  | AddFieldsStage
  | BucketStage
  | BucketAutoStage
  | ChangeStreamStage
  | ChangeStreamSplitLargeEventStage
  | CollStatsStage
  | CountStage
  | CurrentOpStage
  | DensifyStage
  | DocumentsStage
  | FacetStage
  | FillStage
  | GeoNearStage
  | GraphLookupStage
  | GroupStage
  | IndexStatsStage
  | LimitStage
  | ListLocalSessionsStage
  | ListSessionsStage
  | LookupStage
  | MatchStage
  | MergeStage
  | OutStage
  | PlanCacheStatsStage
  | ProjectStage
  | RedactStage
  | ReplaceRootStage
  | ReplaceWithStage
  | SampleStage
  | SearchStage
  | SearchMetaStage
  | SetStage
  | SetWindowFieldsStage
  | ShardedDataDistributionStage
  | SkipStage
  | SortStage
  | SortByCountStage
  | UnionWithStage
  | UnsetStage
  | UnwindStage;

export type Pipeline = AggregationStage[];

export interface ThemeConfig {
  [key: string]: string
}

export interface MongoAggregationBuilderProps {
  theme?: ThemeConfig
  initialPipeline?: Pipeline
}
