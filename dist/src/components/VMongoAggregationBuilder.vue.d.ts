import { Pipeline } from '../types';
interface Props {
    initialPipeline?: Pipeline;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    pipelineChange: (pipeline: Pipeline) => any;
    exportPipeline: (pipeline: Pipeline) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onPipelineChange?: ((pipeline: Pipeline) => any) | undefined;
    onExportPipeline?: ((pipeline: Pipeline) => any) | undefined;
}>, {
    initialPipeline: Pipeline;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
