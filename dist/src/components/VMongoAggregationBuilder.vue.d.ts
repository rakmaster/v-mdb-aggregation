import { Pipeline, AggregationStage } from '../types';
interface Props {
    initialPipeline?: Pipeline;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        toolbar?(_: {
            stages: ({
                $addFields: Record<string, any>;
            } | {
                $bucket: {
                    groupBy: any;
                    boundaries: any[];
                    default?: any;
                    output?: Record<string, any> | undefined;
                };
            } | {
                $bucketAuto: {
                    groupBy: any;
                    buckets: number;
                    output?: Record<string, any> | undefined;
                    granularity?: string | undefined;
                };
            } | {
                $changeStream: {
                    allChangesForCluster?: boolean | undefined;
                    fullDocument?: string | undefined;
                    fullDocumentBeforeChange?: string | undefined;
                    resumeAfter?: any;
                    showExpandedEvents?: boolean | undefined;
                    startAfter?: any;
                    startAtOperationTime?: any;
                };
            } | {
                $changeStreamSplitLargeEvent: Record<string, never>;
            } | {
                $collStats: {
                    latencyStats?: Record<string, any> | undefined;
                    storageStats?: Record<string, any> | undefined;
                    count?: Record<string, any> | undefined;
                    queryExecStats?: Record<string, any> | undefined;
                };
            } | {
                $count: string;
            } | {
                $currentOp: {
                    allUsers?: boolean | undefined;
                    idleConnections?: boolean | undefined;
                    idleSessions?: boolean | undefined;
                    localOps?: boolean | undefined;
                };
            } | {
                $densify: {
                    field: string;
                    partitionByFields?: string[] | undefined;
                    range: {
                        step: number | {
                            $numberDouble: string;
                        } | {
                            $numberLong: string;
                        };
                        unit?: string | undefined;
                        bounds: "full" | "partition" | [any, any];
                    };
                };
            } | {
                $documents: any[];
            } | {
                $facet: Record<string, AggregationStage[]>;
            } | {
                $fill: {
                    partitionBy?: any;
                    partitionByFields?: string[] | undefined;
                    sortBy?: Record<string, 1 | -1> | undefined;
                    output: Record<string, {
                        value: any;
                        method?: "linear" | "locf";
                    }>;
                };
            } | {
                $geoNear: {
                    near: {
                        type: "Point";
                        coordinates: [number, number];
                    };
                    distanceField: string;
                    spherical?: boolean | undefined;
                    maxDistance?: number | undefined;
                    minDistance?: number | undefined;
                    query?: any;
                    distanceMultiplier?: number | undefined;
                    includeLocs?: string | undefined;
                    uniqueDocs?: boolean | undefined;
                    num?: number | undefined;
                };
            } | {
                $graphLookup: {
                    from: string;
                    startWith: any;
                    connectFromField: string;
                    connectToField: string;
                    as: string;
                    maxDepth?: number | undefined;
                    depthField?: string | undefined;
                    restrictSearchWithMatch?: any;
                };
            } | {
                $group: {
                    [x: string]: any;
                    _id: any;
                };
            } | {
                $indexStats: Record<string, never>;
            } | {
                $limit: number;
            } | {
                $listLocalSessions: {
                    users?: {
                        user: string;
                        db: string;
                    }[] | undefined;
                    allUsers?: boolean | undefined;
                };
            } | {
                $listSessions: {
                    users?: {
                        user: string;
                        db: string;
                    }[] | undefined;
                    allUsers?: boolean | undefined;
                };
            } | {
                $lookup: {
                    from: string;
                    localField?: string | undefined;
                    foreignField?: string | undefined;
                    let?: Record<string, any> | undefined;
                    pipeline?: ({
                        $addFields: Record<string, any>;
                    } | {
                        $bucket: {
                            groupBy: any;
                            boundaries: any[];
                            default?: any;
                            output?: Record<string, any> | undefined;
                        };
                    } | {
                        $bucketAuto: {
                            groupBy: any;
                            buckets: number;
                            output?: Record<string, any> | undefined;
                            granularity?: string | undefined;
                        };
                    } | {
                        $changeStream: {
                            allChangesForCluster?: boolean | undefined;
                            fullDocument?: string | undefined;
                            fullDocumentBeforeChange?: string | undefined;
                            resumeAfter?: any;
                            showExpandedEvents?: boolean | undefined;
                            startAfter?: any;
                            startAtOperationTime?: any;
                        };
                    } | {
                        $changeStreamSplitLargeEvent: Record<string, never>;
                    } | {
                        $collStats: {
                            latencyStats?: Record<string, any> | undefined;
                            storageStats?: Record<string, any> | undefined;
                            count?: Record<string, any> | undefined;
                            queryExecStats?: Record<string, any> | undefined;
                        };
                    } | {
                        $count: string;
                    } | {
                        $currentOp: {
                            allUsers?: boolean | undefined;
                            idleConnections?: boolean | undefined;
                            idleSessions?: boolean | undefined;
                            localOps?: boolean | undefined;
                        };
                    } | {
                        $densify: {
                            field: string;
                            partitionByFields?: string[] | undefined;
                            range: {
                                step: number | {
                                    $numberDouble: string;
                                } | {
                                    $numberLong: string;
                                };
                                unit?: string | undefined;
                                bounds: "full" | "partition" | [any, any];
                            };
                        };
                    } | {
                        $documents: any[];
                    } | {
                        $facet: Record<string, AggregationStage[]>;
                    } | {
                        $fill: {
                            partitionBy?: any;
                            partitionByFields?: string[] | undefined;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                value: any;
                                method?: "linear" | "locf";
                            }>;
                        };
                    } | {
                        $geoNear: {
                            near: {
                                type: "Point";
                                coordinates: [number, number];
                            };
                            distanceField: string;
                            spherical?: boolean | undefined;
                            maxDistance?: number | undefined;
                            minDistance?: number | undefined;
                            query?: any;
                            distanceMultiplier?: number | undefined;
                            includeLocs?: string | undefined;
                            uniqueDocs?: boolean | undefined;
                            num?: number | undefined;
                        };
                    } | {
                        $graphLookup: {
                            from: string;
                            startWith: any;
                            connectFromField: string;
                            connectToField: string;
                            as: string;
                            maxDepth?: number | undefined;
                            depthField?: string | undefined;
                            restrictSearchWithMatch?: any;
                        };
                    } | {
                        $group: {
                            [x: string]: any;
                            _id: any;
                        };
                    } | {
                        $indexStats: Record<string, never>;
                    } | {
                        $limit: number;
                    } | {
                        $listLocalSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $listSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | /*elided*/ any | {
                        $match: Record<string, any>;
                    } | {
                        $merge: {
                            into: string | {
                                db: string;
                                coll: string;
                            };
                            on?: string | string[] | undefined;
                            let?: Record<string, any> | undefined;
                            whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | {
                                $unionWith: {
                                    coll: string;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                };
                            } | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                        };
                    } | {
                        $out: string | {
                            db: string;
                            coll: string;
                        };
                    } | {
                        $planCacheStats: Record<string, never>;
                    } | {
                        $project: Record<string, any>;
                    } | {
                        $redact: any;
                    } | {
                        $replaceRoot: {
                            newRoot: any;
                        };
                    } | {
                        $replaceWith: any;
                    } | {
                        $sample: {
                            size: number;
                        };
                    } | {
                        $search: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $searchMeta: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $set: Record<string, any>;
                    } | {
                        $setWindowFields: {
                            partitionBy?: any;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                [operator: string]: any;
                                window?: {
                                    documents?: [string | number, string | number];
                                    range?: [string | number, string | number];
                                    unit?: string;
                                };
                            }>;
                        };
                    } | {
                        $shardedDataDistribution: Record<string, never>;
                    } | {
                        $skip: number;
                    } | {
                        $sort: Record<string, 1 | -1>;
                    } | {
                        $sortByCount: any;
                    } | {
                        $unionWith: {
                            coll: string;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | {
                                $merge: {
                                    into: string | {
                                        db: string;
                                        coll: string;
                                    };
                                    on?: string | string[] | undefined;
                                    let?: Record<string, any> | undefined;
                                    whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                                };
                            } | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                        };
                    } | {
                        $unset: string | string[];
                    } | {
                        $unwind: string | {
                            path: string;
                            includeArrayIndex?: string | undefined;
                            preserveNullAndEmptyArrays?: boolean | undefined;
                        };
                    })[] | undefined;
                    as: string;
                };
            } | {
                $match: Record<string, any>;
            } | {
                $merge: {
                    into: string | {
                        db: string;
                        coll: string;
                    };
                    on?: string | string[] | undefined;
                    let?: Record<string, any> | undefined;
                    whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                        $addFields: Record<string, any>;
                    } | {
                        $bucket: {
                            groupBy: any;
                            boundaries: any[];
                            default?: any;
                            output?: Record<string, any> | undefined;
                        };
                    } | {
                        $bucketAuto: {
                            groupBy: any;
                            buckets: number;
                            output?: Record<string, any> | undefined;
                            granularity?: string | undefined;
                        };
                    } | {
                        $changeStream: {
                            allChangesForCluster?: boolean | undefined;
                            fullDocument?: string | undefined;
                            fullDocumentBeforeChange?: string | undefined;
                            resumeAfter?: any;
                            showExpandedEvents?: boolean | undefined;
                            startAfter?: any;
                            startAtOperationTime?: any;
                        };
                    } | {
                        $changeStreamSplitLargeEvent: Record<string, never>;
                    } | {
                        $collStats: {
                            latencyStats?: Record<string, any> | undefined;
                            storageStats?: Record<string, any> | undefined;
                            count?: Record<string, any> | undefined;
                            queryExecStats?: Record<string, any> | undefined;
                        };
                    } | {
                        $count: string;
                    } | {
                        $currentOp: {
                            allUsers?: boolean | undefined;
                            idleConnections?: boolean | undefined;
                            idleSessions?: boolean | undefined;
                            localOps?: boolean | undefined;
                        };
                    } | {
                        $densify: {
                            field: string;
                            partitionByFields?: string[] | undefined;
                            range: {
                                step: number | {
                                    $numberDouble: string;
                                } | {
                                    $numberLong: string;
                                };
                                unit?: string | undefined;
                                bounds: "full" | "partition" | [any, any];
                            };
                        };
                    } | {
                        $documents: any[];
                    } | {
                        $facet: Record<string, AggregationStage[]>;
                    } | {
                        $fill: {
                            partitionBy?: any;
                            partitionByFields?: string[] | undefined;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                value: any;
                                method?: "linear" | "locf";
                            }>;
                        };
                    } | {
                        $geoNear: {
                            near: {
                                type: "Point";
                                coordinates: [number, number];
                            };
                            distanceField: string;
                            spherical?: boolean | undefined;
                            maxDistance?: number | undefined;
                            minDistance?: number | undefined;
                            query?: any;
                            distanceMultiplier?: number | undefined;
                            includeLocs?: string | undefined;
                            uniqueDocs?: boolean | undefined;
                            num?: number | undefined;
                        };
                    } | {
                        $graphLookup: {
                            from: string;
                            startWith: any;
                            connectFromField: string;
                            connectToField: string;
                            as: string;
                            maxDepth?: number | undefined;
                            depthField?: string | undefined;
                            restrictSearchWithMatch?: any;
                        };
                    } | {
                        $group: {
                            [x: string]: any;
                            _id: any;
                        };
                    } | {
                        $indexStats: Record<string, never>;
                    } | {
                        $limit: number;
                    } | {
                        $listLocalSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $listSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $lookup: {
                            from: string;
                            localField?: string | undefined;
                            foreignField?: string | undefined;
                            let?: Record<string, any> | undefined;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | {
                                $unionWith: {
                                    coll: string;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                };
                            } | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            as: string;
                        };
                    } | {
                        $match: Record<string, any>;
                    } | /*elided*/ any | {
                        $out: string | {
                            db: string;
                            coll: string;
                        };
                    } | {
                        $planCacheStats: Record<string, never>;
                    } | {
                        $project: Record<string, any>;
                    } | {
                        $redact: any;
                    } | {
                        $replaceRoot: {
                            newRoot: any;
                        };
                    } | {
                        $replaceWith: any;
                    } | {
                        $sample: {
                            size: number;
                        };
                    } | {
                        $search: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $searchMeta: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $set: Record<string, any>;
                    } | {
                        $setWindowFields: {
                            partitionBy?: any;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                [operator: string]: any;
                                window?: {
                                    documents?: [string | number, string | number];
                                    range?: [string | number, string | number];
                                    unit?: string;
                                };
                            }>;
                        };
                    } | {
                        $shardedDataDistribution: Record<string, never>;
                    } | {
                        $skip: number;
                    } | {
                        $sort: Record<string, 1 | -1>;
                    } | {
                        $sortByCount: any;
                    } | {
                        $unionWith: {
                            coll: string;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $lookup: {
                                    from: string;
                                    localField?: string | undefined;
                                    foreignField?: string | undefined;
                                    let?: Record<string, any> | undefined;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    as: string;
                                };
                            } | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                        };
                    } | {
                        $unset: string | string[];
                    } | {
                        $unwind: string | {
                            path: string;
                            includeArrayIndex?: string | undefined;
                            preserveNullAndEmptyArrays?: boolean | undefined;
                        };
                    })[] | undefined;
                    whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                };
            } | {
                $out: string | {
                    db: string;
                    coll: string;
                };
            } | {
                $planCacheStats: Record<string, never>;
            } | {
                $project: Record<string, any>;
            } | {
                $redact: any;
            } | {
                $replaceRoot: {
                    newRoot: any;
                };
            } | {
                $replaceWith: any;
            } | {
                $sample: {
                    size: number;
                };
            } | {
                $search: {
                    [x: string]: any;
                    index?: string | undefined;
                };
            } | {
                $searchMeta: {
                    [x: string]: any;
                    index?: string | undefined;
                };
            } | {
                $set: Record<string, any>;
            } | {
                $setWindowFields: {
                    partitionBy?: any;
                    sortBy?: Record<string, 1 | -1> | undefined;
                    output: Record<string, {
                        [operator: string]: any;
                        window?: {
                            documents?: [string | number, string | number];
                            range?: [string | number, string | number];
                            unit?: string;
                        };
                    }>;
                };
            } | {
                $shardedDataDistribution: Record<string, never>;
            } | {
                $skip: number;
            } | {
                $sort: Record<string, 1 | -1>;
            } | {
                $sortByCount: any;
            } | {
                $unionWith: {
                    coll: string;
                    pipeline?: ({
                        $addFields: Record<string, any>;
                    } | {
                        $bucket: {
                            groupBy: any;
                            boundaries: any[];
                            default?: any;
                            output?: Record<string, any> | undefined;
                        };
                    } | {
                        $bucketAuto: {
                            groupBy: any;
                            buckets: number;
                            output?: Record<string, any> | undefined;
                            granularity?: string | undefined;
                        };
                    } | {
                        $changeStream: {
                            allChangesForCluster?: boolean | undefined;
                            fullDocument?: string | undefined;
                            fullDocumentBeforeChange?: string | undefined;
                            resumeAfter?: any;
                            showExpandedEvents?: boolean | undefined;
                            startAfter?: any;
                            startAtOperationTime?: any;
                        };
                    } | {
                        $changeStreamSplitLargeEvent: Record<string, never>;
                    } | {
                        $collStats: {
                            latencyStats?: Record<string, any> | undefined;
                            storageStats?: Record<string, any> | undefined;
                            count?: Record<string, any> | undefined;
                            queryExecStats?: Record<string, any> | undefined;
                        };
                    } | {
                        $count: string;
                    } | {
                        $currentOp: {
                            allUsers?: boolean | undefined;
                            idleConnections?: boolean | undefined;
                            idleSessions?: boolean | undefined;
                            localOps?: boolean | undefined;
                        };
                    } | {
                        $densify: {
                            field: string;
                            partitionByFields?: string[] | undefined;
                            range: {
                                step: number | {
                                    $numberDouble: string;
                                } | {
                                    $numberLong: string;
                                };
                                unit?: string | undefined;
                                bounds: "full" | "partition" | [any, any];
                            };
                        };
                    } | {
                        $documents: any[];
                    } | {
                        $facet: Record<string, AggregationStage[]>;
                    } | {
                        $fill: {
                            partitionBy?: any;
                            partitionByFields?: string[] | undefined;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                value: any;
                                method?: "linear" | "locf";
                            }>;
                        };
                    } | {
                        $geoNear: {
                            near: {
                                type: "Point";
                                coordinates: [number, number];
                            };
                            distanceField: string;
                            spherical?: boolean | undefined;
                            maxDistance?: number | undefined;
                            minDistance?: number | undefined;
                            query?: any;
                            distanceMultiplier?: number | undefined;
                            includeLocs?: string | undefined;
                            uniqueDocs?: boolean | undefined;
                            num?: number | undefined;
                        };
                    } | {
                        $graphLookup: {
                            from: string;
                            startWith: any;
                            connectFromField: string;
                            connectToField: string;
                            as: string;
                            maxDepth?: number | undefined;
                            depthField?: string | undefined;
                            restrictSearchWithMatch?: any;
                        };
                    } | {
                        $group: {
                            [x: string]: any;
                            _id: any;
                        };
                    } | {
                        $indexStats: Record<string, never>;
                    } | {
                        $limit: number;
                    } | {
                        $listLocalSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $listSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $lookup: {
                            from: string;
                            localField?: string | undefined;
                            foreignField?: string | undefined;
                            let?: Record<string, any> | undefined;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | {
                                $merge: {
                                    into: string | {
                                        db: string;
                                        coll: string;
                                    };
                                    on?: string | string[] | undefined;
                                    let?: Record<string, any> | undefined;
                                    whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                                };
                            } | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            as: string;
                        };
                    } | {
                        $match: Record<string, any>;
                    } | {
                        $merge: {
                            into: string | {
                                db: string;
                                coll: string;
                            };
                            on?: string | string[] | undefined;
                            let?: Record<string, any> | undefined;
                            whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $lookup: {
                                    from: string;
                                    localField?: string | undefined;
                                    foreignField?: string | undefined;
                                    let?: Record<string, any> | undefined;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    as: string;
                                };
                            } | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                        };
                    } | {
                        $out: string | {
                            db: string;
                            coll: string;
                        };
                    } | {
                        $planCacheStats: Record<string, never>;
                    } | {
                        $project: Record<string, any>;
                    } | {
                        $redact: any;
                    } | {
                        $replaceRoot: {
                            newRoot: any;
                        };
                    } | {
                        $replaceWith: any;
                    } | {
                        $sample: {
                            size: number;
                        };
                    } | {
                        $search: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $searchMeta: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $set: Record<string, any>;
                    } | {
                        $setWindowFields: {
                            partitionBy?: any;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                [operator: string]: any;
                                window?: {
                                    documents?: [string | number, string | number];
                                    range?: [string | number, string | number];
                                    unit?: string;
                                };
                            }>;
                        };
                    } | {
                        $shardedDataDistribution: Record<string, never>;
                    } | {
                        $skip: number;
                    } | {
                        $sort: Record<string, 1 | -1>;
                    } | {
                        $sortByCount: any;
                    } | /*elided*/ any | {
                        $unset: string | string[];
                    } | {
                        $unwind: string | {
                            path: string;
                            includeArrayIndex?: string | undefined;
                            preserveNullAndEmptyArrays?: boolean | undefined;
                        };
                    })[] | undefined;
                };
            } | {
                $unset: string | string[];
            } | {
                $unwind: string | {
                    path: string;
                    includeArrayIndex?: string | undefined;
                    preserveNullAndEmptyArrays?: boolean | undefined;
                };
            })[];
            viewMode: "text" | "stages";
            addStage: () => void;
            expandAllStages: () => void;
            collapseAllStages: () => void;
            exportPipeline: () => void;
            viewModeOptions: {
                title: string;
                value: string;
            }[];
        }): any;
        'toolbar-prepend'?(_: {}): any;
        'toolbar-append'?(_: {}): any;
        validation?(_: {
            errors: string[];
            hasErrors: boolean;
            error: string;
        }): any;
        output?(_: {
            pipeline: ({
                $addFields: Record<string, any>;
            } | {
                $bucket: {
                    groupBy: any;
                    boundaries: any[];
                    default?: any;
                    output?: Record<string, any> | undefined;
                };
            } | {
                $bucketAuto: {
                    groupBy: any;
                    buckets: number;
                    output?: Record<string, any> | undefined;
                    granularity?: string | undefined;
                };
            } | {
                $changeStream: {
                    allChangesForCluster?: boolean | undefined;
                    fullDocument?: string | undefined;
                    fullDocumentBeforeChange?: string | undefined;
                    resumeAfter?: any;
                    showExpandedEvents?: boolean | undefined;
                    startAfter?: any;
                    startAtOperationTime?: any;
                };
            } | {
                $changeStreamSplitLargeEvent: Record<string, never>;
            } | {
                $collStats: {
                    latencyStats?: Record<string, any> | undefined;
                    storageStats?: Record<string, any> | undefined;
                    count?: Record<string, any> | undefined;
                    queryExecStats?: Record<string, any> | undefined;
                };
            } | {
                $count: string;
            } | {
                $currentOp: {
                    allUsers?: boolean | undefined;
                    idleConnections?: boolean | undefined;
                    idleSessions?: boolean | undefined;
                    localOps?: boolean | undefined;
                };
            } | {
                $densify: {
                    field: string;
                    partitionByFields?: string[] | undefined;
                    range: {
                        step: number | {
                            $numberDouble: string;
                        } | {
                            $numberLong: string;
                        };
                        unit?: string | undefined;
                        bounds: "full" | "partition" | [any, any];
                    };
                };
            } | {
                $documents: any[];
            } | {
                $facet: Record<string, AggregationStage[]>;
            } | {
                $fill: {
                    partitionBy?: any;
                    partitionByFields?: string[] | undefined;
                    sortBy?: Record<string, 1 | -1> | undefined;
                    output: Record<string, {
                        value: any;
                        method?: "linear" | "locf";
                    }>;
                };
            } | {
                $geoNear: {
                    near: {
                        type: "Point";
                        coordinates: [number, number];
                    };
                    distanceField: string;
                    spherical?: boolean | undefined;
                    maxDistance?: number | undefined;
                    minDistance?: number | undefined;
                    query?: any;
                    distanceMultiplier?: number | undefined;
                    includeLocs?: string | undefined;
                    uniqueDocs?: boolean | undefined;
                    num?: number | undefined;
                };
            } | {
                $graphLookup: {
                    from: string;
                    startWith: any;
                    connectFromField: string;
                    connectToField: string;
                    as: string;
                    maxDepth?: number | undefined;
                    depthField?: string | undefined;
                    restrictSearchWithMatch?: any;
                };
            } | {
                $group: {
                    [x: string]: any;
                    _id: any;
                };
            } | {
                $indexStats: Record<string, never>;
            } | {
                $limit: number;
            } | {
                $listLocalSessions: {
                    users?: {
                        user: string;
                        db: string;
                    }[] | undefined;
                    allUsers?: boolean | undefined;
                };
            } | {
                $listSessions: {
                    users?: {
                        user: string;
                        db: string;
                    }[] | undefined;
                    allUsers?: boolean | undefined;
                };
            } | {
                $lookup: {
                    from: string;
                    localField?: string | undefined;
                    foreignField?: string | undefined;
                    let?: Record<string, any> | undefined;
                    pipeline?: ({
                        $addFields: Record<string, any>;
                    } | {
                        $bucket: {
                            groupBy: any;
                            boundaries: any[];
                            default?: any;
                            output?: Record<string, any> | undefined;
                        };
                    } | {
                        $bucketAuto: {
                            groupBy: any;
                            buckets: number;
                            output?: Record<string, any> | undefined;
                            granularity?: string | undefined;
                        };
                    } | {
                        $changeStream: {
                            allChangesForCluster?: boolean | undefined;
                            fullDocument?: string | undefined;
                            fullDocumentBeforeChange?: string | undefined;
                            resumeAfter?: any;
                            showExpandedEvents?: boolean | undefined;
                            startAfter?: any;
                            startAtOperationTime?: any;
                        };
                    } | {
                        $changeStreamSplitLargeEvent: Record<string, never>;
                    } | {
                        $collStats: {
                            latencyStats?: Record<string, any> | undefined;
                            storageStats?: Record<string, any> | undefined;
                            count?: Record<string, any> | undefined;
                            queryExecStats?: Record<string, any> | undefined;
                        };
                    } | {
                        $count: string;
                    } | {
                        $currentOp: {
                            allUsers?: boolean | undefined;
                            idleConnections?: boolean | undefined;
                            idleSessions?: boolean | undefined;
                            localOps?: boolean | undefined;
                        };
                    } | {
                        $densify: {
                            field: string;
                            partitionByFields?: string[] | undefined;
                            range: {
                                step: number | {
                                    $numberDouble: string;
                                } | {
                                    $numberLong: string;
                                };
                                unit?: string | undefined;
                                bounds: "full" | "partition" | [any, any];
                            };
                        };
                    } | {
                        $documents: any[];
                    } | {
                        $facet: Record<string, AggregationStage[]>;
                    } | {
                        $fill: {
                            partitionBy?: any;
                            partitionByFields?: string[] | undefined;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                value: any;
                                method?: "linear" | "locf";
                            }>;
                        };
                    } | {
                        $geoNear: {
                            near: {
                                type: "Point";
                                coordinates: [number, number];
                            };
                            distanceField: string;
                            spherical?: boolean | undefined;
                            maxDistance?: number | undefined;
                            minDistance?: number | undefined;
                            query?: any;
                            distanceMultiplier?: number | undefined;
                            includeLocs?: string | undefined;
                            uniqueDocs?: boolean | undefined;
                            num?: number | undefined;
                        };
                    } | {
                        $graphLookup: {
                            from: string;
                            startWith: any;
                            connectFromField: string;
                            connectToField: string;
                            as: string;
                            maxDepth?: number | undefined;
                            depthField?: string | undefined;
                            restrictSearchWithMatch?: any;
                        };
                    } | {
                        $group: {
                            [x: string]: any;
                            _id: any;
                        };
                    } | {
                        $indexStats: Record<string, never>;
                    } | {
                        $limit: number;
                    } | {
                        $listLocalSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $listSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | /*elided*/ any | {
                        $match: Record<string, any>;
                    } | {
                        $merge: {
                            into: string | {
                                db: string;
                                coll: string;
                            };
                            on?: string | string[] | undefined;
                            let?: Record<string, any> | undefined;
                            whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | {
                                $unionWith: {
                                    coll: string;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                };
                            } | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                        };
                    } | {
                        $out: string | {
                            db: string;
                            coll: string;
                        };
                    } | {
                        $planCacheStats: Record<string, never>;
                    } | {
                        $project: Record<string, any>;
                    } | {
                        $redact: any;
                    } | {
                        $replaceRoot: {
                            newRoot: any;
                        };
                    } | {
                        $replaceWith: any;
                    } | {
                        $sample: {
                            size: number;
                        };
                    } | {
                        $search: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $searchMeta: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $set: Record<string, any>;
                    } | {
                        $setWindowFields: {
                            partitionBy?: any;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                [operator: string]: any;
                                window?: {
                                    documents?: [string | number, string | number];
                                    range?: [string | number, string | number];
                                    unit?: string;
                                };
                            }>;
                        };
                    } | {
                        $shardedDataDistribution: Record<string, never>;
                    } | {
                        $skip: number;
                    } | {
                        $sort: Record<string, 1 | -1>;
                    } | {
                        $sortByCount: any;
                    } | {
                        $unionWith: {
                            coll: string;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | {
                                $merge: {
                                    into: string | {
                                        db: string;
                                        coll: string;
                                    };
                                    on?: string | string[] | undefined;
                                    let?: Record<string, any> | undefined;
                                    whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                                };
                            } | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                        };
                    } | {
                        $unset: string | string[];
                    } | {
                        $unwind: string | {
                            path: string;
                            includeArrayIndex?: string | undefined;
                            preserveNullAndEmptyArrays?: boolean | undefined;
                        };
                    })[] | undefined;
                    as: string;
                };
            } | {
                $match: Record<string, any>;
            } | {
                $merge: {
                    into: string | {
                        db: string;
                        coll: string;
                    };
                    on?: string | string[] | undefined;
                    let?: Record<string, any> | undefined;
                    whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                        $addFields: Record<string, any>;
                    } | {
                        $bucket: {
                            groupBy: any;
                            boundaries: any[];
                            default?: any;
                            output?: Record<string, any> | undefined;
                        };
                    } | {
                        $bucketAuto: {
                            groupBy: any;
                            buckets: number;
                            output?: Record<string, any> | undefined;
                            granularity?: string | undefined;
                        };
                    } | {
                        $changeStream: {
                            allChangesForCluster?: boolean | undefined;
                            fullDocument?: string | undefined;
                            fullDocumentBeforeChange?: string | undefined;
                            resumeAfter?: any;
                            showExpandedEvents?: boolean | undefined;
                            startAfter?: any;
                            startAtOperationTime?: any;
                        };
                    } | {
                        $changeStreamSplitLargeEvent: Record<string, never>;
                    } | {
                        $collStats: {
                            latencyStats?: Record<string, any> | undefined;
                            storageStats?: Record<string, any> | undefined;
                            count?: Record<string, any> | undefined;
                            queryExecStats?: Record<string, any> | undefined;
                        };
                    } | {
                        $count: string;
                    } | {
                        $currentOp: {
                            allUsers?: boolean | undefined;
                            idleConnections?: boolean | undefined;
                            idleSessions?: boolean | undefined;
                            localOps?: boolean | undefined;
                        };
                    } | {
                        $densify: {
                            field: string;
                            partitionByFields?: string[] | undefined;
                            range: {
                                step: number | {
                                    $numberDouble: string;
                                } | {
                                    $numberLong: string;
                                };
                                unit?: string | undefined;
                                bounds: "full" | "partition" | [any, any];
                            };
                        };
                    } | {
                        $documents: any[];
                    } | {
                        $facet: Record<string, AggregationStage[]>;
                    } | {
                        $fill: {
                            partitionBy?: any;
                            partitionByFields?: string[] | undefined;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                value: any;
                                method?: "linear" | "locf";
                            }>;
                        };
                    } | {
                        $geoNear: {
                            near: {
                                type: "Point";
                                coordinates: [number, number];
                            };
                            distanceField: string;
                            spherical?: boolean | undefined;
                            maxDistance?: number | undefined;
                            minDistance?: number | undefined;
                            query?: any;
                            distanceMultiplier?: number | undefined;
                            includeLocs?: string | undefined;
                            uniqueDocs?: boolean | undefined;
                            num?: number | undefined;
                        };
                    } | {
                        $graphLookup: {
                            from: string;
                            startWith: any;
                            connectFromField: string;
                            connectToField: string;
                            as: string;
                            maxDepth?: number | undefined;
                            depthField?: string | undefined;
                            restrictSearchWithMatch?: any;
                        };
                    } | {
                        $group: {
                            [x: string]: any;
                            _id: any;
                        };
                    } | {
                        $indexStats: Record<string, never>;
                    } | {
                        $limit: number;
                    } | {
                        $listLocalSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $listSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $lookup: {
                            from: string;
                            localField?: string | undefined;
                            foreignField?: string | undefined;
                            let?: Record<string, any> | undefined;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | {
                                $unionWith: {
                                    coll: string;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                };
                            } | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            as: string;
                        };
                    } | {
                        $match: Record<string, any>;
                    } | /*elided*/ any | {
                        $out: string | {
                            db: string;
                            coll: string;
                        };
                    } | {
                        $planCacheStats: Record<string, never>;
                    } | {
                        $project: Record<string, any>;
                    } | {
                        $redact: any;
                    } | {
                        $replaceRoot: {
                            newRoot: any;
                        };
                    } | {
                        $replaceWith: any;
                    } | {
                        $sample: {
                            size: number;
                        };
                    } | {
                        $search: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $searchMeta: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $set: Record<string, any>;
                    } | {
                        $setWindowFields: {
                            partitionBy?: any;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                [operator: string]: any;
                                window?: {
                                    documents?: [string | number, string | number];
                                    range?: [string | number, string | number];
                                    unit?: string;
                                };
                            }>;
                        };
                    } | {
                        $shardedDataDistribution: Record<string, never>;
                    } | {
                        $skip: number;
                    } | {
                        $sort: Record<string, 1 | -1>;
                    } | {
                        $sortByCount: any;
                    } | {
                        $unionWith: {
                            coll: string;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $lookup: {
                                    from: string;
                                    localField?: string | undefined;
                                    foreignField?: string | undefined;
                                    let?: Record<string, any> | undefined;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    as: string;
                                };
                            } | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                        };
                    } | {
                        $unset: string | string[];
                    } | {
                        $unwind: string | {
                            path: string;
                            includeArrayIndex?: string | undefined;
                            preserveNullAndEmptyArrays?: boolean | undefined;
                        };
                    })[] | undefined;
                    whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                };
            } | {
                $out: string | {
                    db: string;
                    coll: string;
                };
            } | {
                $planCacheStats: Record<string, never>;
            } | {
                $project: Record<string, any>;
            } | {
                $redact: any;
            } | {
                $replaceRoot: {
                    newRoot: any;
                };
            } | {
                $replaceWith: any;
            } | {
                $sample: {
                    size: number;
                };
            } | {
                $search: {
                    [x: string]: any;
                    index?: string | undefined;
                };
            } | {
                $searchMeta: {
                    [x: string]: any;
                    index?: string | undefined;
                };
            } | {
                $set: Record<string, any>;
            } | {
                $setWindowFields: {
                    partitionBy?: any;
                    sortBy?: Record<string, 1 | -1> | undefined;
                    output: Record<string, {
                        [operator: string]: any;
                        window?: {
                            documents?: [string | number, string | number];
                            range?: [string | number, string | number];
                            unit?: string;
                        };
                    }>;
                };
            } | {
                $shardedDataDistribution: Record<string, never>;
            } | {
                $skip: number;
            } | {
                $sort: Record<string, 1 | -1>;
            } | {
                $sortByCount: any;
            } | {
                $unionWith: {
                    coll: string;
                    pipeline?: ({
                        $addFields: Record<string, any>;
                    } | {
                        $bucket: {
                            groupBy: any;
                            boundaries: any[];
                            default?: any;
                            output?: Record<string, any> | undefined;
                        };
                    } | {
                        $bucketAuto: {
                            groupBy: any;
                            buckets: number;
                            output?: Record<string, any> | undefined;
                            granularity?: string | undefined;
                        };
                    } | {
                        $changeStream: {
                            allChangesForCluster?: boolean | undefined;
                            fullDocument?: string | undefined;
                            fullDocumentBeforeChange?: string | undefined;
                            resumeAfter?: any;
                            showExpandedEvents?: boolean | undefined;
                            startAfter?: any;
                            startAtOperationTime?: any;
                        };
                    } | {
                        $changeStreamSplitLargeEvent: Record<string, never>;
                    } | {
                        $collStats: {
                            latencyStats?: Record<string, any> | undefined;
                            storageStats?: Record<string, any> | undefined;
                            count?: Record<string, any> | undefined;
                            queryExecStats?: Record<string, any> | undefined;
                        };
                    } | {
                        $count: string;
                    } | {
                        $currentOp: {
                            allUsers?: boolean | undefined;
                            idleConnections?: boolean | undefined;
                            idleSessions?: boolean | undefined;
                            localOps?: boolean | undefined;
                        };
                    } | {
                        $densify: {
                            field: string;
                            partitionByFields?: string[] | undefined;
                            range: {
                                step: number | {
                                    $numberDouble: string;
                                } | {
                                    $numberLong: string;
                                };
                                unit?: string | undefined;
                                bounds: "full" | "partition" | [any, any];
                            };
                        };
                    } | {
                        $documents: any[];
                    } | {
                        $facet: Record<string, AggregationStage[]>;
                    } | {
                        $fill: {
                            partitionBy?: any;
                            partitionByFields?: string[] | undefined;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                value: any;
                                method?: "linear" | "locf";
                            }>;
                        };
                    } | {
                        $geoNear: {
                            near: {
                                type: "Point";
                                coordinates: [number, number];
                            };
                            distanceField: string;
                            spherical?: boolean | undefined;
                            maxDistance?: number | undefined;
                            minDistance?: number | undefined;
                            query?: any;
                            distanceMultiplier?: number | undefined;
                            includeLocs?: string | undefined;
                            uniqueDocs?: boolean | undefined;
                            num?: number | undefined;
                        };
                    } | {
                        $graphLookup: {
                            from: string;
                            startWith: any;
                            connectFromField: string;
                            connectToField: string;
                            as: string;
                            maxDepth?: number | undefined;
                            depthField?: string | undefined;
                            restrictSearchWithMatch?: any;
                        };
                    } | {
                        $group: {
                            [x: string]: any;
                            _id: any;
                        };
                    } | {
                        $indexStats: Record<string, never>;
                    } | {
                        $limit: number;
                    } | {
                        $listLocalSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $listSessions: {
                            users?: {
                                user: string;
                                db: string;
                            }[] | undefined;
                            allUsers?: boolean | undefined;
                        };
                    } | {
                        $lookup: {
                            from: string;
                            localField?: string | undefined;
                            foreignField?: string | undefined;
                            let?: Record<string, any> | undefined;
                            pipeline?: ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | /*elided*/ any | {
                                $match: Record<string, any>;
                            } | {
                                $merge: {
                                    into: string | {
                                        db: string;
                                        coll: string;
                                    };
                                    on?: string | string[] | undefined;
                                    let?: Record<string, any> | undefined;
                                    whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                                };
                            } | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            as: string;
                        };
                    } | {
                        $match: Record<string, any>;
                    } | {
                        $merge: {
                            into: string | {
                                db: string;
                                coll: string;
                            };
                            on?: string | string[] | undefined;
                            let?: Record<string, any> | undefined;
                            whenMatched?: "replace" | "keepExisting" | "merge" | "fail" | ({
                                $addFields: Record<string, any>;
                            } | {
                                $bucket: {
                                    groupBy: any;
                                    boundaries: any[];
                                    default?: any;
                                    output?: Record<string, any> | undefined;
                                };
                            } | {
                                $bucketAuto: {
                                    groupBy: any;
                                    buckets: number;
                                    output?: Record<string, any> | undefined;
                                    granularity?: string | undefined;
                                };
                            } | {
                                $changeStream: {
                                    allChangesForCluster?: boolean | undefined;
                                    fullDocument?: string | undefined;
                                    fullDocumentBeforeChange?: string | undefined;
                                    resumeAfter?: any;
                                    showExpandedEvents?: boolean | undefined;
                                    startAfter?: any;
                                    startAtOperationTime?: any;
                                };
                            } | {
                                $changeStreamSplitLargeEvent: Record<string, never>;
                            } | {
                                $collStats: {
                                    latencyStats?: Record<string, any> | undefined;
                                    storageStats?: Record<string, any> | undefined;
                                    count?: Record<string, any> | undefined;
                                    queryExecStats?: Record<string, any> | undefined;
                                };
                            } | {
                                $count: string;
                            } | {
                                $currentOp: {
                                    allUsers?: boolean | undefined;
                                    idleConnections?: boolean | undefined;
                                    idleSessions?: boolean | undefined;
                                    localOps?: boolean | undefined;
                                };
                            } | {
                                $densify: {
                                    field: string;
                                    partitionByFields?: string[] | undefined;
                                    range: {
                                        step: number | {
                                            $numberDouble: string;
                                        } | {
                                            $numberLong: string;
                                        };
                                        unit?: string | undefined;
                                        bounds: "full" | "partition" | [any, any];
                                    };
                                };
                            } | {
                                $documents: any[];
                            } | {
                                $facet: Record<string, AggregationStage[]>;
                            } | {
                                $fill: {
                                    partitionBy?: any;
                                    partitionByFields?: string[] | undefined;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        value: any;
                                        method?: "linear" | "locf";
                                    }>;
                                };
                            } | {
                                $geoNear: {
                                    near: {
                                        type: "Point";
                                        coordinates: [number, number];
                                    };
                                    distanceField: string;
                                    spherical?: boolean | undefined;
                                    maxDistance?: number | undefined;
                                    minDistance?: number | undefined;
                                    query?: any;
                                    distanceMultiplier?: number | undefined;
                                    includeLocs?: string | undefined;
                                    uniqueDocs?: boolean | undefined;
                                    num?: number | undefined;
                                };
                            } | {
                                $graphLookup: {
                                    from: string;
                                    startWith: any;
                                    connectFromField: string;
                                    connectToField: string;
                                    as: string;
                                    maxDepth?: number | undefined;
                                    depthField?: string | undefined;
                                    restrictSearchWithMatch?: any;
                                };
                            } | {
                                $group: {
                                    [x: string]: any;
                                    _id: any;
                                };
                            } | {
                                $indexStats: Record<string, never>;
                            } | {
                                $limit: number;
                            } | {
                                $listLocalSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $listSessions: {
                                    users?: {
                                        user: string;
                                        db: string;
                                    }[] | undefined;
                                    allUsers?: boolean | undefined;
                                };
                            } | {
                                $lookup: {
                                    from: string;
                                    localField?: string | undefined;
                                    foreignField?: string | undefined;
                                    let?: Record<string, any> | undefined;
                                    pipeline?: ({
                                        $addFields: Record<string, any>;
                                    } | {
                                        $bucket: {
                                            groupBy: any;
                                            boundaries: any[];
                                            default?: any;
                                            output?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $bucketAuto: {
                                            groupBy: any;
                                            buckets: number;
                                            output?: Record<string, any> | undefined;
                                            granularity?: string | undefined;
                                        };
                                    } | {
                                        $changeStream: {
                                            allChangesForCluster?: boolean | undefined;
                                            fullDocument?: string | undefined;
                                            fullDocumentBeforeChange?: string | undefined;
                                            resumeAfter?: any;
                                            showExpandedEvents?: boolean | undefined;
                                            startAfter?: any;
                                            startAtOperationTime?: any;
                                        };
                                    } | {
                                        $changeStreamSplitLargeEvent: Record<string, never>;
                                    } | {
                                        $collStats: {
                                            latencyStats?: Record<string, any> | undefined;
                                            storageStats?: Record<string, any> | undefined;
                                            count?: Record<string, any> | undefined;
                                            queryExecStats?: Record<string, any> | undefined;
                                        };
                                    } | {
                                        $count: string;
                                    } | {
                                        $currentOp: {
                                            allUsers?: boolean | undefined;
                                            idleConnections?: boolean | undefined;
                                            idleSessions?: boolean | undefined;
                                            localOps?: boolean | undefined;
                                        };
                                    } | {
                                        $densify: {
                                            field: string;
                                            partitionByFields?: string[] | undefined;
                                            range: {
                                                step: number | {
                                                    $numberDouble: string;
                                                } | {
                                                    $numberLong: string;
                                                };
                                                unit?: string | undefined;
                                                bounds: "full" | "partition" | [any, any];
                                            };
                                        };
                                    } | {
                                        $documents: any[];
                                    } | {
                                        $facet: Record<string, AggregationStage[]>;
                                    } | {
                                        $fill: {
                                            partitionBy?: any;
                                            partitionByFields?: string[] | undefined;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                value: any;
                                                method?: "linear" | "locf";
                                            }>;
                                        };
                                    } | {
                                        $geoNear: {
                                            near: {
                                                type: "Point";
                                                coordinates: [number, number];
                                            };
                                            distanceField: string;
                                            spherical?: boolean | undefined;
                                            maxDistance?: number | undefined;
                                            minDistance?: number | undefined;
                                            query?: any;
                                            distanceMultiplier?: number | undefined;
                                            includeLocs?: string | undefined;
                                            uniqueDocs?: boolean | undefined;
                                            num?: number | undefined;
                                        };
                                    } | {
                                        $graphLookup: {
                                            from: string;
                                            startWith: any;
                                            connectFromField: string;
                                            connectToField: string;
                                            as: string;
                                            maxDepth?: number | undefined;
                                            depthField?: string | undefined;
                                            restrictSearchWithMatch?: any;
                                        };
                                    } | {
                                        $group: {
                                            [x: string]: any;
                                            _id: any;
                                        };
                                    } | {
                                        $indexStats: Record<string, never>;
                                    } | {
                                        $limit: number;
                                    } | {
                                        $listLocalSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | {
                                        $listSessions: {
                                            users?: {
                                                user: string;
                                                db: string;
                                            }[] | undefined;
                                            allUsers?: boolean | undefined;
                                        };
                                    } | /*elided*/ any | {
                                        $match: Record<string, any>;
                                    } | /*elided*/ any | {
                                        $out: string | {
                                            db: string;
                                            coll: string;
                                        };
                                    } | {
                                        $planCacheStats: Record<string, never>;
                                    } | {
                                        $project: Record<string, any>;
                                    } | {
                                        $redact: any;
                                    } | {
                                        $replaceRoot: {
                                            newRoot: any;
                                        };
                                    } | {
                                        $replaceWith: any;
                                    } | {
                                        $sample: {
                                            size: number;
                                        };
                                    } | {
                                        $search: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $searchMeta: {
                                            [x: string]: any;
                                            index?: string | undefined;
                                        };
                                    } | {
                                        $set: Record<string, any>;
                                    } | {
                                        $setWindowFields: {
                                            partitionBy?: any;
                                            sortBy?: Record<string, 1 | -1> | undefined;
                                            output: Record<string, {
                                                [operator: string]: any;
                                                window?: {
                                                    documents?: [string | number, string | number];
                                                    range?: [string | number, string | number];
                                                    unit?: string;
                                                };
                                            }>;
                                        };
                                    } | {
                                        $shardedDataDistribution: Record<string, never>;
                                    } | {
                                        $skip: number;
                                    } | {
                                        $sort: Record<string, 1 | -1>;
                                    } | {
                                        $sortByCount: any;
                                    } | /*elided*/ any | {
                                        $unset: string | string[];
                                    } | {
                                        $unwind: string | {
                                            path: string;
                                            includeArrayIndex?: string | undefined;
                                            preserveNullAndEmptyArrays?: boolean | undefined;
                                        };
                                    })[] | undefined;
                                    as: string;
                                };
                            } | {
                                $match: Record<string, any>;
                            } | /*elided*/ any | {
                                $out: string | {
                                    db: string;
                                    coll: string;
                                };
                            } | {
                                $planCacheStats: Record<string, never>;
                            } | {
                                $project: Record<string, any>;
                            } | {
                                $redact: any;
                            } | {
                                $replaceRoot: {
                                    newRoot: any;
                                };
                            } | {
                                $replaceWith: any;
                            } | {
                                $sample: {
                                    size: number;
                                };
                            } | {
                                $search: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $searchMeta: {
                                    [x: string]: any;
                                    index?: string | undefined;
                                };
                            } | {
                                $set: Record<string, any>;
                            } | {
                                $setWindowFields: {
                                    partitionBy?: any;
                                    sortBy?: Record<string, 1 | -1> | undefined;
                                    output: Record<string, {
                                        [operator: string]: any;
                                        window?: {
                                            documents?: [string | number, string | number];
                                            range?: [string | number, string | number];
                                            unit?: string;
                                        };
                                    }>;
                                };
                            } | {
                                $shardedDataDistribution: Record<string, never>;
                            } | {
                                $skip: number;
                            } | {
                                $sort: Record<string, 1 | -1>;
                            } | {
                                $sortByCount: any;
                            } | /*elided*/ any | {
                                $unset: string | string[];
                            } | {
                                $unwind: string | {
                                    path: string;
                                    includeArrayIndex?: string | undefined;
                                    preserveNullAndEmptyArrays?: boolean | undefined;
                                };
                            })[] | undefined;
                            whenNotMatched?: "insert" | "discard" | "fail" | undefined;
                        };
                    } | {
                        $out: string | {
                            db: string;
                            coll: string;
                        };
                    } | {
                        $planCacheStats: Record<string, never>;
                    } | {
                        $project: Record<string, any>;
                    } | {
                        $redact: any;
                    } | {
                        $replaceRoot: {
                            newRoot: any;
                        };
                    } | {
                        $replaceWith: any;
                    } | {
                        $sample: {
                            size: number;
                        };
                    } | {
                        $search: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $searchMeta: {
                            [x: string]: any;
                            index?: string | undefined;
                        };
                    } | {
                        $set: Record<string, any>;
                    } | {
                        $setWindowFields: {
                            partitionBy?: any;
                            sortBy?: Record<string, 1 | -1> | undefined;
                            output: Record<string, {
                                [operator: string]: any;
                                window?: {
                                    documents?: [string | number, string | number];
                                    range?: [string | number, string | number];
                                    unit?: string;
                                };
                            }>;
                        };
                    } | {
                        $shardedDataDistribution: Record<string, never>;
                    } | {
                        $skip: number;
                    } | {
                        $sort: Record<string, 1 | -1>;
                    } | {
                        $sortByCount: any;
                    } | /*elided*/ any | {
                        $unset: string | string[];
                    } | {
                        $unwind: string | {
                            path: string;
                            includeArrayIndex?: string | undefined;
                            preserveNullAndEmptyArrays?: boolean | undefined;
                        };
                    })[] | undefined;
                };
            } | {
                $unset: string | string[];
            } | {
                $unwind: string | {
                    path: string;
                    includeArrayIndex?: string | undefined;
                    preserveNullAndEmptyArrays?: boolean | undefined;
                };
            })[];
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    pipelineChange: (pipeline: Pipeline) => any;
    exportPipeline: (pipeline: Pipeline) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onPipelineChange?: ((pipeline: Pipeline) => any) | undefined;
    onExportPipeline?: ((pipeline: Pipeline) => any) | undefined;
}>, {
    initialPipeline: Pipeline;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
