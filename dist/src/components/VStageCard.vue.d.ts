import { AggregationStage } from '../types';
interface Props {
    stage: AggregationStage;
    index: number;
    totalStages: number;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    update: (index: number, stage: AggregationStage) => any;
    delete: (index: number) => any;
    "move-up": (index: number) => any;
    "move-down": (index: number) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onUpdate?: ((index: number, stage: AggregationStage) => any) | undefined;
    onDelete?: ((index: number) => any) | undefined;
    "onMove-up"?: ((index: number) => any) | undefined;
    "onMove-down"?: ((index: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
