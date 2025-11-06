export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export interface ValidationError {
    type: 'json' | 'structure' | 'stage' | 'operator';
    message: string;
    position?: {
        line?: number;
        column?: number;
        stageIndex?: number;
    };
}
export interface ValidationWarning {
    type: 'performance' | 'best-practice' | 'compatibility';
    message: string;
    position?: {
        stageIndex?: number;
    };
}
export declare function validateAggregationPipeline(jsonString: string): ValidationResult;
